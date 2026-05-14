# Music Player Web Application

A fully responsive, modern music player built with HTML, CSS, and JavaScript. Features glassmorphism design, playlist management, and dynamic controls.

## Features

✅ **Core Functionality**

- Play/Pause controls with play button highlighting
- Next/Previous track navigation
- Real-time progress bar with seek functionality
- Current playback time and total duration display
- Volume control with mute/adjust
- Autoplay next track option (toggleable)

✅ **UI/UX**

- Modern glassmorphism dark design
- Animated album cover with hover effects
- Responsive playlist sidebar with active track highlighting
- Smooth animations and transitions
- Professional Spotify-like appearance
- Fully responsive (desktop, tablet, mobile)

✅ **Advanced Features**

- Persistent volume setting (saved in localStorage)
- Keyboard shortcuts (Space: play/pause, Arrow keys: next/prev)
- Dynamic playlist rendering
- Song counter in playlist
- Hover effects and visual feedback

✅ **Code Quality**

- Clean, organized, semantic HTML
- Modular CSS with variables
- Well-commented JavaScript
- No dependencies (vanilla JavaScript)
- Accessibility features (ARIA labels, keyboard support)

## Project Structure

```
Music_Player/
├── index.html              # Main HTML structure
├── style.css              # Modern glassmorphism styles
├── main.js                # JavaScript functionality
├── README.md              # This file
└── assets/
    ├── images/
    │   ├── placeholder.svg    # Default album cover
    │   ├── cover1.svg - cover5.svg  # Placeholder cover arts
    └── music/
        ├── song1.mp3          # Add your music files here
        ├── song2.mp3
        ├── song3.mp3
        ├── song4.mp3
        └── song5.mp3
```

## Quick Start

### 1. Add Your Music Files

- Place your MP3 files in `assets/music/`
- Naming: `song1.mp3`, `song2.mp3`, etc.
- Currently configured for 5 songs (modify in `main.js` if needed)

### 2. (Optional) Update Playlist Data

Edit `main.js` and update the `PLAYLIST` array with your song details:

```javascript
const PLAYLIST = [
	{
		id: 1,
		title: "Your Song Title",
		artist: "Artist Name",
		src: "assets/music/song1.mp3",
		cover: "assets/images/cover1.svg",
		duration: 240, // in seconds
	},
	// Add more songs...
];
```

### 3. Open in Browser

- Simply open `index.html` in your web browser
- No server needed for local testing
- For audio to work properly, use a local server (see below)

## Keyboard Shortcuts

| Key             | Action         |
| --------------- | -------------- |
| `Space`         | Play / Pause   |
| `→` Arrow Right | Next Track     |
| `←` Arrow Left  | Previous Track |

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Customization

### Change Theme Colors

Edit CSS variables in `style.css`:

```css
:root {
	--primary-color: #1db954; /* Spotify green */
	--bg-primary: #121212; /* Dark background */
	--text-primary: #ffffff; /* White text */
	/* More variables... */
}
```

### Adjust Responsive Breakpoints

Modify media queries in `style.css`:

- Tablet: `@media (max-width: 768px)`
- Mobile: `@media (max-width: 480px)`

### Add More Songs

1. Add MP3 file to `assets/music/`
2. Add SVG cover to `assets/images/`
3. Add entry to `PLAYLIST` array in `main.js`
4. Refresh browser

## JavaScript Architecture

### Main Components

| Component                     | Purpose                                |
| ----------------------------- | -------------------------------------- |
| `initPlayer()`                | Initialize player and load first track |
| `loadTrack(index)`            | Load track by playlist index           |
| `togglePlayPause()`           | Toggle playback state                  |
| `nextTrack()` / `prevTrack()` | Navigation                             |
| `seekTrack()`                 | Handle progress bar seeking            |
| `handleVolumeChange()`        | Volume adjustment                      |
| `renderPlaylist()`            | Render playlist UI                     |

### Key Features Explained

**Progress Bar Seeking:**

- Prevents jumping while user drags slider
- Uses `isSeeking` flag to avoid conflicts
- Updates audio currentTime on release

**Volume Persistence:**

- Saves volume to localStorage
- Restored on page reload
- Updates displayed percentage

**Autoplay:**

- Toggleable via checkbox
- Automatically plays next track when current ends
- Can be disabled for manual control


## 🌐 Live Demo

https://omarelflah02.github.io/CodeAlpha_MusicPlayer/  
