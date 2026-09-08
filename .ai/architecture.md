# Architecture

Read `rules.md` before making changes. This is a small proof of concept.

## Given, not decided

- **No backend.** All application state lives in the browser. No API endpoints,
  server-side file writing, or database.
- **Stack is given.** React + TypeScript + Vite.
- **Keep it simple.** Use small components, direct props, and React state.
  Add abstractions only when the current feature needs them.

## Current application

```text
data/colleagues.json --> App --> CurrentUserSelector
                         |
data/kudos.json --------> App --> KudosFeed --> KudosCard --> KudosTimestamp
```

- `src/main.tsx` mounts React and imports global styles.
- `App` composes the page and owns the selected colleague ID in React state.
  Selection begins empty and resets on refresh.
- Both JSON files are imported directly at build time. There is no fetching
  or automatic writing back to these files.
- `features/colleagues/` defines the colleague type and typed mock list.
- `features/current-user/` contains the controlled colleague selector.
- `features/kudos/` contains the kudos type, mock data import, feed, card,
  and timestamp display.
- The feed sorts a copy of the kudos list newest first. It checks colleague
  IDs to mark departed people while displaying the saved first names.
- Cards show the complete message, category, and relative time. A native
  disclosure reveals the exact local time. One feed timer refreshes the
  relative labels every 30 seconds.
- Cards use a single column with normal page scrolling. CSS Modules live
  beside their components; global styles contain shared design tokens.

## Future send form

When the form is requested, keep one kudos list in React state in the common
parent. The form adds to that list and the feed reads it. Keep this work
inside the kudos feature; do not introduce a persistence layer in advance.
