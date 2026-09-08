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
| `message` | Optional shoutout text | Empty string is allowed; maximum 255 characters |
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
- **The feed is newest first.** Always.
- **No limit on how many kudos one person can send.**
- **Messages are optional.** A kudos can be sent without message text.
- **Only the sender can edit the message.** Show an Edit button when the
  selected current colleague matches the kudos sender. Edit opens the existing
  message in a textarea; Save applies it and Cancel discards the draft.
  The message remains optional and limited to 255 characters, so it can be
  added, changed, or cleared. Sender, recipient, category, saved names, ID,
  and original timestamp cannot be edited; the card keeps its feed position.
  Switching current colleagues discards an open draft. Saved message changes
  are also written automatically to `data/kudos.json`.
- **Always use `data/kudos.json`.** Load the file automatically on startup.
  Sends and saved message edits automatically write the complete kudos list
  back to this file, including cards hidden by filters. Refreshing loads the
  saved data. There are no file pickers or save-location controls. A small
  local Vite handler is explicitly approved for this purpose. A failed load
  cannot overwrite the file; a failed save keeps changes in memory and shows
  a Retry action. Unsaved message drafts are not persisted.
- **Mark kudos-starved colleagues only in the recipient dropdown.** Show a right-aligned ⌛
  and a pale yellow background for a current
  colleague's name when they have never received kudos or their latest received
  kudos is more than seven days old. Exactly seven days does not qualify. Hover
  text is “kudos starved”. Receiving a new kudos removes the marker immediately.
  Selecting a marked recipient also shows “Has not received kudos in 7 days”
  next to “To”.
  The “Who’s here today?” dropdown shows plain names without starvation indicators.
- **Keep historical names.** Display the saved first names even if a colleague's
  name changes or their entry is removed from `data/colleagues.json`.
- **Mark former colleagues.** If a sender or recipient ID is absent from the
  current colleague list, show “No longer works here” beside that person's
  saved name. Keep the kudos in the feed.

## Still open — yours to decide

There's no single right answer to any of these. There is a wrong answer:
"we never thought about it." Write your answer and reason here as you settle
each one, or log it under Decisions below.

- Should whitespace-only messages be treated as empty? The current form preserves entered text.

## Deliberately out of scope

Authentication. A standalone backend or unrelated API endpoints. A database.
Notifications. Editing kudos fields other than the message.
Comment threads. Rich text. Image uploads. If you're building any of these,
you've drifted.

This is a proof of concept. Production work and automated tests are out of
scope. Follow `.ai/rules.md` for small, focused changes.

## Decisions

Short entries as you build — not documentation, just the call and the reason:

- We start with no current colleague and “Choose your name” because the
  person using the app should choose their own identity explicitly.
- We keep the current colleague ID only in React state and reset it on refresh.
  Kudos persist in `data/kudos.json`; unsaved drafts do not.
- We store only the selected colleague ID and derive the name and role
  from `data/colleagues.json` because that list is the source of truth for
  colleague details.
- Each kudos includes `fromFirstName` and `toFirstName` as historical
  snapshots. These preserve recognition after people leave.
- The user approved a local Vite file writer as an exception to the original
  no-backend rule. `data/kudos.json` starts with sample records and is the
  persistent source of truth. The file must contain a valid kudos array with
  unique IDs. Sending is available only after the initial file load succeeds.
- Relative timestamps update every 30 seconds. Hovering shows the exact
  local date, time, and timezone; clicking, tapping, or using the keyboard
  expands the same information inline.
- An empty feed shows “No kudos yet.” and “A little appreciation goes a long
  way.” Cards use one column and ordinary page scrolling, with full messages.
- The feed sorts a copy of the list. One timer in `App` updates relative times
  and the kudos-starved status every 30 seconds; both use the current kudos list.
- The composer has recipient and category dropdowns and a “Send kudos” button.
  Sending requires a selected sender, recipient, and category. It creates a
  UUID and timestamp, snapshots both first names, adds the kudos to the feed,
  and clears the two dropdowns. The selected sender stays unchanged.
- The message field is optional and limited to 255 characters, with a visible
  character count. The textarea and submit handler enforce the limit. Sending
  saves the entered text and clears the field along with the dropdowns.
