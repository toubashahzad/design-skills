# Every section kind

From `src/lib/case-studies/types.ts`, which is the spec — this is an index to
it, not a replacement. Each entry there carries a comment explaining why the
section exists, which is usually what decides whether it is the right one.

## Writing

| kind | what it is |
|---|---|
| `prose` | Free copy, optionally under its own heading. Takes `eyebrow`, `title`, `stage`, `sub`, `lead`. |
| `passages` | Several headed passages as parts of one thought. `layout: "grid"` sets them across the page, taking their column count from how many there are, up to three. |
| `takeaway` | One sentence set apart — the line a chapter exists to arrive at. |
| `meta` | Label/value rows: industry, product, timeline. |
| `columns` | Two or more headed columns. `boxed: true` draws each in the study's accent, two across. |
| `impact` | A headline outcome, with optional cards under it. `panel`, `stats`, `tint`. |

## Pictures

| kind | what it is |
|---|---|
| `figure` | A drawn figure across the page — framework, flow, map. `src`, `alt`, `caption`, `note`, `title`, `body`, `side`, `layout` (`beside`/`above`/`panel`), `plate`, `bleed`, `rounded`, `tight`, `sub`, `maxWidth`, `minWidth`. |
| `screens` | Screenshots in the rows the design groups them into. `title`, `caption`, `rows`, `device`, `panel`. |
| `feature` | Copy beside screens, alternating down the page. `side`, `body`, `passages`, `impact`, `device`, `chrome`, `bleed`, `plate`, `overhang`, `wideIntro`. |
| `guide` | One heading, several headed parts, each with a picture. `columns`, `caps`, `stroke`, `pictureFirst`; parts take `srcs`, `plate` (`true`/`"dark"`/`"light"`), `cols`. |
| `compare` | A screen as it was beside what it became, a row per screen. |
| `pair` | The versions under test side by side, a column each. |
| `flowGrid` | A flow read as a flow: the screens in order, two to a row. |
| `carousel` | Writing above a rail of documents read one at a time. |
| `deck` | Writing on one side, a stack of research boards on the other. |
| `mapDeck` | Writing on one side, a fanned stack of exported maps on the other. |

## Drawn from data, not exported

These build themselves from values rather than taking an image, so they stay
sharp and themeable.

| kind | what it is |
|---|---|
| `flow` | A workflow diagram drawn from data. |
| `swatches` | A palette drawn from its own values. |
| `tokens` | A table of design tokens or type styles, as real table markup. |
| `pipeline` | A left-to-right pipeline of numbered steps. |
| `process` | The stages of a design process as a row of cards. |
| `session` | One usability session as data: what was asked, what each person said. |

## Notes

- A `figure` renders its `title` only when it also has a `body`.
- `figure.minWidth` defaults to 1000. In a shared row that blows the grid out —
  set `minWidth: 0`.
- `guide` parts in a row grow to the tallest of them and centre their picture,
  so two diagrams of different shapes read as a pair.
- `feature.bleed` runs the picture to the window's edge and sets its heading in
  the accent; `feature.plate` keeps it contained on a rectangle of `panel`.
