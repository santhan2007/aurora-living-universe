# AURORA — The Living Universe

<<<<<<< HEAD
AURORA is a cinematic, framework-free digital universe built around atmosphere, color, and motion. It is an interactive study in what happens when an interface behaves like a place: the background drifts, the selected world changes the light, and small discoveries reward exploration.

## Features

- CSS-built crystalline hero object with layered orbital light.
- Canvas 2D starfield with high-DPI resizing, tab-visibility pausing, and sensible particle limits.
- Three distinct environments: Quiet Tide, Velvet Dream, and Electric Pulse.
- Environment cards that update the active atmosphere and reveal an original cosmic discovery panel.
- Palette selection persisted locally with validation and a safe Quiet Tide fallback.
- Responsive navigation with keyboard-operable controls and visible focus states.
- Manual motion control that respects the operating system's reduced-motion preference.
- Scroll reveals and restrained pointer depth on pointer devices.
- Closing return-to-exploration action and semantic section structure.

## Technology

The project uses only semantic HTML, modern CSS, and dependency-free browser JavaScript. No build step, backend, API key, or account is required. Google Fonts are optional; system fallbacks keep the experience usable if the font request is unavailable.

## Run locally

From the project directory, start a static server:
=======
A cinematic, interactive vanilla HTML/CSS/JavaScript experience built around atmosphere, color, and motion.

## Run locally

No build step or dependencies are required. Serve the folder with any static server, for example:
>>>>>>> origin/main

```bash
python3 -m http.server 8000
```

<<<<<<< HEAD
Open [http://localhost:8000](http://localhost:8000) in a browser. The folder can also be deployed directly to GitHub Pages or another static host.

## How to explore

1. Use **Begin exploring** or the navigation to move through the page.
2. Select an environment card to change the active visual frequency and open its discovery.
3. Use the palette controls in **Make it yours** to persist a preferred color world.
4. Use **Motion on/off** in the navigation to pause or resume ambient motion. If the operating system requests reduced motion, the page keeps motion disabled.
5. Press `Escape` to close an open discovery panel. All controls are available with a keyboard.

## Accessibility and performance

The page uses semantic landmarks, a skip link, heading hierarchy, button controls, focus indicators, accessible names, reduced-motion CSS/JavaScript behavior, and content that remains available without animation. The starfield pauses when the tab is hidden, caps its particle count, and limits its canvas pixel ratio to avoid unnecessary work.

## Project structure

- `index.html` — semantic page structure, navigation, controls, environments, and closing call to action.
- `styles.css` — visual system, responsive layout, environment palettes, artwork, focus states, and motion rules.
- `app.js` — starfield lifecycle, theme persistence, environment/discovery behavior, motion preferences, scroll reveals, and pointer depth.
- `CHANGELOG.md` — implementation history.
=======
Then open `http://localhost:8000`. The project is also deployable as-is to GitHub Pages.

## Project structure

- `index.html` — semantic page structure and accessible controls
- `styles.css` — visual system, responsive layout, palettes, and animation
- `app.js` — Canvas starfield, environment selection, motion preference, and local theme persistence

External Google Fonts are optional; the CSS includes system fallbacks if they cannot load.
>>>>>>> origin/main
