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

The first increment is a compact colleague selector beside the board heading
(stacked on mobile). Choose your name
from the ten colleagues in `data/colleagues.json` to see your name and role.
You can switch colleagues at any time. No colleague is selected initially,
and refreshing clears the selection. An empty colleague list disables the
selector and displays “No colleagues available.”

The feed below the header loads eight sample kudos from `data/kudos.json`,
sorted newest first. Each card shows saved sender and recipient first names,
the full message, category, and relative time. Click, tap, or keyboard-expand
the timestamp for the exact local date, time, and timezone; hovering also
shows it. Relative labels update every 30 seconds.

People missing from the current colleague list are marked “No longer works
here”; their names and kudos remain visible. The samples include both a
departed sender and a departed recipient. Cards stack in one column and use
normal page scrolling on desktop and mobile.

The JSON files are imported directly as static mock data. There is no
backend, API, or automatic writing to JSON files. The future “Give kudos”
form will update React state; it is not built yet. This is a simple proof
of concept with no production requirements.

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
    current-user/
      CurrentUserSelector.tsx
      CurrentUserSelector.module.css
    kudos/
      kudos.ts
      kudos-data.ts
      format-kudos-time.ts
      KudosFeed.tsx
      KudosFeed.module.css
      KudosCard.tsx
      KudosCard.module.css
      KudosTimestamp.tsx
      KudosTimestamp.module.css
  styles/
    global.css
```

- `main.tsx` mounts React in Strict Mode and loads global styles.
- `app/` composes the page, owns the selected colleague ID in React state,
  and passes the sample kudos and colleagues to the feed.
- `features/colleagues/` defines the readonly `Colleague` type and imports
  the existing JSON as a typed, readonly list. Names and roles are derived
  from that list rather than copied into state.
- `features/current-user/` contains the controlled selector and selection
  feedback. It receives the colleague list, selected ID, and change callback
  through typed props, without owning duplicate selection state.
- CSS Modules sit beside their components; `styles/global.css` contains
  shared color tokens, typography, base styles, and keyboard focus styling.

Add the future send form within the existing kudos feature folder.
Keep one component per file, use descriptive domain names, and add comments
only when a non-obvious reason needs explaining.
