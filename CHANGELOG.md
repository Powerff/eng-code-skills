# Changelog

All notable changes to **eng-code-skills** are documented here.

## [0.2.0] — 2026-08-27

### Added
- **`frontend-hooks-check`** — React Hooks / Vue Composition API deep checklist (Rules of Hooks, deps, cleanup, custom hooks).
- **`frontend-component-audit`** — Component responsibility, state ownership, props, testability, reuse, a11y audit.
- **`backend-api-layer-check`** — Controller/Service boundary, DTO/VO/Entity isolation, no Map passthrough / Entity leak.
- **`CONTRIBUTING.md`** — How to add or update a skill (layout, validation, bilingual examples).
- Composition recipes for the new skills in `examples/`.
- Validator flags: `--json`, `--strict`; category summary; stronger `skill.json` schema checks.

### Improved
- Deepened analysis prompts with P0/P1/P2 tables: style-check, refactor, tech-debt-scan, code-review (general + backend + frontend).
- README skill catalog, when-to-use matrix, and navigation for 24 skills.

## [0.1.0] — 2026-08-27

### Added
- Initial suite: general / backend analysis / backend workflows / frontend skills.
- Bilingual README and per-skill examples.
- `npm run validate` + GitHub Actions workflow.
- Project-level refactor skills (`backend-project-refactor`, `frontend-project-refactor`).
