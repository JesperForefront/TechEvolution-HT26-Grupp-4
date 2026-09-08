# Domain model

Required reading before you write a line of code — see `docs/01-build.md`.

Living document. When you decide something — especially answers to "Still
open" below — write it here. An outdated file lies to the next reader and to
their AI tool.

## The entity

The whole app is one entity. A Kudos is a short, public, positive message
from one colleague to another, tagged with a category.

| Field | Meaning | Notes |
| --- | --- | --- |
| `id` | Unique identifier | Generate it, don't derive it from content |
| `from` | Who sent it | A colleague id, see `data/colleagues.json` |
| `to` | Who receives it | A colleague id |
| `fromFirstName` | Sender's first name when sent | Saved snapshot; displayed on every card |
| `toFirstName` | Recipient's first name when sent | Saved snapshot; displayed on every card |
| `message` | Optional shoutout text | Empty string is allowed; message entry comes later |
| `category` | What kind of praise | One of a fixed set, see below |
| `createdAt` | When it was sent | ISO 8601 UTC timestamp; displayed as relative time |

## Categories

A closed set, not free text:

- `TEAMWORK` — made the team better, not just the ticket
- `EXTRA_MILE` — went beyond what anyone asked for
- `MENTORSHIP` — made someone else more capable
- `CRAFT` — quality of the work itself
- `CUSTOMER_IMPACT` — the client felt the difference

## People

Mock data only — `data/colleagues.json`, same list for every team. No
sign-up, no login, no profile. "The current user" is whoever is selected in
the UI. Don't build user management.

## Product rules

From the brief. Build them as specified.

- **Self-kudos are a feature, not a bug.** People under-report their own
  wins. Posting a kudos to yourself is allowed, and it appears like any other. No need to bring this up, the developers are aware of it.
- **A kudos is immutable once sent.** No editing.
- **The feed is newest first.** Always.
- **No limit on how many kudos one person can send.**
- **Messages are optional.** A kudos can be sent without message text.
- **Keep historical names.** Display the saved first names even if a colleague's
  name changes or their entry is removed from `data/colleagues.json`.
- **Mark former colleagues.** If a sender or recipient ID is absent from the
  current colleague list, show “No longer works here” beside that person's
  saved name. Keep the kudos in the feed.

## Still open — yours to decide

There's no single right answer to any of these. There is a wrong answer:
"we never thought about it." Write your answer and reason here as you settle
each one, or log it under Decisions below.

- How should the future message field handle whitespace and maximum length?
- Where should validation live and where should the future form display feedback?

## Deliberately out of scope

Authentication. Any backend or API. A database. Notifications. Editing a sent kudos.
Comment threads. Rich text. Image uploads. If you're building any of these,
you've drifted.

This is a proof of concept. Production work and automated tests are out of
scope. Follow `.ai/rules.md` for small, focused changes.

## Decisions

Short entries as you build — not documentation, just the call and the reason:

- We start with no current colleague and “Choose your name” because the
  person using the app should choose their own identity explicitly.
- We keep the current colleague ID only in React state and reset it on
  refresh because this first increment intentionally has no persistence.
  New kudos also live only in React state and reset to the samples on refresh.
- We store only the selected colleague ID and derive the name and role
  from `data/colleagues.json` because that list is the source of truth for
  colleague details.
- Each kudos includes `fromFirstName` and `toFirstName` as historical
  snapshots. These preserve recognition after people leave.
- The MVP imports eight sample records from `data/kudos.json`. The file is
  static mock data. Browser interactions do not write back to it; refreshing
  loads the same samples. Sending updates client-side React state.
- Relative timestamps update every 30 seconds. Hovering shows the exact
  local date, time, and timezone; clicking, tapping, or using the keyboard
  expands the same information inline.
- An empty feed shows “No kudos yet.” and “A little appreciation goes a long
  way.” Cards use one column and ordinary page scrolling, with full messages.
- The feed sorts a copy of the list and keeps one timer for all cards.
- The composer has recipient and category dropdowns and a “Send kudos” button.
  Sending requires a selected sender, recipient, and category. It creates a
  UUID and timestamp, snapshots both first names, adds the kudos to the feed,
  and clears the two dropdowns. The selected sender stays unchanged.
- New kudos have an empty message for now; the message field comes later.
