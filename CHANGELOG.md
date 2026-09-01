# Changelog

All notable changes to **eng-code-skills** are documented here.

## [0.2.4] — 2026-09-01

### Added
- Case study [greenfield-codebase-agent-kit](./examples/greenfield-codebase-agent-kit.md) — PRD `kit-prd-v1.0` → [codebase-agent-kit](https://github.com/Powerff/codebase-agent-kit) v0.1.0 walkthrough (Graph + Loop slices S0–S6).

## [0.2.3] — 2026-09-01

### Added
- **Graph Engineering · Loop Engineering** — four skills for 0-1 delivery from requirements:
  - `graph-engineering-requirements` — PRD → graphify plan, module map, MVP slices (plan-only)
  - `loop-engineering-slice` — single slice Graph→Implement→Verify→Update→Stop
  - `greenfield-graph-loop` — full 0-1 multi-slice MVP (no commit)
  - `greenfield-graph-loop-commit` — same + commit/push + stop
- [`docs/GRAPH-LOOP-ENGINEERING.md`](./GRAPH-LOOP-ENGINEERING.md) · [中文](./GRAPH-LOOP-ENGINEERING.zh-CN.md)

## [0.2.2] — 2026-08-27

### Added
- **`backend-stack-upgrade`** — Full backend stack/runtime upgrade loop: graphify → upgrade plan → code/toolchain changes → verify → stop services (no auto commit). Primary example: JDK 17 → 21. Complements plan-only `codebase-agent-kit/codebase-migration-plan`.

## [0.2.1] — 2026-08-27

### Added
- **Mainstream LLM / host compatibility** — every `skill.json` now declares shared `compatibility`, `modelFamilies`, and `runtimeNotes` (GPT / Claude / Gemini / DeepSeek / Qwen / Kimi / Grok + Cursor / ChatGPT / Copilot / Continue / Cline / Roo / Windsurf / Trae / manual-prompt).
- [`COMPATIBILITY.md`](./COMPATIBILITY.md) · [`COMPATIBILITY.zh-CN.md`](./COMPATIBILITY.zh-CN.md) — host + model matrix and universal load recipe.
- [`examples/multi-llm.md`](./examples/multi-llm.md) · [`examples/multi-llm.zh-CN.md`](./examples/multi-llm.zh-CN.md) — per-host paste/load recipes.
- Validator checks for required hosts and model families (`npm run validate`).

### Improved
- README installation covers ChatGPT / Gemini / Copilot / Continue / Cline and a universal manual-prompt path for any coding LLM.

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
