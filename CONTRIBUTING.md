# Contributing

Thanks for improving **eng-code-skills**. Every skill must stay **self-contained** so users can install a single folder.

## Principles

1. **No cross-skill file dependency** — `prompt.md` must not `../` into sibling skills. Mentioning another skill **by name** as an optional follow-up is OK.
2. **Logic-safe by default** for analysis / safe-optimize skills — include 严禁修改业务逻辑 (or equivalent) plus **风险警告** and **人工校验**.
3. **Bilingual examples** — every skill ships `examples/basic.md` + `examples/basic.zh-CN.md`.
4. **Minimal diffs** — match existing tone and output section order.
5. **Model-agnostic** — keep `prompt.md` runnable by pasting into any mainstream LLM; declare shared `compatibility` + `modelFamilies` + `runtimeNotes` in `skill.json` (see [COMPATIBILITY.md](./COMPATIBILITY.md)).

## Add a new skill

```bash
mkdir -p skills/<skill-name>/examples
```

Required files:

```text
skills/<skill-name>/
├── SKILL.md           # YAML frontmatter + same body as prompt.md
├── skill.json         # name, description, version, category, I/O schema, compatibility, modelFamilies
├── prompt.md          # standalone prompt
└── examples/
    ├── basic.md
    └── basic.zh-CN.md
```

Checklist:

1. `skill.json` `name` equals folder name.
2. `SKILL.md` frontmatter `name:` matches.
3. `outputSchema` includes at least `summary`, `riskWarnings`, `manualChecks` (plus `diff` when the skill produces code).
4. `compatibility` / `modelFamilies` include the required shared lists (copy from any existing skill).
5. Register the folder in `scripts/validate-skills.mjs` → `EXPECTED` (and `LOGIC_SAFE` if applicable).
6. Link it from `README.md` + `README.zh-CN.md`.
7. Add a short entry to `CHANGELOG.md` and a composition note under `examples/` when useful.

```bash
npm run validate
npm run list-skills
npm run validate -- --json
```

## Enrich an existing skill

- Prefer deepening **checklists / phases / risk guidance** over rewriting the output contract.
- Keep `SKILL.md` body in sync with `prompt.md` (frontmatter stays on `SKILL.md` only).
- Do not remove mandatory snippets required by the validator.

## Pull requests

- Run `npm run validate` locally (CI runs the same).
- Describe *why* the skill helps (scenario), not only file names.
- Do not commit secrets, `.env`, or local `graphify-out/`.
