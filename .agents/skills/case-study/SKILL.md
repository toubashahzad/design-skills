---
name: case-study
description: Build or change a case study page on this portfolio — the header panel, the section model, and the images behind it. Use when adding a new study, adding or replacing screens, mockups or a logo, changing how a study's sections lay out, publishing a draft, or when a case study header does not fit on the screen.
---

# Case studies

A study is one file in `src/lib/case-studies/<slug>.ts` exporting a `CaseStudy`,
plus a folder of images at `public/images/case-studies/<slug>/`. There is no
JSX to write: the file is data, and `Sections.tsx` renders it.

Read `src/lib/case-studies/types.ts` before reaching for a field. It is the
spec, it is commented, and the comments say *why* — which is usually the thing
that decides whether a field is the right one.

## Start here

Before changing a study, and whenever this skill is invoked by name, report
what the study is currently made of:

```bash
node --experimental-strip-types .agents/skills/case-study/scripts/status.mjs <slug>
```

It prints the header shape, the accent and panel, whether the lead is on the
page, the section kinds and their counts, and — the part worth running it for
— which pictures the study asks for that have no file, and which files in the
folder nothing asks for. A missing picture is not an error anywhere: the frame
renders empty and the build passes, so nothing else will tell you.

Invoked with no study named, run it for the one the conversation is about, or
ask which. With no slug it lists them.

It reads the study by importing the TypeScript, so it reports the real object
rather than a guess made from the source text. That matters for a study whose
sections are built in a loop — KFC's seven walkthrough features come out of an
array, and no regex over the file would find the slugs they resolve to.

Then say, in a line or two: what the study is, what is missing, and what you
are about to change.

## Adding a study

1. Write `src/lib/case-studies/<slug>.ts`.
2. Import it in `src/lib/case-studies/index.ts` and add it to `allCaseStudies`,
   in the order the landing page lists its projects.
3. Set `caseStudy` on the matching project in `src/lib/projects.ts` — that is
   what turns the tile into a link. Without it the page exists and nothing
   points at it.
4. `slug` must match the project slug, because it is the URL.

## Drafts

`draft: true` keeps a study off production entirely — no route, no tile link,
not in the sitemap. It is visible only where `NEXT_PUBLIC_SHOW_DRAFTS=1`, which
is set on the Preview deployment and unset on production.

Publishing is deleting that one line. Nothing else moves.

Verify a publish against a production build with the flag unset: the page
should serve 200, appear in the sitemap, and be linked from the landing tile,
while the remaining drafts still 404.

## The header

Three shapes, chosen by what the study sets:

- **plain** — type on the page. The default.
- **`headerGlow`** — a band with discs of the product's colour in the corner.
  `true` uses the study's `accent`; a list of colours is for a mark that is
  more than one colour.
- **`headerArt: { art, wash }`** — a panel: wordmark, headline and chips on one
  side, the product's mockup on the other, over `wash`. `art` is the mockup's
  slug in the images folder.

**The whole panel must sit above the fold.** Four things decide its height, and
all four are already tuned against the window — do not undo them casually:

- the mockup is capped at `lg:max-h-[calc(100svh-18.5rem)]`, where the reserve
  is the sticky header, the panel's padding and the chip row;
- the wordmark is capped at `lg:h-[min(6rem,13svh)]`;
- the headline is capped at `lg:text-[min(2.125rem,4.6svh)]`, which only bites
  on windows shorter than about 740px;
- the chips run across the whole panel, under the grid — not in the writing
  column, where five of them never fit in half a laptop's width.

On a short window it is the **writing**, not the picture, that sets the panel's
height. A change that narrows the headline's column adds a line, and that is
what breaks the fold first. Measure, do not assume: check the panel's
`getBoundingClientRect().bottom` against the viewport at 1024×640, 1152×620,
1280×600, 1280×800, 1440×900 and 1920×1080 before and after.

The mockup's own proportions matter as much as any CSS. Careem's export is
roughly square; KFC's first export was 0.48 and rendered a header twice
everyone else's height. Pad the artboard to about 1:1 rather than fighting it
in the layout.

## Images

Drop the file in `public/images/case-studies/<slug>/` named as the slug the
section asks for. `screensFor` resolves it at build time by name, across any
image or video extension. A slug with no file renders as an empty frame rather
than breaking.

Two conventions that need no code:

- **`logo.<ext>`** — `CaseStudyHeader` finds it and swaps the text wordmark for
  the image.
- **transparent top corners** — the file is treated as a cut-out that carries
  its own device or card, so no frame, ring or rounding is added. For WebP this
  is computed by `scripts/cutouts.mjs` in `prebuild`.

Compress before committing. The raw exports run 3–5MB each; the KFC set went
from 33.2MB to 1.8MB with no visible loss. Trim transparent margins too — one
flow diagram was 2000px wide around a 1295px drawing, and a third of its column
was empty canvas.

## Sections

22 kinds. `references/sections.md` lists them all; the ones in constant use:

| kind | for |
|---|---|
| `prose` | copy, optionally under a numbered chapter heading |
| `passages` | headed passages; `layout: "grid"` puts them across the page |
| `columns` | headed columns; `boxed: true` draws them in the study's accent |
| `figure` | a drawing — framework, flow, board |
| `screens` | screenshots in a device frame |
| `feature` | copy beside screens, alternating down the page |
| `guide` | one heading, several headed parts, each with a picture |
| `takeaway` | one sentence set apart |

Fields that catch people out:

- **`figure` renders a `title` only alongside a `body`.** A title with just a
  `caption` renders no heading.
- **`minWidth` defaults to 1000 on a `figure`**, and a CSS grid track grows to
  its content's min-content width. A `layout: "beside"` figure in a narrow
  column pushed a phone 642px sideways. Set `minWidth: 0` when the figure
  shares a row.
- **`bleed`** runs a picture to the window's edge. Right for a board that is
  the subject; wrong for an export that is already a dark rectangle, which just
  becomes the page. Use the feature's `plate` instead, which stands it on a
  contained rectangle of the study's `panel`.
- **`accent`** themes links, markers, boxed columns and bled headings. Set it
  and most of the study follows.
- **`panel`** is the ground behind plated and bled pictures.
- **`quietLead`** keeps `lead` out of the page while it stays the metadata
  description.

## Checking the work

Render it. A build that succeeds says nothing about whether a figure overflowed
or an image is missing. For every study touched, at 1920 / 1440 / 768 / 390:

- `document.documentElement.scrollWidth - clientWidth` is 0;
- no image has `naturalWidth === 0`;
- no console errors (`va.vercel-scripts.com` 404s locally — that is Vercel
  Analytics, not the page).

Lazy-loaded images need forcing before any of that reads true: set
`img.loading = 'eager'`, scroll the document, then wait.
