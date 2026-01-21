## Artwork 912 Exhibition Template

This project runs a fullscreen 2160×3840 (vertical) p5.js exhibition loop with a title slide, artwork section, and end credit slide. It includes an optional QR code and simple controls panel.
- https://walhimer.github.io/artwork-video/

### Run Locally (recommended for recording)
1. Open `simple_exhibition_template.html` in a browser.
2. Set Title, Credit, Duration, and optional QR URL.
3. Click `START`.

Recording tip: running locally is the most reliable for OBS capture.

### Controls
- Click `HIDE PANEL` to hide the controls.
- Click `SHOW CONTROLS` to bring them back.
- Keyboard toggle: press `C` or `H`.

### QR Code
Add a URL in the QR field and click `START`. The QR appears on the title and end slides.

### Files
- `simple_exhibition_template.html` - main exhibition template and UI
- `artwork_912_compatible.js` - artwork render code

### Backup / Hosting Options
- **Local only**: fine for production playback + OBS recording.
- **GitHub for backup**: recommended for version history and safety.
- **Run from GitHub**:
  - Download the repo and open the HTML locally, or
  - Publish with GitHub Pages and open the hosted URL in a browser.
