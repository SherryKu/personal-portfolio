# Kexun Liu — Portfolio

A small site with three pages, built with Next.js and exported as static files to GitHub Pages.

| Address       | Page                                                                   |
| ------------- | ---------------------------------------------------------------------- |
| `/`           | The landing page: one sheet of paper with two doors                    |
| `/engineer/`  | Product design, frontend engineering and AI work                       |
| `/musician/`  | Pipa: profile, performances, repertoire and creative work              |

When applying for jobs, link straight to `/engineer/` so a reader lands on the work without passing through the landing page first.

## Changing the words

All copy lives in [`app/content.ts`](app/content.ts), in four parts: the site and its page titles, the landing page, the engineer page, and the musician page. Edit the text there and the layouts follow.

On the musician page, performances are listed newest first, grouped by year. To add one, put a new entry at the top of `musician.performance.entries`:

```ts
{ year: 2027, when: "March", text: "Performed …" },
```

`when` is optional. Chinese titles can be written straight into the text; they are picked up and set in a Chinese typeface.

## The ink artwork

The ink on the landing page and at the top of the musician page is one image: [`public/art/ink-wave.webp`](public/art/ink-wave.webp), 2000 × 667 with a transparent background.

On the landing page it is placed so that the point where its lines gather sits exactly on the red node in the centre. A replacement with the same size and the same gathering point (about 73% across, 69% down) drops in without changes. For different artwork, adjust `.landing__wave` in [`app/globals.css`](app/globals.css).

## Adding screenshots (engineer page)

Each project looks for images in its own folder under `public/work/`:

| Project                 | Folder                            |
| ----------------------- | --------------------------------- |
| Retailer Pulse Platform | `public/work/retailer-pulse/`     |
| Dealer-Facing AI Agent  | `public/work/ai-agent/`           |
| Workbook & Analytics    | `public/work/workbook-analytics/` |

Name the files `web` (a desktop screenshot) and `mobile` (a phone screenshot). PNG, JPG and WebP all work, for example `web.png` and `mobile.jpg`. Either one is optional.

- With both, the phone overlaps the corner of the desktop screenshot.
- With one, it is shown alone.
- With none, the project is presented as text, so the published site never shows an empty frame. While developing you'll see dashed placeholders marking where the images go.

Sizes that work well: about 2400–2880 px wide for desktop (16:10), and a normal phone capture such as 1170 × 2532 for mobile. Frames follow each image's own shape; very tall captures are trimmed from the bottom. Compress large files before adding them.

## Adding the résumé

Put the PDF in `public/` with "resume" or "cv" somewhere in its name, for example `public/Kexun-Liu-Resume.pdf`. The "View résumé" links on the engineer page appear on their own, and its header link switches from LinkedIn to Résumé.

## Linking a case study

Project links ("View case study", "Explore the approach", "Explore the work") stay hidden until they have somewhere to go. When a case study exists, add `href` to that project's `link` in `app/content.ts`:

```ts
link: { label: "View case study", href: "/work/retailer-pulse/" },
```

## Design notes

- **Ink on paper.** Warm white `#f6f3ec` and near-black `#1a1917`, with a faint paper grain.
- **Two inks.** Seal red `#b5341f` belongs to the engineer, indigo `#26438f` to the musician. Each page uses one as its accent, for the first string and for things being touched (hover, focus, selection). The other ink appears only on links that cross to the other page. The landing page is the one place both are used together.
- **Two voices.** Newsreader (serif) for names, titles and prose; Instrument Sans for labels, facts and navigation.
- **Four strings.** The one recurring mark, after the pipa. A pointer crossing a string plucks it. With reduced motion turned on, they stay still. On the landing page they gather to a single point at the red node and open out as they rise; on the other pages they run level and parallel. Either way they are one bundle: four strings following a single curve, levelling out without a kink ([`app/lib/bundle.ts`](app/lib/bundle.ts)).
- **The landing page.** On the left the ink flows; on the right the same lines are pulled straight and measured. They meet at one red point. Each half is a link, and each has its own cursor: a drop of ink that trails, and a crosshair that is exact.
- **The diagram on the right is real.** The short ticks are frets, each a twelfth root of two closer to the bridge than the last. The three tall lines mark a quarter, a third and a half of the string, which sound a fourth (4 : 3), a fifth (3 : 2) and an octave (2 : 1). See [`app/components/FretDiagram.tsx`](app/components/FretDiagram.tsx).
- **Moving between pages.** The three pages lie side by side on one long sheet, like a handscroll: musician, landing, engineer. Going from one to another is a slow pan along it. The ink and the strings glide to their new places instead of leaving with the sheet, the name stays put, and headlines move a little faster than the paper. Speed and feel are two values, `--pan-time` and `--pan-ease`, under "Moving between the pages" in `app/globals.css`. Between the landing page and the engineer's page the strings are redrawn frame by frame as that bundle opens out and straightens, so there are always exactly four (the script is in [`app/layout.tsx`](app/layout.tsx)). Browsers without support simply change page.

Colours and spacing are defined once at the top of [`app/globals.css`](app/globals.css).

## Link previews

Each page has its own preview image for LinkedIn, messages and so on: `public/og.png` (landing), `public/og-engineer.png` and `public/og-musician.png`. They are pictures of the pages, so they need remaking if the design or the headline changes.

## Local development

Requires Node.js 22.13 or newer and pnpm.

```bash
pnpm install
```

```bash
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Publishing

```bash
pnpm build
```

This writes the static site to `out/`. A GitHub Actions workflow builds and publishes it to GitHub Pages whenever `main` is updated.
