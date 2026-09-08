# Conventions

Point your AI tool at this file when naming things, structuring files, or
writing commits — not required reading upfront.

Read `rules.md` first for scope, small changes, and quick turnaround.

## Naming

- Use the domain words from `.ai/domain-model.md`: a `Kudos` is a Kudos, not
  a `Message`, `Post`, `Item` or `Entry`.
- Keep the domain vocabulary in English even if you discuss it in Swedish.
- Booleans read as questions: `isAnonymous`, `canSend`, `hasReacted`.
- Functions that compute say so: `getTopReceivers`, `countReactions`.

## Files

- One component per file, named after the component.
- No file over ~200 lines. If one grows past that, it is doing two jobs.

## Commits

Small, and in the imperative: `add category filter to feed`,
`show self-kudos in the feed`. You'll be walking another team through this
history tomorrow — a wall of `wip`, `fix`, `asdf` tells them nothing.

Commit whenever something works. Don't save it all for one commit at 16:29.

## Comments

Comment the **why**, never the what. `// sorted descending so newest is
first` is noise. `// self-kudos allowed on purpose — see domain-model.md` is
gold.

## Working with the brief

`.ai/domain-model.md` is your requirements. Build what it says — if you
disagree with something in it, that is a conversation to have, not a
decision to make silently.

## AI-generated code

Same bar as anything else. If you cannot explain a line, it does not go in —
because tomorrow somebody will point at it and ask.
