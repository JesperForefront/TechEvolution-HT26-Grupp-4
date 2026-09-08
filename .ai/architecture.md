# Architecture

Read `rules.md` before making changes. This is a small proof of concept.

## Given, not decided

- **Local file writer only.** The user approved a small Vite handler for
  reading and writing `data/kudos.json`, replacing the original prohibition
  on all server-side file writing. There is no standalone backend or database.
- **Stack is given.** React + TypeScript + Vite.
- **Keep it simple.** Use small components, direct props, and React state.
  Add abstractions only when the current feature needs them.

## Current application

```text
data/colleagues.json --> App --> CurrentUserSelector
                         |
data/kudos.json <--> Vite file handler <--> useKudos <--> App --> KudosFeed --> KudosCard --> KudosTimestamp
KudosComposer --onSend--> App
EditableKudosMessage --onSave--> KudosCard --onEditMessage--> KudosFeed --> App
```

- `src/main.tsx` mounts React and imports global styles.
- `App` owns the selected colleague ID and uses `useKudos` for the kudos list.
  Selection begins empty. The hook reads `data/kudos.json` before enabling
  the composer and feed, and automatically saves subsequent list changes.
- `getKudosStarvedIds` derives starved colleagues from received kudos. `App`
  passes these IDs only to the recipient picker and shares one 30-second clock
  with the feed. Sending a kudos recalculates the status immediately.
- The colleague JSON is imported at build time. Kudos are read from disk on
  each page load through the local Vite handler.
- `features/colleagues/` defines the colleague type and typed mock list.
  Its shared `ColleagueSelect` renders both colleague pickers with keyboard
  navigation. Only the recipient picker enables yellow rows, hourglasses,
  and kudos-starved hover text; the current-user picker shows plain names.
- `features/current-user/` contains the controlled colleague selector.
- `features/kudos/` contains the kudos type, persistence hook, JSON validation,
  feed, card, timestamp display, and `KudosComposer`.
- The current-user selector sits on the left above the feed. On the right,
  `KudosComposer` owns the recipient, category, and optional message in local
  React state. The message is limited to 255 characters. Sending calls `onSend`
  to add the kudos to the parent's list, then clears the dropdowns and message.
- The feed sorts a copy of the kudos list newest first. It checks colleague
  IDs to mark departed people while displaying the saved first names.
  It owns recipient-name, recipient-role, and category filters in React state;
  `KudosFilters` renders the controls. Filtering only changes the visible cards.
- Cards show the complete message, category, and relative time. A native
  disclosure reveals the exact local time. The shared app timer refreshes the
  relative labels every 30 seconds.
- Cards use a single column with normal page scrolling. CSS Modules live
  beside their components; global styles contain shared design tokens.
  The theme uses the supplied Forefront palette and Segoe UI, following the
  SharePoint reference: dark green header, plum actions, lavender accents,
  and warm neutrals. Starved-recipient highlighting uses a soft gold tint.

## Sending kudos

The button requires a selected sender, recipient, and category. The composer
generates the UUID and timestamp and snapshots the first names. Changes
update React state and automatically save to `data/kudos.json`.

## Editing kudos messages

`App` passes the current colleague ID and `onEditMessage` through the feed.
Only cards sent by that colleague render `EditableKudosMessage`, which owns
the local draft and the Edit, Save, and Cancel controls. Switching colleagues
unmounts the editor and discards its draft. Saving checks ownership again in
`App` and replaces only the message in React state. The send form, editor,
and save handler use the shared 255-character limit from `kudos.ts`.
The original timestamp, feed order, and starvation status stay unchanged.
Saved edits are also written automatically to `data/kudos.json`.

## JSON file storage

`vite/kudos-file-plugin.ts` adds GET and PUT at `/kudos.json` to Vite's local
development and preview servers. The path on disk is fixed to the project's
`data/kudos.json`. Validated writes run in sequence and replace the file via
a temporary file so reads do not see partially written JSON.

`use-kudos.ts` loads the file without caching and then saves list changes one
at a time. Changes made during a save are included in the next save. Failed
loads never write an empty list; failed saves retain the in-memory changes
and offer Retry. The browser warns before leaving with unsaved changes.
`parse-kudos.ts` shares validation between the browser and the file handler.
Vite ignores changes to the kudos file and its temporary file to avoid
reloading during a save. No file picker, browser file permission, separate
server process, or added dependency is needed. Static hosting alone does not
provide file writing; run the app through `npm run dev` or `npm run preview`.
