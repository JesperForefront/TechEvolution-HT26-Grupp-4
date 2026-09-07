# Architecture

Not required reading before you start. Point your AI tool at this file when
you're deciding where code goes or how state should flow — practice being
deliberate about which context file you hand it, instead of dumping
everything into one prompt.

## The shape, not the how

One source of truth for the kudos list. The send form writes to it, the feed
reads from it.

```
[ Send form ] --add(kudos)--> [ kudos store ] --read(kudos[])--> [ Feed ]
```

This is the intended flow for the later kudos increment. Current application
decisions are recorded below; unresolved domain questions remain under
"Still open" in `.ai/domain-model.md`.

## Given, not decided

- **No backend.** Whatever state management you pick lives entirely on the
  client.
- **Stack is given.** React + TypeScript (Vite), already scaffolded in `src/`.
  The lab is about how you reason and how you hand your reasoning over, not
  which framework you picked — so we picked it for you.

## Current increment: colleague selection

```text
data/colleagues.json --> typed colleagues --> App --> CurrentUserSelector
                                            ^               |
                                            |-- selected ID-|
```

- `src/main.tsx` mounts the app and imports global styles.
- `src/app/` owns page composition and `currentUserId: string | null` in
  React state. It begins as `null` and resets on a full page refresh.
- `src/features/colleagues/` owns the `Colleague` type and the typed import
  of the existing JSON. IDs, names, and roles are readonly.
- `src/features/current-user/` owns `CurrentUserSelector`. Its typed props
  are `colleagues`, `currentUserId`, and `onCurrentUserChange`. It derives
  the selected colleague from the ID and reports changes to `App`.
- The board heading and compact colleague picker share the top row and
  stack on mobile. The future feed belongs below that row; a future
  “Give kudos” button will open a small form. These features are not built yet.
- Components use colocated CSS Modules; `src/styles/global.css` owns base
  styles and shared design tokens. TypeScript strict checking is enabled.

The colleague list is imported at build time, not fetched. The selector uses
native HTML behavior and disables itself when the list is empty. There is no
browser storage, routing, context provider, or external state library in this
increment. React state in the common parent is sufficient for this screen.

Future kudos functionality belongs in its own feature folder, with one
source of truth for the kudos list as shown above. Create additional shared
abstractions only when there is an actual shared use. Keep names descriptive
and comments limited to non-obvious reasons.
