# Working rules

- This is a simple proof of concept for a time-limited lab. Production is out
  of scope. Prioritize quick turnaround and code the team can easily explain.
- Make small, focused changes, one feature or correction at a time. Avoid
  broad refactors and speculative work for future requirements.
- Keep components elegant, modular, and small, with one clear responsibility.
  Use direct data flow and extract helpers only when they improve clarity.
- No backend, API endpoints, database, or server-side file writing. Use the
  supplied JSON files as mock data and React state for interactions.
- Follow `domain-model.md`, `architecture.md`, and `conventions.md`. Ask about
  conflicting or unclear requirements before changing scope. Do not rewrite
  constraints to justify an implementation.
- Automated tests, test infrastructure, and lengthy verification are out of
  scope unless explicitly requested. Keep checks brief; a build is enough
  for routine code changes.
- Add no dependencies, abstraction layers, or production infrastructure
  without a concrete need in the current request.
