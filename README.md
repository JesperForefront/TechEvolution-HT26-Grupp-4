# Evolution Lab — Kudos Wall

A two-day lab for Tech Evo. You build a small app under time pressure, defend
the decisions behind it to people who weren't in the room, then take on a new
requirement against a deadline that doesn't move.

**The case:** a Kudos Wall. People send short shoutouts to colleagues — "thanks
for staying late with the deploy", "great pairing session". One entity, one
screen, no backend.

## Getting started

Fork this repo first — one fork per group — then clone your own fork:

```
git clone <your-fork-url>
cd evolution-lab-kudos
npm install
npm run dev
```

Open the local URL printed by Vite. The app uses React, TypeScript, and
Vite; use Node.js 22.12+ or a supported newer LTS release.

## Current functionality

The current-user selector sits on the left above the feed. Choose your name
from the ten colleagues in `data/colleagues.json` to see your name and role.
You can switch colleagues at any time. No colleague is selected initially,
and refreshing clears the selection. An empty colleague list disables the
selector and displays “No colleagues available.”

Only the recipient (“To”) dropdown shows a right-aligned ⌛ and pale yellow background
when a person's last received kudos is more than seven days old, or they have
never received one. Hover over a marked row to see “kudos starved”. Selecting
a marked recipient shows “Has not received kudos in 7 days” next to “To”.
Sending that colleague a kudos removes the marker immediately.
The “Who’s here today?” dropdown shows plain names.

A compact “Give kudos” box sits on the right, with dropdowns for the recipient
and category. Select your name, a recipient, and a category to enable “Send
kudos”. An optional message field accepts up to 255 characters and shows a
character count. Sending adds a card to the feed and clears the recipient,
category, and message. The controls stack on smaller screens.

Kudos sent by the selected current colleague have an "Edit" button. Click it
to change only the message, then "Save" to apply it or "Cancel" to discard
the draft. Messages remain optional and limited to 255 characters; clearing
the message is allowed. The people, category, and original timestamp stay
unchanged. Switching colleagues discards open drafts.

The feed below the header loads eight sample kudos from `data/kudos.json`,
sorted newest first. Each card shows saved sender and recipient first names,
the message when present, category, and relative time. Click, tap, or keyboard-expand
the timestamp for the exact local date, time, and timezone; hovering also
shows it. Relative labels update every 30 seconds.

Above the feed, search by recipient name and filter by recipient role or kudos
category. Filters work together and update immediately, keeping newest kudos
first. Name search matches part of a current full name or saved first name,
ignoring case. Role filters use the current colleague list. Use "Clear filters"
to show all kudos again; refreshing also clears the filters.

People missing from the current colleague list are marked “No longer works
here”; their names and kudos remain visible. The samples include both a
departed sender and a departed recipient. Cards stack in one column and use
normal page scrolling on desktop and mobile.

The JSON files are imported directly as static mock data. There is no
backend, API, or automatic writing to JSON files. New kudos and saved message edits stay in React state;
refreshing restores the samples. This is a simple proof of concept with no
production requirements.

## Commands and verification

| Command | Purpose |
| --- | --- |
| `npm install` | Install the existing dependencies |
| `npm run dev` | Start the development server |
| `npm run build` | Run TypeScript checks and create the production build in `dist/` |
| `npm run preview` | Serve the production build locally after building |

Use `npm run build` for a quick compile check. Automated tests and lengthy
verification are out of scope for this proof of concept.

## Project guidance

Read these before making changes:

1. `.ai/rules.md` — small changes, quick turnaround, and scope
2. `docs/01-build.md` — what Monday's session asks of you
3. `.ai/domain-model.md` — what a Kudos actually is

## Ground rules

- **Use your AI tools.** All of them, however you like. That is the point of
  the lab, not a shortcut around it.
- **You own what you ship.** On Tuesday you have to defend your own code to
  people who did not watch you build it.
- **Commit often, with real messages.** You'll be walking someone through this
  history tomorrow.
- **`.ai/domain-model.md` is the brief.** Treat it like a customer's
  requirements: read it, build what it says, and raise anything you disagree
  with out loud rather than quietly working around it.

## Repo layout

```
docs/         One file per session — what you're asked to do and how you're assessed.
.ai/          rules.md and domain-model.md are required reading. architecture.md and
              conventions.md are pointer files — not required upfront, point
              your AI tool at them when they become relevant.
data/         Static JSON mock data for colleagues and kudos.
src/          React application, organized as outlined below.
```

```text
src/
  main.tsx
  app/
    App.tsx
    App.module.css
  features/
    colleagues/
      colleague.ts
      colleagues.ts
      ColleagueSelect.tsx
      ColleagueSelect.module.css
    current-user/
      CurrentUserSelector.tsx
      CurrentUserSelector.module.css
    kudos/
      kudos.ts
      kudos-data.ts
      format-kudos-time.ts
      KudosFeed.tsx
      KudosFeed.module.css
      KudosFilters.tsx
      KudosFilters.module.css
      KudosComposer.tsx
      KudosComposer.module.css
      KudosCard.tsx
      KudosCard.module.css
      EditableKudosMessage.tsx
      EditableKudosMessage.module.css
      KudosTimestamp.tsx
      KudosTimestamp.module.css
  styles/
    global.css
```

- `main.tsx` mounts React in Strict Mode and loads global styles.
- `app/` composes the page and owns the selected colleague ID and kudos list
  in React state. Callbacks add kudos and save message edits after checking
  that the selected colleague is the sender; the feed displays the list.
- `features/colleagues/` defines the readonly `Colleague` type and imports
  the existing JSON as a typed, readonly list. Names and roles are derived
  from that list rather than copied into state.
- `features/current-user/` contains the controlled selector and selection
  feedback. It receives the colleague list, selected ID, and change callback
  through typed props, without owning duplicate selection state.
- CSS Modules sit beside their components; `styles/global.css` contains
  shared color tokens, typography, base styles, and keyboard focus styling.
  The styling follows the supplied Forefront palette with Segoe UI typography,
  a dark green header, plum actions, lavender accents, and warm neutral surfaces.

Continue the send form in the existing `KudosComposer` component.
Keep one component per file, use descriptive domain names, and add comments
only when a non-obvious reason needs explaining.
