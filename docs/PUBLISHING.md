# Publishing

This project supports both manual publishing and GitHub Actions based publishing.

## Manual Release

1. Authenticate with npm.

```bash
npm login
```

2. Create a Changeset for the consumer-facing change.

```bash
corepack pnpm changeset
```

3. Apply version updates.

```bash
corepack pnpm version-packages
```

4. Run the smoke suite.

```bash
corepack pnpm smoke
```

5. Publish to npm.

```bash
corepack pnpm publish --access public
```

## Automated Release

The repository includes a GitHub Actions release workflow.

Required repository secrets:

- `NPM_TOKEN`

Recommended repository settings:

- Default branch: `main`
- Issues: enabled
- Discussions: optional
- Wiki: disabled unless long-form documentation grows beyond the repository docs

## Release Checklist

- CI is green on `main`
- Smoke suite passes locally
- README and docs reflect the public API
- A Changeset exists for any published change
- npm authentication is valid
