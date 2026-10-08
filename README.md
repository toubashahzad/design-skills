# design-skills

Claude Code skills for design-engineering work — the habits of someone who
designs a thing and then ships its front end.

| skill | what it does |
|---|---|
| [`list-it`](.agents/skills/list-it/SKILL.md) | Collect a numbered list of changes without executing any of them, until you say go. For dictating changes faster than you want them done. |
| [`mock-it`](.agents/skills/mock-it/SKILL.md) | Render 2–4 labelled design variants inline in the chat, in the project's real tokens, then ask which direction to take. |
| [`explore`](.agents/skills/explore/SKILL.md) | An idea lane that runs alongside a `/list-it` list. Produces options and trade-offs; nothing is built or listed until you say so. |

One more, kept here as a worked example rather than as something to install:

| skill | what it does |
|---|---|
| [`case-study`](.agents/skills/case-study/SKILL.md) | Everything the portfolio's case-study pages need: the section model, the header's caps against the window, the image conventions, and a script that reports what a study is made of and which of its pictures are missing. |

It is written against one codebase and only works there — its script imports
that repository's TypeScript by path. It is in this repository because it shows
what the project-specific kind of skill looks like, which is the kind most
worth writing and the hardest to picture from a generic example.

Each is invoked two ways: automatically, when what you are doing matches the
skill's `description`, or by hand as `/list-it`, `/mock-it`, `/explore`.

## Installing them in a repo

Copy the skills in and symlink them:

```bash
mkdir -p .agents/skills .claude/skills
for s in list-it mock-it explore; do
  cp -r /path/to/design-skills/.agents/skills/$s .agents/skills/$s
  ln -sfn ../../.agents/skills/$s .claude/skills/$s
done
```

Or add this repository as a submodule, if you would rather fix a skill once
than fix it everywhere.

## Why two directories

The files live in `.agents/skills/`; `.claude/skills/` holds symlinks to them.
`.agents/` is the vendor-neutral location — the same split as `AGENTS.md` and
`CLAUDE.md` — so another agent's config directory can point at the same copy
rather than taking one that drifts. Git stores the symlinks as symlinks, so
there is only ever one of each file.

## Writing another one

A skill is a folder with a `SKILL.md`: YAML frontmatter carrying `name` and
`description`, then Markdown instructions. Larger ones can keep `scripts/`,
`references/` and `assets/` beside the Markdown and point at them.

The `description` is the whole trigger. It is the only part loaded until the
skill fires, so it should say *when to use this* in the words you would
actually type — not summarise what the skill contains. A vague one means the
skill never opens.
