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

Static mock data containing eight sample kudos. Every
record contains `id`, `from`, `to`, `fromFirstName`, `toFirstName`, `message`,
`category`, and `createdAt` (an ISO 8601 UTC timestamp). The feed sorts the
records newest first without depending on their order in this file.

Sample IDs `c11` (Maja) and `c12` (Jonas) intentionally do not appear in the
current colleague list. Their cards demonstrate the “No longer works here”
label for a sender and a recipient.

The app imports this file directly. Edit it to change the sample data;
browser interactions do not write back to it. A future send form will use
React state, and refreshing will reload the samples.

The initial dates are fixed sample timestamps, so their relative labels age
naturally rather than resetting whenever the app opens.
