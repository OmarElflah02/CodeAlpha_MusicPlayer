// DATA
const PLAYLIST = [
	{
		id: 1,
		title: "Summer Vibes",
		artist: "The Melodies",
		src: "assets/music/song1.mp3",
		cover: "assets/images/cover1.svg",
		duration: 240, // seconds
	},
	{
		id: 2,
		title: "Midnight Dreams",
		artist: "Luna Echo",
		src: "assets/music/song2.mp3",
		cover: "assets/images/cover2.svg",
		duration: 210,
	},
	{
		id: 3,
		title: "Electric Pulse",
		artist: "Neon Lights",
		src: "assets/music/song3.mp3",
		cover: "assets/images/cover3.svg",
		duration: 260,
	},
	{
		id: 4,
		title: "Peaceful Journey",
		artist: "Calm Waves",
		src: "assets/music/song4.mp3",
		cover: "assets/images/cover4.svg",
		duration: 300,
	},
	{
		id: 5,
		title: "the sound of silence",
		artist: "City Beats",
		src: "assets/music/song5.mp3",
		cover: "assets/images/cover5.svg",
		duration: 220,
	},
];

// SELECTORS
const audioPlayer = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volumeSlider");
const volumeValue = document.getElementById("volumeValue");
const autoplayToggle = document.getElementById("autoplayToggle");
const albumCover = document.getElementById("albumCover");
const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");
const playlistContainer = document.getElementById("playlistContainer");
const songCount = document.getElementById("songCount");

// PLAYER STATE
let currentTrackIndex = 0;
let isPlaying = false;
let isSeeking = false;

// INITIALIZATION
function initPlayer() {
	console.log("Initializing Music Player...");
	// Render playlist
	renderPlaylist();
	// Setup event listeners
	setupEventListeners();
	// Load first song
	loadTrack(0);
	// Restore saved volume
	restoreVolume();
	console.log("Music Player ready!");
}

// Setup all event listeners
function setupEventListeners() {
	// Control buttons
	playBtn.addEventListener("click", togglePlayPause);
	nextBtn.addEventListener("click", nextTrack);
	prevBtn.addEventListener("click", prevTrack);
	// Progress bar
	progressBar.addEventListener("input", () => {
		isSeeking = true;
	});
	progressBar.addEventListener("change", seekTrack);
	// Volume control
	volumeSlider.addEventListener("input", handleVolumeChange);
	// Audio events
	audioPlayer.addEventListener("timeupdate", updateProgress);
	audioPlayer.addEventListener("loadedmetadata", updateDuration);
	audioPlayer.addEventListener("ended", handleTrackEnd);
	audioPlayer.addEventListener("play", updatePlayBtnUI);
	audioPlayer.addEventListener("pause", updatePlayBtnUI);
	// Keyboard shortcuts
	document.addEventListener("keydown", handleKeyboardShortcuts);
}

// TRACK MANAGEMENT
function loadTrack(index) {
	if (index < 0 || index >= PLAYLIST.length) {
		console.warn("Invalid track index");
		return;
	}
	currentTrackIndex = index;
	const track = PLAYLIST[index];
	// Update audio source
	audioPlayer.src = track.src;
	// Update UI
	songTitle.textContent = track.title;
	artistName.textContent = track.artist;
	albumCover.src = track.cover;
	albumCover.alt = `${track.title} - ${track.artist}`;
	// Reset progress
	progressBar.value = 0;
	currentTimeEl.textContent = "0:00";
	// Highlight active playlist item
	updatePlaylistUI();
	console.log(`Loaded track: ${track.title}`);
}

// Play the current track
function playTrack() {
	if (!audioPlayer.src) {
		loadTrack(0);
	}
	audioPlayer
		.play()
		.then(() => {
			isPlaying = true;
			albumCover.classList.add("playing");
			console.log("Playing:", PLAYLIST[currentTrackIndex].title);
		})
		.catch((error) => {
			console.error("Error playing audio:", error);
			alert("Could not play audio. Please ensure audio files are available.");
		});
}

// Pause the current track
function pauseTrack() {
	audioPlayer.pause();
	isPlaying = false;
	albumCover.classList.remove("playing");
	console.log("Paused");
}

// Toggle between play and pause
function togglePlayPause() {
	if (isPlaying) {
		pauseTrack();
	} else {
		playTrack();
	}
}

// Play next track
function nextTrack() {
	currentTrackIndex = (currentTrackIndex + 1) % PLAYLIST.length;
	loadTrack(currentTrackIndex);
	if (isPlaying) {
		playTrack();
	}
	console.log("Next track");
}

