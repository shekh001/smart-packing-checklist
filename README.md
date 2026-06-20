# Trailpack — Smart Packing Checklist

A travel packing-list app with trip-specific checklists, category accordions,
quantity tracking, favorites, search, and live progress tracking.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Project structure

```
smart-packing-checklist/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx                 # React entry point
    ├── App.jsx                  # Root component / layout
    ├── index.css                # Design tokens + Tailwind
    ├── context/
    │   └── PackingContext.jsx   # All CRUD state (trips/categories/items)
    ├── data/
    │   └── sampleData.js        # Seed data for first run
    ├── utils/
    │   └── stats.js             # Progress % calculations
    └── components/
        ├── TripSelector.jsx     # Boarding-pass style trip switcher + create trip
        ├── Dashboard.jsx        # Active trip view: progress, search, categories
        ├── CategoryAccordion.jsx# Collapsible category with items + add-item form
        ├── ChecklistItem.jsx    # Single item row: check, qty, favorite, delete
        ├── AddItemForm.jsx      # Form to add a new item to a category
        ├── SearchBar.jsx        # Search/filter items
        ├── ProgressBar.jsx      # Reusable progress bar
        └── FavoritesPanel.jsx   # Quick-toggle chips for favorite items
```

## Features implemented

- Create / delete trips, each with its own packing list
- Category accordions (Clothing, Toiletries, Documents, Electronics, Gear, or custom)
- Add / edit (quantity) / delete items per category
- Mark items packed/unpacked with a single tap
- Mark items as favorites, with a dedicated favorites quick-toggle panel
- Live packing completion percentage per trip and per category
- Search/filter items across the active trip
- Data persists locally in the browser (localStorage)

## Notes

This build uses plain Tailwind components styled to resemble shadcn/ui
(checkbox, accordion, input, button patterns) so it runs as a clean Vite app
without needing the shadcn CLI. If you'd like, it can be re-wired to use the
actual shadcn/ui component library (`npx shadcn-ui@latest init`) — the
component structure here maps 1:1 to Accordion, Checkbox, Input, and Card
from that library.
