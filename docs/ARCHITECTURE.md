# Architecture

`ui-sucks` is designed around a small set of principles:

- Headless primitives first
- Accessibility as part of the implementation, not an addon
- Strict TypeScript APIs with explicit exports
- Build output optimized for tree-shaking and low bundle cost

## Layers

### 1. Public primitives

The current public primitives live in `src/components`:

- `button`
- `dialog`
- `toast`

Each component exports:

- Its implementation
- Its public prop types
- Small, composable subcomponents when composition improves ergonomics

### 2. Shared utilities

`src/utils` contains narrow helpers used by multiple components:

- `composeRefs`
- `focus`
- `useCallbackRef`
- `useControllableState`

These utilities are intentionally framework-local and dependency-free.

### 3. Build surface

The published package exposes:

- Root entry point: `ui-sucks`
- Subpath exports: `ui-sucks/button`, `ui-sucks/dialog`, `ui-sucks/toast`

This keeps consumer imports tree-shakeable and avoids forcing the entire library into every bundle.

## Accessibility Strategy

- Correct roles and ARIA relationships are wired into primitives
- Controlled and uncontrolled state patterns are both supported
- Keyboard interactions are first-class behavior
- Focus restoration and trapping are handled in dialog primitives

## Dependency Strategy

Runtime dependencies are avoided. The library relies on React and React DOM as peer dependencies and uses dev-only tooling for building, linting, and testing.