// Play previous track
function prevTrack() {
	// If more than 3 seconds played, restart current track
	if (audioPlayer.currentTime > 3) {
		audioPlayer.currentTime = 0;
	} else {
		currentTrackIndex = (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
		loadTrack(currentTrackIndex);
		if (isPlaying) {
			playTrack();
		}
	}
	console.log("Previous track");
}

// Handle track ending
function handleTrackEnd() {
	console.log("Track ended");
	if (autoplayToggle.checked) {
		nextTrack();
	} else {
		pauseTrack();
	}
}

// PROGRESS & TIME
function updateProgress() {
	if (!isSeeking && audioPlayer.duration) {
		const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
		progressBar.value = progress;
	}
	currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
}

// Update duration display
function updateDuration() {
	durationEl.textContent = formatTime(audioPlayer.duration);
}

// Seek to position in track
function seekTrack() {
	const time = (progressBar.value / 100) * audioPlayer.duration;
	audioPlayer.currentTime = time;
	isSeeking = false;
}

// Format time in MM:SS format
function formatTime(seconds) {
	if (!seconds || isNaN(seconds)) return "0:00";
	const minutes = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// VOLUME CONTROL
function handleVolumeChange() {
	const volume = volumeSlider.value / 100;
	audioPlayer.volume = volume;
	volumeValue.textContent = volumeSlider.value + "%";
	// Save volume preference
	saveVolume(volumeSlider.value);
}

// Save volume to localStorage
function saveVolume(volume) {
	localStorage.setItem("playerVolume", volume);
}

// Restore saved volume from localStorage
function restoreVolume() {
	const savedVolume = localStorage.getItem("playerVolume") || 70;
	volumeSlider.value = savedVolume;
	audioPlayer.volume = savedVolume / 100;
	volumeValue.textContent = savedVolume + "%";
}

// PLAYLIST MANAGEMENT
// Render playlist in the sidebar
function renderPlaylist() {
	playlistContainer.innerHTML = "";
	PLAYLIST.forEach((track, index) => {
		const playlistItem = document.createElement("li");
		playlistItem.className = "playlist-item";
		playlistItem.setAttribute("data-index", index);
		playlistItem.innerHTML = `
            <span class="playlist-item-number">${index + 1}</span>
            <div class="playlist-item-content">
                <div class="playlist-item-title">${track.title}</div>
                <div class="playlist-item-artist">${track.artist}</div>
            </div>
        `;
		// Add click listener to play track
		playlistItem.addEventListener("click", () => {
			loadTrack(index);
			playTrack();
		});
		playlistContainer.appendChild(playlistItem);
	});
	// Update song count
	songCount.textContent = `${PLAYLIST.length} songs`;
	updatePlaylistUI();
}

// Update playlist UI to highlight active track
function updatePlaylistUI() {
	// Remove active class from all items
	document.querySelectorAll(".playlist-item").forEach((item) => {
		item.classList.remove("active");
	});
	// Add active class to current track
	const activeItem = document.querySelector(`[data-index="${currentTrackIndex}"]`);
	if (activeItem) {
		activeItem.classList.add("active");
		// Scroll active item into view
		activeItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
	}
}

// UI UPDATES
function updatePlayBtnUI() {
	const playIcon = playBtn.querySelector(".play-icon");
	const pauseIcon = playBtn.querySelector(".pause-icon");
	if (isPlaying) {
		playIcon.classList.add("hidden");
		pauseIcon.classList.remove("hidden");
		playBtn.setAttribute("aria-label", "Pause");
	} else {
		playIcon.classList.remove("hidden");
		pauseIcon.classList.add("hidden");
		playBtn.setAttribute("aria-label", "Play");
	}
}

// Update play/pause state and UI
audioPlayer.addEventListener("playing", () => {
	isPlaying = true;
	updatePlayBtnUI();
});

audioPlayer.addEventListener("paused", () => {
	isPlaying = false;
	updatePlayBtnUI();
});

// KEYBOARD SHORTCUTS
function handleKeyboardShortcuts(event) {
	// Prevent shortcuts when typing in input
	if (event.target.tagName === "INPUT" && event.target.type !== "range") {
		return;
	}
	switch (event.code) {
		case "Space":
			event.preventDefault();
			togglePlayPause();
			break;
		case "ArrowRight":
			nextTrack();
			break;
		case "ArrowLeft":
			prevTrack();
			break;
	}
}

// Initialize player when DOM is ready
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initPlayer);
} else {
	initPlayer();
}
