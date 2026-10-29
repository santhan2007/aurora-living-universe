# AURORA | Interactive Astronomy Atlas

AURORA is a framework-free, offline-first astronomy explorer. It combines an atmospheric starfield with a curated atlas of real astronomical subjects, visual science experiments, and a short knowledge challenge.

## Features

- Eight local astronomy subjects: the Solar System, black holes, neutron stars, nebulae, galaxies, supernovae, exoplanets, and pulsars.
- Searchable and filterable atlas with field notes, scientific facts, visual models, and related discoveries.
- Gravity and orbital-motion experiment with an adjustable illustrative speed parameter.
- Stellar life-cycle experiment covering nursery, main sequence, giant phase, and stellar remnants.
- Three-question quiz with meaningful feedback, session score, and retry support.
- Responsive layout, keyboard focus states, reduced-motion support, and a local Canvas starfield.

## Run locally

No build step, backend, account, API key, or dependency is required. Serve the folder with any static server:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000> in a browser. The core educational content is stored locally; external services are not required.

## Project structure

- `index.html` - page structure, atlas, experiments, and quiz.
- `styles.css` - cosmic visual system, responsive layout, diagrams, and motion rules.
- `app.js` - local subject data, interactions, quiz state, starfield, and navigation.
- `CHANGELOG.md` - implementation history.
