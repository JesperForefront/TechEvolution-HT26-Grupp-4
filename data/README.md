# data

Mock data for the lab. Every team uses the same list, so the apps stay
comparable across the room.

## colleagues.json

Ten fictional colleagues. Each has an `id`, a `name` and a `role`.

`id` is the stable reference — a Kudos stores `from` and `to` as colleague IDs.
It also saves `fromFirstName` and `toFirstName` as historical snapshots, so
recognition remains readable after a colleague leaves. Departure labels are
determined by whether those IDs still exist in this file.

There is no user account model here and there does not need to be one. "The
current user" is whichever colleague is selected in your UI.

If you build a leaderboard, decide how to compute it — see the "Still open"
section in `.ai/domain-model.md`.

Add or edit entries if you like, but keep the shape.

## kudos.json

The persistent kudos file, initially containing eight sample kudos. Every
record contains `id`, `from`, `to`, `fromFirstName`, `toFirstName`, `message`,
`category`, and `createdAt` (an ISO 8601 UTC timestamp). The feed sorts the
records newest first without depending on their order in this file.

Sample IDs `c11` (Maja) and `c12` (Jonas) intentionally do not appear in the
current colleague list. Their cards demonstrate the “No longer works here”
label for a sender and a recipient.

The app automatically reads this file on startup and writes newly sent
kudos and saved message edits back to it through a small approved local Vite
handler. The path is fixed: there are no file pickers or save-location
controls. The file contains the complete feed, regardless of active filters.
The colleague list is not written by the app. Reload to read the latest saved
records. Run with `npm run dev` or `npm run preview` for file saving.

Vite ignores changes to this file and its temporary write file so saving
does not trigger a page reload. JSON is validated before it replaces the
file, and unsuccessful writes are reported in the app.

The initial dates are fixed sample timestamps, so their relative labels age
naturally rather than resetting whenever the app opens.
