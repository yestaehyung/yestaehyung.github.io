# Pretext Paper Blog Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `pretext`-driven title balancing and reading-rhythm blocks to the paper blog, while switching the site’s default sans font to `SUIT`.

**Architecture:** Keep the current `posts.json` data model and markdown renderer, then layer new presentation helpers and small blog-focused components on top. Use `@chenglou/pretext` only for balanced multiline text and keep a plain-text fallback so the blog still renders if layout measurement fails.

**Tech Stack:** Create React App, React 19, React Router, Testing Library/Jest, CSS, `@chenglou/pretext`

---

## File Structure

### Files To Create

- `src/lib/pretextLayout.js`
  Wrapper around `@chenglou/pretext` with a safe fallback for tests and narrow/mobile widths.
- `src/lib/pretextLayout.test.js`
  Unit tests for the balancing wrapper. Mock `@chenglou/pretext` instead of relying on canvas internals in Jest.
- `src/lib/blogPresentation.js`
  Pure helpers that derive `lead summary`, `pull quote`, and spotlight metadata from existing blog post data.
- `src/lib/blogPresentation.test.js`
  Unit tests for the blog presentation rules.
- `src/components/PretextBalancedText.js`
  Small presentational component that renders balanced lines returned by `pretextLayout`.
- `src/components/BlogPostHero.js`
  Reusable blog-detail hero that renders venue/date, balanced title, author, tags, and lead summary.
- `src/components/BlogRhythmSection.js`
  Reusable wrapper that renders a section heading, optional rhythm block, and markdown body.
- `src/components/Blog.test.js`
  Focused render tests for the blog list/detail experience. This replaces the obsolete CRA starter smoke test.

### Files To Modify

- `package.json`
  Add `@chenglou/pretext`.
- `package-lock.json`
  Lockfile update for the new dependency.
- `public/index.html`
  Load the `SUIT` font stylesheet.
- `src/App.css`
  Replace global `Google Sans` usage with `SUIT` and adjust shared typography defaults.
- `src/index.css`
  Align the base font stack with `SUIT`.
- `src/components/Blog.js`
  Integrate the new hero, balanced titles, and rhythm sections into list/detail routes.
- `src/components/PaperGraph.js`
  Update canvas label font stack to `SUIT`.
- `src/styles/Blog.css`
  Keep existing layout, but add styles for the list balancing and the new rhythm/detail blocks.
- `src/styles/FeaturedProjects.css`
  Replace `Google Sans` override with `SUIT`.
- `src/styles/Publications.css`
  Replace `Google Sans` override with `SUIT`.
- `src/styles/ResearchProjects.css`
  Replace `Google Sans` override with `SUIT`.
- `src/styles/ResearchNetwork.css`
  Replace `Google Sans` override with `SUIT`.
- `src/App.test.js`
  Remove or replace the stale CRA starter test that currently fails due to app architecture drift.

### Baseline Notes

- `src/App.test.js` is already broken today.
  Running `CI=true npm test -- --watchAll=false` currently fails with `Cannot find module 'react-router-dom' from 'src/App.js'`.
- Do not spend time preserving the old CRA “learn react” test. Replace it with blog-focused tests that match the actual app.
- Keep `OpenClawMissionControl` fonts unchanged.

## Chunk 1: Foundations

### Task 1: Replace the stale smoke test and add pure helper coverage

**Files:**
- Create: `src/lib/pretextLayout.js`
- Create: `src/lib/pretextLayout.test.js`
- Create: `src/lib/blogPresentation.js`
- Create: `src/lib/blogPresentation.test.js`
- Create: `src/components/Blog.test.js`
- Modify: `src/App.test.js`

- [ ] **Step 1: Write failing tests for the new helper boundaries**

Write tests for:

```js
// src/lib/pretextLayout.test.js
import { getBalancedLines } from "./pretextLayout";

jest.mock("@chenglou/pretext", () => ({
  prepareWithSegments: jest.fn(() => ({ prepared: true })),
  layoutWithLines: jest.fn(() => ({
    lines: [{ text: "alpha beta" }, { text: "gamma" }],
    lineCount: 2,
    height: 48,
  })),
}));

test("returns balanced lines from pretext", () => {
  expect(getBalancedLines("alpha beta gamma", { maxWidth: 220 })).toEqual([
    "alpha beta",
    "gamma",
  ]);
});

test("falls back to a single line when layout input is invalid", () => {
  expect(getBalancedLines("", { maxWidth: 220 })).toEqual([""]);
});
```

```js
// src/lib/blogPresentation.test.js
import {
  buildLeadSummary,
  pickPullQuote,
  buildSpotlightItems,
} from "./blogPresentation";

const post = {
  title: "Example paper",
  venue: "ICML 2026",
  tags: ["LLM Personalization", "Preference Learning", "DPO"],
  sections: {
    background: "Background sentence.",
    motivation: "Motivation sentence with the strongest framing.",
    results: "Results sentence.",
    discussion: "Discussion sentence.",
  },
};

test("buildLeadSummary prefers motivation and results content", () => {
  expect(buildLeadSummary(post)).toMatch(/Motivation sentence|Results sentence/);
});

test("pickPullQuote returns a short sentence-sized emphasis line", () => {
  expect(pickPullQuote(post).length).toBeGreaterThan(10);
});

test("buildSpotlightItems returns compact metadata strings", () => {
  expect(buildSpotlightItems(post)).toContain("ICML 2026");
});
```

