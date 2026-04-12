# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run start` — local dev server with hot reload
- `npm run build` — production build to `./build`
- `npm run serve` — serve the production build locally
- `npm run clear` — clear Docusaurus cache (use when stale build state causes weird errors)
- `pre-commit run --all-files` — run formatters/linters across the repo

There are no tests in this repo.

## Architecture

This is a personal website built with Docusaurus (classic preset, JS — not TS), deployed to GitHub Pages at `mathpluscode.com`. Check `package.json` for the exact Docusaurus version and read `docusaurus.config.js` for current site config — don't assume docs/blog plugins are enabled, they may be disabled.

A few invariants worth knowing that you can't derive quickly from the tree:

- `onBrokenLinks: "throw"` in the Docusaurus config means broken internal links fail the build, not just warn.
- `static/` is copied verbatim into the build root. `static/CNAME` controls the GitHub Pages custom domain — do not delete it.
- The homepage is a custom React page under `src/pages/`, not generated from Markdown.

## Deployment

Deployment is fully automated via GitHub Actions — pushes to `main` build and publish to the `gh-pages` branch, and PRs run a build-only check. See `.github/workflows/` for current details. Do not run `npm run deploy` locally.

## Formatting

Pre-commit hooks (Prettier + standard `pre-commit-hooks`) format JS/CSS/MD/YAML. `.prettierrc` defines the Prettier config. Run `pre-commit install` once after cloning.
