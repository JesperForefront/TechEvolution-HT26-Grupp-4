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
| `message` | The shoutout | Short — decide a max length and enforce it |
| `category` | What kind of praise | One of a fixed set, see below |
| `createdAt` | When it was sent | Store and display however you decide |

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
Vi måste kunna se vem som inte har fått någon Kudos på sju dagar!! 
Så att vi vet hur vi ska peppa våra medarbetare och jobba mot ett oss! 
 
Asså det hade ju varit riktigt bra om vi kunde få en sortering också - typ per roll eller liknande! 

## Still open — yours to decide

There's no single right answer to any of these. There is a wrong answer:
"we never thought about it." Write your answer and reason here as you settle
each one, or log it under Decisions below.

- Can `message` be empty? Whitespace only? Very long?
- What does the feed show when it's empty?
- Does anything survive a page refresh — and if so, how?
- If a kudos references a colleague no longer in the list, what happens?
- Where does validation live, and is it in one place or several?
- How do you keep things fast as the feed grows — recompute on every render,
  or keep a running total somewhere?

## Deliberately out of scope

Authentication. A backend. A database. Notifications. Editing a sent kudos.
Comment threads. Rich text. Image uploads. If you're building any of these,
you've drifted.

## Decisions

Short entries as you build — not documentation, just the call and the reason:

- We chose persistent storage locally because it feels right to save.
- We chose json for the messages because the application isn't large enough for the performance to take a hit.
- We chose to allow empty messages because the category already says something, the message is extra.
- We chose to limit the length of messages because limit spam and save on local storage.
- We chose to show an encouraging message when the feed is empty because to get things going.
- We chose to show old kudos because the customer asked for it, partly because we accidentally gave them the idea.
- We chose to always save the first name of both the sender and receiver because they are always neccesary.
- We chose to have validation in multiple places because it is simple and this is only an MVP.

- We chose ___ because ___.
