# AURORA — The Living Universe

A cinematic, interactive vanilla HTML/CSS/JavaScript experience built around atmosphere, color, and motion.

## Run locally

No build step or dependencies are required. Serve the folder with any static server, for example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. The project is also deployable as-is to GitHub Pages.

## Project structure

- `index.html` — semantic page structure and accessible controls
- `styles.css` — visual system, responsive layout, palettes, and animation
- `app.js` — Canvas starfield, environment selection, motion preference, and local theme persistence

External Google Fonts are optional; the CSS includes system fallbacks if they cannot load.
