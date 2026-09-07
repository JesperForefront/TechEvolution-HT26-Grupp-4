# Session 3 — Improve

**Tuesday 13:00–14:30 · in your own code**

Same rule as Monday: we're grading how you reasoned about this, not how much
you shipped.

You're back in the app you built and explained this morning. Your
facilitator hands out an envelope with one new requirement — you do not get
to see it in advance, and different groups may get different ones.

Ninety minutes. Real conditions: a deadline that does not move, and a
requirement from someone who was not in the room when you made your original
calls — including some of your own, from yesterday.

## Before touching code (10 min, no exceptions)

Open the envelope as a group. Read the requirement once, in full. Then
answer, out loud, before opening anything:

1. **What does this actually mean?**
2. **What does it affect?**
3. **What needs to change, and where?**

Agree on an interpretation and write it down — it's what you update
`.ai/domain-model.md` with later. Only then start prompting.

## How to work

**Change the domain rule, not the symptom.** If the requirement is a rule about
kudos, it belongs where the rules live, not in the click handler that happened to
be nearest.

**Commit per requirement**, with a message that says what you did.

**Update `.ai/domain-model.md` as you go.** If your change contradicts what
is written there, fix the file in the same commit. Leaving it stale is how a
codebase starts lying.

**If something in the envelope is ambiguous, decide and write it down.** Do not
stall waiting for clarification. Real requirements are ambiguous and shipping
with a stated assumption beats shipping nothing.

## If you get stuck

Ask the team you were paired with this morning — they've now heard your app
explained once and may spot something you're too close to see. Or ask a
facilitator.

## Done means

- [ ] The requirement is implemented
- [ ] Nothing that worked this morning is broken now
- [ ] `.ai/domain-model.md` matches the code
- [ ] Commits explain what changed and why
- [ ] You can say, in one sentence, what the requirement meant and why you
      read it that way
- [ ] Pushed

## The last ten minutes

We use the app. For real. Everyone sends a genuine kudos to someone in the room,
through the thing you built.

Then, as a group: when did AI help most today, and when did you have to brake
or steer it yourselves?

Two days ago this was an exercise. Make it something you would actually want to
keep using.
