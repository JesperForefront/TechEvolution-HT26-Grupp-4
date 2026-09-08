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
KudosComposer --onSend--> App
```

- `src/main.tsx` mounts React and imports global styles.
- `App` owns the selected colleague ID and kudos list in React state.
  Selection begins empty, and the list starts with the JSON samples.
- Both JSON files are imported directly at build time. There is no fetching
  or automatic writing back to these files.
- `features/colleagues/` defines the colleague type and typed mock list.
- `features/current-user/` contains the controlled colleague selector.
- `features/kudos/` contains the kudos type, mock data import, feed, card,
  timestamp display, and `KudosComposer`.
- The current-user selector sits on the left above the feed. On the right,
  `KudosComposer` owns the recipient, category, and optional message in local
  React state. The message is limited to 255 characters. Sending calls `onSend`
  to add the kudos to the parent's list, then clears the dropdowns and message.
- The feed sorts a copy of the kudos list newest first. It checks colleague
  IDs to mark departed people while displaying the saved first names.
- Cards show the complete message, category, and relative time. A native
  disclosure reveals the exact local time. One feed timer refreshes the
  relative labels every 30 seconds.
- Cards use a single column with normal page scrolling. CSS Modules live
  beside their components; global styles contain shared design tokens.

## Sending kudos

The button requires a selected sender, recipient, and category. The composer
generates the UUID and timestamp and snapshots the first names. All changes
stay in React state; refreshing reloads the samples.
