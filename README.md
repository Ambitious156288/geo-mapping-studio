# Geo Mapping Studio

Interactive React application for drawing and inspecting geospatial data on a map using Deck.gl, Material UI, and MapLibre. Built with Vite + TypeScript.

## Table of contents

- Features
- Tech stack
- Quick start
- Architecture overview
- Key design decisions
- Environment and configuration
- Known limitations and future improvements

## Features

- Map interaction & drawing

  - Map rendered with Deck.gl + MapLibre basemap
  - Draw polygons interactively (Nebula.gl EditableGeoJsonLayer)
  - Edit existing features (moving/reshaping supported by the editable layer)
  - Export current data to a local GeoJSON file (timestamped filename)

- Load GeoJSON from URL

  - Paste any GeoJSON URL
  - Validates input and shows success/error snackbars
  - Optional “View Data Table” action from the success snackbar

- Search functionality

  - Search places/coordinates via OpenStreetMap Nominatim
  - Centers the map and places a marker at the result
  - Success/error snackbars include the searched query

- Display data as a table

  - Material UI DataGrid lists properties of all features

- Styling & UX
  - Fill color and opacity controls for drawn features
  - Light/Dark theme switch (ThemeProvider)
  - Responsive layout (mobile-friendly panels and controls)

## Tech stack

- React 19 (functional components + hooks)
- TypeScript
- Vite 7
- Material UI (MUI)
- Deck.gl 8 + Nebula.gl (EditableGeoJsonLayer)
- MapLibre GL (basemap in react-map-gl)
- Zustand (state management)

## Quick start

Prerequisites: Node 18+

```bash
npm i
npm run dev
```

Open http://localhost:5173

Production build:

```bash
npm run build
npm run preview
```

## Architecture overview

- State management: Zustand store (`src/store/useGeoStore.ts`)

  - `geojson` – current FeatureCollection
  - `selectedIndex` – selected feature index for map/table sync
  - `style` – fill/line RGBA arrays (applied to layers)

- Layers

  - `EditableGeoJsonLayer` for drawing/editing
  - `GeoJsonLayer` for read-only rendering
  - Click on the map selects a feature; selection drives style highlighting

- Data enrichment

  - On edits, features are enriched with computed properties (`utils/featureEnrichment.ts`):
    - `id`, `vertices`, optional `ringCount`, `bbox_*`, and `centroid_*`
  - On load, missing `id`/`label` are normalized in `useGeoStore.setGeojson`

- Separation of concerns
  - `constants/` – URLs, map defaults, theme colors, UI config
  - `api/` – API calls (geocoding, geojson load)
  - `hooks/` – reusable UI logic (snackbar, media, theme mode)
  - `utils/` – pure helpers (color/geometry/export/enrichment)
  - `components/` – presentational and composite components

## Key design decisions

- Deck.gl 8 + Nebula.gl 1.x for stable editable layers (version-compat alignment)
- React hooks + Zustand for simple, explicit state flows
- Type-safe constants for URLs/visual config
- Feature/property enrichment to guarantee meaningful table columns (type + id)
- Snackbar UX for all async actions (search/load) with clear success/failure messages

## Environment and configuration

- No external keys required (MapLibre + public Nominatim)
- Map style URL is defined in `constants/map.ts`
- You can replace the basemap URL with your preferred provider

## Known limitations & future improvements

- Current drawing supports polygons; lines can be enabled similarly if needed
- Geometry metrics (area/length) could be added for higher accuracy
- Manual chunking/code-splitting could reduce bundle size
- Add E2E tests and more unit tests around utils/store
- host application
