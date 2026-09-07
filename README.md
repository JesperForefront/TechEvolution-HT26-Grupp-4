# Evolution Lab — Kudos Wall

A two-day lab for Tech Evo. You build a small app under time pressure, defend
the decisions behind it to people who weren't in the room, then take on a new
requirement against a deadline that doesn't move.

**The case:** a Kudos Wall. People send short shoutouts to colleagues — "thanks
for staying late with the deploy", "great pairing session". One entity, one
screen, no backend.

## Getting started

```
git clone <repo-url>
cd evolution-lab-kudos
npm install
npm run dev
```

That gets you a blank React + TypeScript app (Vite) with nothing in it. There
is no domain code, state, or UI beyond a placeholder heading — you and your
team build the Kudos Wall into `src/` from here.

Read these two before you write anything:

1. `docs/01-build.md` — what Monday's session asks of you
2. `.ai/domain-model.md` — what a Kudos actually is

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
.ai/          domain-model.md is required reading. architecture.md and
              conventions.md are pointer files — not required upfront, point
              your AI tool at them when they become relevant.
data/         Mock data. The colleague list lives here so every team has the same names.
src/          Your application. Minimal React + TypeScript starter only —
              build the Kudos Wall on top of it.
```
