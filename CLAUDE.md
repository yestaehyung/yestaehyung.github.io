# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Deploy Commands

- `npm start` — local dev server at http://localhost:3000
- `npm run build` — production build to `build/`
- `npm run deploy` — build + deploy to GitHub Pages (`gh-pages` branch)
- `npm test` — run tests (interactive watch mode)

## Deployment

Hosted on GitHub Pages at https://yestaehyung.github.io. The `gh-pages` npm package pushes the `build/` output to the `gh-pages` branch. The `homepage` field in `package.json` controls the base URL.

## Architecture

Single-page React app (Create React App) — academic personal website for a Ph.D. student.

**Layout** (`App.js`): Two-column top section (Profile left, Introduction right) followed by full-width Research Projects and Publications sections.

**Components** (`src/components/`): Each component has a matching CSS file in `src/styles/`. No routing — all content on one page with anchor navigation (#about-me, #projects, #publications).

- `Header` — fixed nav with anchor links
- `Profile` — photo, name, social links (email, Google Scholar, GitHub, CV PDF)
- `Introduction` — bio and research interests
- `ResearchProjects` — filterable project cards (all/ongoing/under-review/completed) with image zoom modal and hover tooltips
- `Publications` — filterable publication list (all/conference/journal) with author highlighting (bold = this author)
- `Footer` — copyright and last updated date

**Data pattern**: Both `ResearchProjects` and `Publications` store data as arrays directly in the component files (not external JSON). New publications/projects are added by editing these arrays.

**Easter egg**: Triple-clicking section titles in ResearchProjects and Publications triggers a "chaos mode" animation.

**Static assets** (`public/`): Profile image at `public/images/profile.jpg`, project images at `public/images/projects/`, CV PDF at `public/CV_Taehyung/main.pdf`. Referenced via `process.env.PUBLIC_URL`.

## Git Conventions

- `main` branch: source code
- `gh-pages` branch: deployed build output (managed by `gh-pages` package, do not edit directly)
- Commit messages: do not attribute commits to Claude Code
