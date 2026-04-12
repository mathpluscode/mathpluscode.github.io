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

This is a personal website built with **Docusaurus 3.6** (classic preset, JS — not TS), deployed to GitHub Pages at `mathpluscode.com`.

- `docusaurus.config.js` — site config: URL, navbar, footer, prism themes, color mode. `onBrokenLinks: "throw"` means broken links fail the build.
- `src/pages/index.js` — homepage entry, rendered as a custom React page (not from `docs/`). Uses `src/components/Homepage` for the main content grid.
- `src/components/Homepage/` — `GridBlock.js` is the reusable card; `index.js` composes the homepage layout.
- `docs/` — Docusaurus docs content (currently just `intro.md`); `sidebars.js` defines the sidebar.
- `static/` — copied verbatim into the build root. `static/CNAME` controls the GitHub Pages custom domain — do not delete it.
- `src/css/custom.css` — global theme overrides.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which runs `npm ci && npm run build` and publishes `./build` to the `gh-pages` branch via `peaceiris/actions-gh-pages`. PRs run `test-deploy.yml` to verify the build. Do not run `npm run deploy` locally — deployment is automated.

## Formatting

Pre-commit hooks (Prettier + standard `pre-commit-hooks`) format JS/CSS/MD/YAML. `.prettierrc` defines the Prettier config. Run `pre-commit install` once after cloning.
