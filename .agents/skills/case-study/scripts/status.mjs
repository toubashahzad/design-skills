/**
 * What a case study is currently made of, and which of its pictures are
 * missing.
 *
 * Node reads the study's TypeScript directly — the file is data and its only
 * import is a type — so this reports the real object rather than a guess made
 * by reading the source as text. That matters for a study whose sections are
 * built in a loop: KFC's seven walkthrough features come out of an array, and
 * no regex over the file would find the slugs they resolve to.
 *
 *   node --experimental-strip-types .agents/skills/case-study/scripts/status.mjs <slug>
 */
import fs from "node:fs";
import { registerHooks } from "node:module";
import path from "node:path";

/*
 * TypeScript writes `./anouschka-boards`; Node's resolver wants the extension.
 * One study splits its data across a second file, and without this the import
 * of that study — and only that study — fails.
 */
registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (error) {
      if (specifier.startsWith(".") && !path.extname(specifier)) {
        return nextResolve(`${specifier}.ts`, context);
      }
      throw error;
    }
  },
});

const slug = process.argv[2];
if (!slug) {
  console.error("usage: status.mjs <slug>");
  process.exit(1);
}

const root = process.cwd();
const file = path.join(root, "src/lib/case-studies", `${slug}.ts`);
if (!fs.existsSync(file)) {
  console.error(`no study at src/lib/case-studies/${slug}.ts`);
  const known = fs
    .readdirSync(path.join(root, "src/lib/case-studies"))
    .filter((f) => f.endsWith(".ts") && !["index.ts", "types.ts"].includes(f))
    .map((f) => f.replace(/\.ts$/, ""));
  console.error(`studies: ${known.join(", ")}`);
  process.exit(1);
}

const mod = await import(file);
const study = Object.values(mod).find(
  (v) => v && typeof v === "object" && "slug" in v,
);
if (!study) {
  console.error(`${file} exports no CaseStudy`);
  process.exit(1);
}

/*
 * Every media slug the study asks for, wherever it is nested.
 *
 * Two keys are overloaded and need the enclosing section to disambiguate.
 * `rows` is screen slugs on a `screens` section and plain text on a table —
 * Anouschka's competitor matrix is rows of sentences. `before` and `after`
 * are slugs inside a `compare` section's rows and the two column headings on
 * the section itself: "Old design", "New design".
 */
const wanted = new Set();
const SINGLE = new Set(["src", "art", "poster", "screen", "banner"]);
const LIST = new Set([
  "srcs",
  "screens",
  "stills",
  "boards",
  "maps",
  "pages",
  "images",
]);

const walk = (node, key, kind, inRows) => {
  if (node == null) return;

  if (typeof node === "string") {
    const slug =
      SINGLE.has(key) ||
      (kind === "compare" && inRows && (key === "before" || key === "after"));
    if (slug) wanted.add(node);
    return;
  }

  if (Array.isArray(node)) {
    const media = LIST.has(key) || (key === "rows" && kind === "screens");
    const rows = inRows || key === "rows";
    for (const item of node) {
      if (typeof item === "string") {
        if (media) wanted.add(item);
      } else {
        walk(item, key, kind, rows);
      }
    }
    return;
  }

  if (typeof node === "object") {
    const here = typeof node.kind === "string" ? node.kind : kind;
    for (const [k, v] of Object.entries(node)) walk(v, k, here, inRows);
  }
};
walk(study, "", undefined, false);

const MEDIA = /\.(png|jpe?g|webp|avif|svg|mp4|webm)$/i;
const dir = path.join(root, "public/images/case-studies", slug);
const files = (fs.existsSync(dir) ? fs.readdirSync(dir) : []).filter((f) =>
  MEDIA.test(f),
);
const have = new Set(
  /* A video's poster is not a slug of its own — see case-study-media.ts. */
  files.map((f) => f.replace(MEDIA, "")).filter((f) => !f.endsWith("-poster")),
);

/*
 * Slugs no section names, because a component looks them up by name: the
 * wordmark on any study, and the three the stage is built from. They are
 * never missing — absent, the component simply draws what it has — but they
 * are not spare either.
 */
const BY_CONVENTION = new Set([
  "logo",
  "award",
  "stage-still",
  "stage-video",
  "stage-shell",
]);

const missing = [...wanted].filter((s) => !have.has(s)).sort();
const spare = [...have]
  .filter((s) => !wanted.has(s) && !BY_CONVENTION.has(s))
  .sort();

const kinds = study.sections.map((s) => s.kind);
const tally = [...new Set(kinds)]
  .map((k) => `${k}×${kinds.filter((x) => x === k).length}`)
  .join("  ");

const header = study.stage
  ? "stage"
  : study.headerArt
    ? `art panel (${study.headerArt.art})`
    : study.headerGlow
      ? "glow"
      : "plain";

console.log(`${study.brand}  —  /work/${study.slug}`);
console.log(`  ${study.draft ? "DRAFT — not built on production" : "live"}`);
console.log(
  `  header     ${header}${have.has("logo") ? " + logo" : " (text wordmark)"}`,
);
console.log(
  `  theme      ${study.theme ?? "dark"}   accent ${study.accent ?? "site violet"}   panel ${study.panel ?? "site default"}`,
);
console.log(
  `  lead       ${study.quietLead ? "metadata only" : "on the page"}`,
);
console.log(`  chapters   ${study.story ? study.story.length : 0}`);
console.log(`  sections   ${study.sections.length}  —  ${tally}`);
console.log(
  `  pictures   ${wanted.size} asked for, ${files.length} files in the folder`,
);

if (missing.length) {
  console.log(`\n  MISSING — these render as an empty frame:`);
  for (const m of missing) console.log(`    ${m}`);
}
if (spare.length) {
  console.log(`\n  in the folder but unused:`);
  for (const s of spare) console.log(`    ${s}`);
}
if (!missing.length && !spare.length)
  console.log(`\n  every picture accounted for.`);
