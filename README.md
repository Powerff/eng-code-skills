# eng-code-skills

[English](./README.md) · [中文](./README.zh-CN.md)

Agent skill pack for engineering workflows: style checks, safe refactors, tech-debt scans, code review, backend delivery workflows, plus **project-level frontend/backend refactor** skills (call-chain analysis → plan review → implement → CR → test loop).

Compatible with [agentskills.io](https://agentskills.io), Cursor, and Claude Code. Each skill is a self-contained directory (`SKILL.md` + `skill.json` + `prompt.md` + bilingual `examples/`).

**Version:** 0.1.0 · **License:** [MIT](./LICENSE) · **Node.js:** ≥ 18 · **Skills:** 21

---

## Quick navigation

- [General](#general) · [Backend analysis](#backend-analysis) · [Backend workflows](#backend-workflows) · [Frontend](#frontend)
- [Design constraints](#design-constraints) · [Installation](#installation) · [Layout](#skill-package-layout) · [Validate](#validate-locally)
- [Examples](./examples/README.md) ([中文](./examples/README.zh-CN.md))

| Jump | Skills |
| --- | --- |
| [General](#general) | [`code-style-check`](./skills/code-style-check/) · [`code-refactor`](./skills/code-refactor/) · [`tech-debt-scan`](./skills/tech-debt-scan/) · [`code-review`](./skills/code-review/) |
| [Backend analysis](#backend-analysis) | [`backend-code-style-check`](./skills/backend-code-style-check/) · [`backend-code-refactor`](./skills/backend-code-refactor/) · [`backend-tech-debt-scan`](./skills/backend-tech-debt-scan/) · [`backend-code-review`](./skills/backend-code-review/) |
| [Backend workflows](#backend-workflows) | [`backend-code-standards`](./skills/backend-code-standards/) · [`backend-code-optimize`](./skills/backend-code-optimize/) · [`backend-bug-fix`](./skills/backend-bug-fix/) · [`backend-code-commit`](./skills/backend-code-commit/) · [`backend-implement-verify`](./skills/backend-implement-verify/) · [`backend-implement-verify-commit`](./skills/backend-implement-verify-commit/) · [`backend-implement-verify-restart`](./skills/backend-implement-verify-restart/) · [`backend-project-refactor`](./skills/backend-project-refactor/) |
| [Frontend](#frontend) | [`frontend-code-style-check`](./skills/frontend-code-style-check/) · [`frontend-code-refactor`](./skills/frontend-code-refactor/) · [`frontend-tech-debt-scan`](./skills/frontend-tech-debt-scan/) · [`frontend-code-review`](./skills/frontend-code-review/) · [`frontend-project-refactor`](./skills/frontend-project-refactor/) |

---

## Design constraints

**Analysis / safe-optimize skills** (style, refactor, debt, review, standards, optimize):

1. Do not change business logic unless the skill explicitly allows a verified bug fix path.
2. Business bugs are flagged as risks by default; auto-fix only when the skill’s workflow says so (e.g. bug-fix).
3. Every response includes **risk warnings** and a **manual verification checklist**.

**Backend workflow skills** (bug-fix, implement/verify, commit):

1. Follow the skill’s phase order; do not skip verification or cleanup steps.
2. Prefer minimal diffs and project-local conventions.
3. Still emit **risk warnings** and **manual checks** at the end.

**Project refactor skills** (`backend-project-refactor`, `frontend-project-refactor`):

1. Refactor ≠ 1:1 rewrite — analyze call/interaction chains before coding.
2. Five phases with human plan review; harness cost caps (read/fix/test loops).
3. Record decisions in `clarifications.md`; every phase emits risks + manual checks.

Domain focus:

- Backend analysis: transactions, concurrency, resources, data safety
- Frontend: state stability, effects, render performance
- Backend workflows: Java/Spring standards, evidence-based fixes, graphify-oriented delivery loops
- Project refactor: ownership maps, GAP tables, phased migration + test loops

---

## Skills

### General

| Skill | Description |
| --- | --- |
| [`code-style-check`](./skills/code-style-check/) | Language-agnostic style and smell detection |
| [`code-refactor`](./skills/code-refactor/) | Structure-preserving refactoring |
| [`tech-debt-scan`](./skills/tech-debt-scan/) | Project-level technical debt inventory |
| [`code-review`](./skills/code-review/) | General-purpose code review |

### Backend analysis

Focus: transactions, swallowed exceptions, N+1, concurrency, resource leaks, secrets, validation, DB risk.

| Skill | Description |
| --- | --- |
| [`backend-code-style-check`](./skills/backend-code-style-check/) | Backend style and risk checklist |
| [`backend-code-refactor`](./skills/backend-code-refactor/) | Backend structure-preserving refactoring |
| [`backend-tech-debt-scan`](./skills/backend-tech-debt-scan/) | Backend technical debt inventory |
| [`backend-code-review`](./skills/backend-code-review/) | Backend-oriented code review |

### Backend workflows

Packaged from Cursor technical skills used in day-to-day backend delivery. Cross-skill mentions inside prompts use the `backend-*` names in this repo.

| Skill | Source (Cursor) | Description |
| --- | --- | --- |
| [`backend-code-standards`](./skills/backend-code-standards/) | `code-standards` | Java/Spring coding standards (DTO/VO, enums, Service split, OpenAPI) |
| [`backend-code-optimize`](./skills/backend-code-optimize/) | `code-optimize` | Expert review → behavior-preserving optimize → verify |
| [`backend-bug-fix`](./skills/backend-bug-fix/) | `bug-fix` | Locate root cause with evidence, then fix and verify |
| [`backend-code-commit`](./skills/backend-code-commit/) | `code-commit` | Detailed commit messages, safe stage/commit/push |
| [`backend-implement-verify`](./skills/backend-implement-verify/) | `implement-verify` | graphify → implement → verify → stop services (no commit) |
| [`backend-implement-verify-commit`](./skills/backend-implement-verify-commit/) | `implement-verify-commit` | Full loop including commit/push, then stop services |
| [`backend-implement-verify-restart`](./skills/backend-implement-verify-restart/) | `implement-verify-restart` | Verify → stop session services → restart for the user (no commit) |
| [`backend-project-refactor`](./skills/backend-project-refactor/) | service-refactor methodology | Call-chain analysis → plan review → layered code → CR → test loop |

### Frontend

Focus: fat components, state misuse, effect leaks, Hooks, props, redundant renders, style coupling; plus project-level migration.

| Skill | Description |
| --- | --- |
| [`frontend-code-style-check`](./skills/frontend-code-style-check/) | Frontend style and risk checklist |
| [`frontend-code-refactor`](./skills/frontend-code-refactor/) | Frontend structure-preserving refactoring |
| [`frontend-tech-debt-scan`](./skills/frontend-tech-debt-scan/) | Frontend technical debt inventory |
| [`frontend-code-review`](./skills/frontend-code-review/) | Frontend-oriented code review |
| [`frontend-project-refactor`](./skills/frontend-project-refactor/) | Interaction/data-chain analysis → plan review → migrate → CR → test loop |

---

## Installation

### agentskills / Claude Code

```bash
# Single skill (examples)
npx agentskills load github:Powerff/eng-code-skills#skills/backend-implement-verify-commit
npx agentskills load github:Powerff/eng-code-skills#skills/backend-code-standards
npx agentskills load github:Powerff/eng-code-skills#skills/frontend-code-refactor

# Full suite
npx agentskills load github:Powerff/eng-code-skills

npx agentskills list
npx agentskills unload backend-code-standards
```

### Cursor

```text
Load skill from github:Powerff/eng-code-skills/skills/backend-bug-fix
Reproduce the API failure, locate root cause, then fix with verification.
```

Or copy `skills/<name>/` into `.cursor/skills/`.

### Manual / offline

1. Clone this repository.
2. Copy the desired `skills/<name>/` folder (include `reference.md` when present).
3. Place under `~/.claude/skills/` or `<project>/.cursor/skills/`.

---

## Skill package layout

```text
skills/<skill-name>/
├── SKILL.md           # Runtime entry
├── skill.json         # Metadata + I/O schema
├── prompt.md          # Standalone prompt body
├── reference.md       # Optional deep reference (standards / optimize)
└── examples/
    ├── basic.md       # English
    └── basic.zh-CN.md # Chinese
```

### Validate locally

```bash
npm run validate
npm run list-skills
```

---

## Repository layout

```text
eng-code-skills/
├── README.md
├── README.zh-CN.md
├── LICENSE
├── package.json
├── scripts/validate-skills.mjs
├── skills/                 # 21 skills
├── examples/               # Composition examples (EN + zh-CN)
└── .github/workflows/      # CI validation
```

---

## Disclaimer

AI-assisted guidance only. Outputs may be wrong. Require human review and tests before shipping. Authors accept no liability for production incidents.

## License

[MIT](./LICENSE)