```js
// src/components/Blog.test.js
test("renders a balanced blog list title", () => {});
test("renders a blog detail hero with lead summary", () => {});
test("renders rhythm blocks only for selected sections", () => {});
```

- [ ] **Step 2: Run the new tests and confirm they fail**

Run:

```bash
CI=true npm test -- --watchAll=false src/lib/pretextLayout.test.js src/lib/blogPresentation.test.js src/components/Blog.test.js
```

Expected:

- FAIL because the helper modules and blog tests do not exist yet.

- [ ] **Step 3: Implement the pure helpers and remove the stale CRA test**

Implementation requirements:

- `src/App.test.js` should no longer import `App` and no longer reference “learn react”.
- `src/lib/pretextLayout.js` should export a narrow API such as:

```js
export function getBalancedLines(text, options = {}) {}
```

- `src/lib/blogPresentation.js` should keep the rules pure and deterministic.
- Do not put React hooks in these helper files.

- [ ] **Step 4: Re-run the focused tests**

Run:

```bash
CI=true npm test -- --watchAll=false src/lib/pretextLayout.test.js src/lib/blogPresentation.test.js
```

Expected:

- PASS for the pure helper tests.

- [ ] **Step 5: Commit the foundations**

```bash
git add src/App.test.js src/lib/pretextLayout.js src/lib/pretextLayout.test.js src/lib/blogPresentation.js src/lib/blogPresentation.test.js src/components/Blog.test.js
git commit -m "test: add blog presentation foundations"
```

## Chunk 2: Dependency And Typography

### Task 2: Install `pretext` and load `SUIT` globally

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `public/index.html`
- Modify: `src/App.css`
- Modify: `src/index.css`
- Modify: `src/styles/FeaturedProjects.css`
- Modify: `src/styles/Publications.css`
- Modify: `src/styles/ResearchProjects.css`
- Modify: `src/styles/ResearchNetwork.css`
- Modify: `src/components/PaperGraph.js`

- [ ] **Step 1: Install the dependency**

Run:

```bash
npm install @chenglou/pretext
```

Expected:

- `package.json` and `package-lock.json` include `@chenglou/pretext`.

- [ ] **Step 2: Load the `SUIT` stylesheet in the HTML template**

Update `public/index.html` to add:

```html
<link
  href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/static/woff2/SUIT.css"
  rel="stylesheet"
/>
```

Also remove the Google Fonts `Google Sans` import because it becomes dead weight.

- [ ] **Step 3: Normalize the global font stack**

Update `src/App.css` and `src/index.css` so the default sans stack starts with:

