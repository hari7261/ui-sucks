# Contributing

Thanks for contributing to `ui-sucks`.

## Principles

- Keep the public API small and composable.
- Preserve accessibility and keyboard support by default.
- Prefer platform primitives over abstractions with hidden runtime cost.
- Avoid adding dependencies unless the value is clear and measurable.
- Treat bundle size as a product requirement.

## Local Setup

```bash
corepack pnpm install
corepack pnpm build
corepack pnpm test
```

## Development Workflow

1. Create a branch from `main`.
2. Make focused changes with tests where behavior changes.
3. Run the smoke suite before opening a pull request.
   CI runs the same validation on every branch push and on pull requests targeting `main`.

```bash
corepack pnpm smoke
```

4. If the change affects a published package, add a Changeset.

```bash
corepack pnpm changeset
```

## Coding Standards

- Use TypeScript-first APIs.
- Export all public component prop types.
- Forward refs for public React components.
- Preserve controlled and uncontrolled behavior where it is part of the component contract.
- Keep comments brief and only where they improve readability.

## Pull Requests

Good pull requests include:

- A short problem statement
- The approach taken
- Screenshots or clips when behavior is visual
- Test updates for behavioral changes
- Documentation updates for public API changes
- A branch that stays green in CI and is safe to delete after merge

## Release Notes

Changesets drive versioning and release notes. If your change affects consumers, include a clear summary in the generated Changeset file.