```css
"SUIT", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

Update the component/style overrides that currently hardcode `Google Sans`:

- `src/styles/FeaturedProjects.css`
- `src/styles/Publications.css`
- `src/styles/ResearchProjects.css`
- `src/styles/ResearchNetwork.css`
- `src/components/PaperGraph.js`

Do not change:

- monospace stacks
- `src/styles/OpenClawMissionControl.css`

- [ ] **Step 4: Run a production build as typography smoke verification**

Run:

```bash
npm run build
```

Expected:

- PASS
- No missing-font or syntax errors caused by CSS edits.

- [ ] **Step 5: Commit the font/dependency work**

```bash
git add package.json package-lock.json public/index.html src/App.css src/index.css src/styles/FeaturedProjects.css src/styles/Publications.css src/styles/ResearchProjects.css src/styles/ResearchNetwork.css src/components/PaperGraph.js
git commit -m "feat: adopt suit and add pretext dependency"
```

## Chunk 3: Blog List

### Task 3: Add balanced multiline titles to the blog list

**Files:**
- Create: `src/components/PretextBalancedText.js`
- Modify: `src/components/Blog.js`
- Modify: `src/styles/Blog.css`
- Modify: `src/components/Blog.test.js`

- [ ] **Step 1: Write the failing list-page test**

Add a list rendering test that:

- mocks `fetch` to return a small post list
- renders `<Blog />` inside a memory router on `/blog`
- mocks `getBalancedLines` to return two lines for a long title
- expects the list card title to render with line wrappers or a dedicated balanced-text class

Example sketch:

```js
jest.mock("../lib/pretextLayout", () => ({
  getBalancedLines: jest.fn(() => [
    "Maximizing mutual information",
    "between user-contexts and responses",
  ]),
}));
```

- [ ] **Step 2: Run the list-page test and confirm failure**

Run:

```bash
CI=true npm test -- --watchAll=false src/components/Blog.test.js --testNamePattern="balanced blog list title"
```

Expected:

- FAIL because the list still renders a plain `<h3>{post.title}</h3>`.

- [ ] **Step 3: Implement `PretextBalancedText` and wire it into the list**

Implementation requirements:

- `PretextBalancedText` should accept at least:

```js
text
as
className
maxLines
lineClassName
```

- The component should use `getBalancedLines` and render each line inside a stable wrapper element.
- In `Blog.js`, replace the plain list title rendering with `PretextBalancedText`.
- In `Blog.css`, improve list card spacing so multi-line titles still look intentional.

- [ ] **Step 4: Re-run the list-page test**

Run:

```bash
CI=true npm test -- --watchAll=false src/components/Blog.test.js --testNamePattern="balanced blog list title"
```

Expected:

- PASS

- [ ] **Step 5: Commit the list-page work**

```bash
git add src/components/PretextBalancedText.js src/components/Blog.js src/styles/Blog.css src/components/Blog.test.js
git commit -m "feat: balance paper titles on blog list"
```

## Chunk 4: Blog Detail

### Task 4: Build the detail hero and reading-rhythm sections

**Files:**
- Create: `src/components/BlogPostHero.js`
- Create: `src/components/BlogRhythmSection.js`
- Modify: `src/components/Blog.js`
- Modify: `src/styles/Blog.css`
- Modify: `src/components/Blog.test.js`

- [ ] **Step 1: Write the failing detail-page tests**

Add tests that:

- render `<Blog />` on `/blog/:postId`
- mock `fetch` with one real-looking post
- assert the detail page renders:
  - balanced title lines in the hero
  - lead summary text derived from the post
  - at least one spotlight/pull-quote block
  - markdown section content still present

Example sketch:

```js
expect(screen.getByText(/Reviewed by OpenClaw's Agent/i)).toBeInTheDocument();
expect(screen.getByText(/LLM Personalization/)).toBeInTheDocument();
expect(screen.getByTestId("blog-lead-summary")).toBeInTheDocument();
expect(screen.getAllByTestId("blog-rhythm-block").length).toBeGreaterThan(0);
```

- [ ] **Step 2: Run the detail-page tests and confirm failure**

Run:

```bash
CI=true npm test -- --watchAll=false src/components/Blog.test.js --testNamePattern="blog detail"
```

Expected:

- FAIL because the detail page still uses the plain header and plain sections.

- [ ] **Step 3: Implement the hero and rhythm wrappers**

Implementation requirements:

- `BlogPostHero` should own:
  - venue/date row
  - balanced title
  - author
  - tags
  - lead summary
  - compact spotlight metadata
- `BlogRhythmSection` should own:
  - section number/title
  - optional rhythm block
  - markdown body
- Keep the existing TOC and section-order logic from `Blog.js`.
- Insert rhythm blocks for only a small subset of sections, using deterministic rules from `blogPresentation.js`.
- Keep fallback behavior simple: if no rhythm block is available, render the section normally.

- [ ] **Step 4: Re-run the detail-page tests**

Run:

```bash
CI=true npm test -- --watchAll=false src/components/Blog.test.js --testNamePattern="blog detail"
```

Expected:

- PASS

- [ ] **Step 5: Commit the detail-page work**

```bash
git add src/components/BlogPostHero.js src/components/BlogRhythmSection.js src/components/Blog.js src/styles/Blog.css src/components/Blog.test.js
git commit -m "feat: add rhythm-focused paper blog detail layout"
```

## Chunk 5: Final Verification

### Task 5: Run the full verification pass

**Files:**
- Modify: any touched files if verification reveals regressions

- [ ] **Step 1: Run the full test suite**

Run:

```bash
CI=true npm test -- --watchAll=false
```

Expected:

- PASS

- [ ] **Step 2: Run the production build**

Run:

```bash
npm run build
```

Expected:

- PASS

- [ ] **Step 3: Perform a manual visual pass**

Run:

```bash
npm start
```

Manual checklist:

- `/blog` list cards show balanced multi-line titles
- `/blog/:postId` hero feels denser and more intentional than before
- lead summary is visible but not oversized
- rhythm blocks appear in a few useful places only
- mobile width does not collapse awkwardly
- non-blog sections still look correct with `SUIT`

- [ ] **Step 4: Fix any regressions found in verification and rerun impacted checks**

If build/test/manual issues appear, fix only the affected files and rerun the narrowest relevant command before rerunning the full suite.

- [ ] **Step 5: Commit the verified feature**

```bash
git add public/index.html package.json package-lock.json src/App.css src/index.css src/components/Blog.js src/components/Blog.test.js src/components/BlogPostHero.js src/components/BlogRhythmSection.js src/components/PaperGraph.js src/components/PretextBalancedText.js src/lib/pretextLayout.js src/lib/pretextLayout.test.js src/lib/blogPresentation.js src/lib/blogPresentation.test.js src/styles/Blog.css src/styles/FeaturedProjects.css src/styles/Publications.css src/styles/ResearchProjects.css src/styles/ResearchNetwork.css
git commit -m "feat: redesign paper blog reading rhythm"
```
