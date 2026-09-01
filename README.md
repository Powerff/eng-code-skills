# eng-code-skills

[English](./README.md) · [中文](./README.zh-CN.md)

Agent skill pack for engineering workflows: style checks, safe refactors, tech-debt scans, code review, **frontend Hooks / component audits**, **backend API layer checks**, backend delivery workflows, plus **project-level frontend/backend refactor** skills (call-chain analysis → plan review → implement → CR → test loop).

Compatible with **mainstream coding LLMs** (GPT / Claude / Gemini / DeepSeek / Qwen / Kimi / Grok, …) and hosts such as [agentskills.io](https://agentskills.io), Cursor, Claude Code, ChatGPT, GitHub Copilot, Continue, Cline, Windsurf, and Trae. Each skill is a self-contained directory (`SKILL.md` + `skill.json` + `prompt.md` + bilingual `examples/`). See [COMPATIBILITY.md](./COMPATIBILITY.md).

**Version:** 0.2.4 · **License:** [MIT](./LICENSE) · **Node.js:** ≥ 18 · **Skills:** 29 · [Changelog](./CHANGELOG.md) · [Contributing](./CONTRIBUTING.md) · [Compatibility](./COMPATIBILITY.md) · [Graph+Loop 0-1](./GRAPH-LOOP-ENGINEERING.md)

---

## Quick navigation

- [General](#general) · [Backend analysis](#backend-analysis) · [Backend workflows](#backend-workflows) · [Greenfield Graph+Loop](#greenfield-graph--loop-engineering) · [Frontend](#frontend)
- [When to use which](#when-to-use-which) · [Design constraints](#design-constraints) · [Installation](#installation) · [Layout](#skill-package-layout) · [Validate](#validate-locally)
- [Compatibility](./COMPATIBILITY.md) ([中文](./COMPATIBILITY.zh-CN.md)) · [Examples](./examples/README.md) ([中文](./examples/README.zh-CN.md)) · [Multi-LLM](./examples/multi-llm.md)

| Jump | Skills |
| --- | --- |
| [General](#general) | [`code-style-check`](./skills/code-style-check/) · [`code-refactor`](./skills/code-refactor/) · [`tech-debt-scan`](./skills/tech-debt-scan/) · [`code-review`](./skills/code-review/) |
| [Backend analysis](#backend-analysis) | [`backend-code-style-check`](./skills/backend-code-style-check/) · [`backend-code-refactor`](./skills/backend-code-refactor/) · [`backend-tech-debt-scan`](./skills/backend-tech-debt-scan/) · [`backend-code-review`](./skills/backend-code-review/) · [`backend-api-layer-check`](./skills/backend-api-layer-check/) |
| [Backend workflows](#backend-workflows) | [`backend-code-standards`](./skills/backend-code-standards/) · … · [`backend-stack-upgrade`](./skills/backend-stack-upgrade/) |
| [Greenfield Graph+Loop](#greenfield-graph--loop-engineering) | [`graph-engineering-requirements`](./skills/graph-engineering-requirements/) · [`loop-engineering-slice`](./skills/loop-engineering-slice/) · [`greenfield-graph-loop`](./skills/greenfield-graph-loop/) · [`greenfield-graph-loop-commit`](./skills/greenfield-graph-loop-commit/) |
| [Frontend](#frontend) | [`frontend-code-style-check`](./skills/frontend-code-style-check/) · [`frontend-code-refactor`](./skills/frontend-code-refactor/) · [`frontend-tech-debt-scan`](./skills/frontend-tech-debt-scan/) · [`frontend-code-review`](./skills/frontend-code-review/) · [`frontend-hooks-check`](./skills/frontend-hooks-check/) · [`frontend-component-audit`](./skills/frontend-component-audit/) · [`frontend-project-refactor`](./skills/frontend-project-refactor/) |

---

## When to use which

| Goal | Start with | Optional deep-dive |
| --- | --- | --- |
| Quick smell check (any stack) | `code-style-check` | domain `*-code-style-check` |
| Safe structure-only refactor | `code-refactor` / `backend-code-refactor` / `frontend-code-refactor` | — |
| PR / merge review | `code-review` or domain review | `backend-api-layer-check` / `frontend-hooks-check` |
| Debt inventory & roadmap | `tech-debt-scan` (or domain) | project-refactor skills |
| Java/Spring coding standards | `backend-code-standards` | `backend-api-layer-check` |
| DTO/VO/Entity layering only | `backend-api-layer-check` | `backend-code-standards` |
| React/Vue Hooks correctness | `frontend-hooks-check` | `frontend-code-review` |
| Fat component split plan | `frontend-component-audit` | `frontend-code-refactor` |
| Evidence-based bug fix | `backend-bug-fix` | — |
| Full delivery loop (graphify → verify → commit) | `backend-implement-verify-commit` | `backend-code-standards` |
| Large service / frontend migration | `backend-project-refactor` / `frontend-project-refactor` | — |
| JDK / runtime / toolchain upgrade (plan → code → verify) | `backend-stack-upgrade` | plan-only: `codebase-agent-kit` `codebase-migration-plan` |
| **0-1 new project from PRD** | `greenfield-graph-loop-commit` | plan first: `graph-engineering-requirements`; one slice: `loop-engineering-slice` |

---

## Plan-only vs writes to your repo

Use this to pick the right skill (and the right kit).

### A) Report / plan first (default does **not** overwrite the tree)

These skills produce findings, plans, and example Diffs. They only apply structure-level edits when you **explicitly** ask to land changes — and still forbid silent business-logic changes.

| Kind | Skills |
| --- | --- |
| General | `code-style-check` · `code-refactor` · `tech-debt-scan` · `code-review` |
| Backend analysis | `backend-code-style-check` · `backend-code-refactor` · `backend-tech-debt-scan` · `backend-code-review` · `backend-api-layer-check` |
| Frontend analysis | `frontend-code-style-check` · `frontend-code-refactor` · `frontend-tech-debt-scan` · `frontend-code-review` · `frontend-hooks-check` · `frontend-component-audit` |
| Standards / optimize | `backend-code-standards` · `backend-code-optimize` |
| 0-1 graph orientation | `graph-engineering-requirements` |

**How to use (Cursor):**

```text
Load skill from github:Powerff/eng-code-skills/skills/backend-api-layer-check
Audit Controller/Service/DTO layering in src/main/java/... — report only, do not edit files.
```

**How to use (agentskills):**

```bash
npx agentskills load github:Powerff/eng-code-skills#skills/code-style-check
```

### B) Will change the working tree (workflows)

These skills are allowed to edit files / run commands as part of a phased loop. None of them should skip verification/cleanup rules in their prompt. Commit/push only when the skill says so (or you ask).

| Skill | Writes code? | Commit/push? |
| --- | --- | --- |
| `backend-bug-fix` | Yes (fix path) | No (unless you ask separately) |
| `backend-implement-verify` | Yes | No |
| `backend-implement-verify-restart` | Yes | No |
| `backend-implement-verify-commit` | Yes | Yes (commit + push) |
| `backend-code-commit` | Staging/commit only | Yes |
| `backend-project-refactor` | Yes (after plan review) | Per phase / your request |
| `frontend-project-refactor` | Yes (after plan review) | Per phase / your request |
| `backend-stack-upgrade` | Yes (toolchain + needed code) | No (pair with commit skill) |
| `loop-engineering-slice` | Yes (one slice Sx) | No |
| `greenfield-graph-loop` | Yes (multi-slice MVP) | No |
| `greenfield-graph-loop-commit` | Yes (multi-slice MVP) | Yes |

**How to use — feature loop without commit:**

```text
@backend-implement-verify
Implement X, verify with tests/curl, stop any servers you started. Do not commit.
```

**How to use — JDK 17→21 full landing:**

```bash
npx agentskills load github:Powerff/eng-code-skills#skills/backend-stack-upgrade
```

```text
@backend-stack-upgrade
Upgrade this backend JDK 17 → 21. Keep API contracts. Do not commit.
```

**0-1 from PRD (with commit):**

```text
@greenfield-graph-loop-commit
Requirements: docs/kit-prd-v1.0.md — Graph+Loop to MVP, then commit/push.
```

### C) Repo-wide plan only → use codebase-agent-kit

All **8** skills in [codebase-agent-kit](https://github.com/Powerff/codebase-agent-kit) are **plan-only** (architecture context, global refactor plan, debt audit, migration plan, module split, audits). They must **not** overwrite the repository. After you accept a plan, land it with eng-code-skills workflows above.

---

## Design constraints

**Analysis / safe-optimize skills** (style, refactor, debt, review, standards, optimize, hooks, component audit, API layer):

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

- Backend analysis: transactions, concurrency, resources, data safety, API layering
- Frontend: state stability, effects, Hooks, component boundaries, render performance
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

Focus: transactions, swallowed exceptions, N+1, concurrency, resource leaks, secrets, validation, DB risk, **API layering (DTO/VO/Entity)**.

| Skill | Description |
| --- | --- |
| [`backend-code-style-check`](./skills/backend-code-style-check/) | Backend style and risk checklist |
| [`backend-code-refactor`](./skills/backend-code-refactor/) | Backend structure-preserving refactoring |
| [`backend-tech-debt-scan`](./skills/backend-tech-debt-scan/) | Backend technical debt inventory |
| [`backend-code-review`](./skills/backend-code-review/) | Backend-oriented code review |
| [`backend-api-layer-check`](./skills/backend-api-layer-check/) | Controller/Service + DTO/VO/Entity boundary check |

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
| [`backend-stack-upgrade`](./skills/backend-stack-upgrade/) | stack / JDK upgrade | graphify → upgrade plan → toolchain/code → verify → stop (no commit) |

### Greenfield (Graph · Loop Engineering)

0-1 from a requirements doc. See [GRAPH-LOOP-ENGINEERING.md](./GRAPH-LOOP-ENGINEERING.md).

| Skill | Role |
| --- | --- |
| [`graph-engineering-requirements`](./skills/graph-engineering-requirements/) | **Graph Engineering** — PRD → query plan, module map, S0…Sn slices (plan-only) |
| [`loop-engineering-slice`](./skills/loop-engineering-slice/) | **Loop Engineering** — one slice: orient → implement → verify → graphify update → stop |
| [`greenfield-graph-loop`](./skills/greenfield-graph-loop/) | Orchestrator: G → multi L → MVP acceptance → stop (no commit) |
| [`greenfield-graph-loop-commit`](./skills/greenfield-graph-loop-commit/) | Same + commit/push |

### Frontend

Focus: fat components, state misuse, effect leaks, **Hooks**, props, redundant renders, style coupling; plus project-level migration.

| Skill | Description |
| --- | --- |
| [`frontend-code-style-check`](./skills/frontend-code-style-check/) | Frontend style and risk checklist |
| [`frontend-code-refactor`](./skills/frontend-code-refactor/) | Frontend structure-preserving refactoring |
| [`frontend-tech-debt-scan`](./skills/frontend-tech-debt-scan/) | Frontend technical debt inventory |
| [`frontend-code-review`](./skills/frontend-code-review/) | Frontend-oriented code review |
| [`frontend-hooks-check`](./skills/frontend-hooks-check/) | React/Vue Hooks & Composition API checklist |
| [`frontend-component-audit`](./skills/frontend-component-audit/) | Component responsibility / testability / a11y audit |
| [`frontend-project-refactor`](./skills/frontend-project-refactor/) | Interaction/data-chain analysis → plan review → migrate → CR → test loop |

---

## Installation

Skills are **model-agnostic**: paste `prompt.md` into any mainstream LLM, or load via a host below. Full matrix: [COMPATIBILITY.md](./COMPATIBILITY.md) · recipes: [examples/multi-llm.md](./examples/multi-llm.md).

### agentskills / Claude Code

```bash
# Single skill (examples)
npx agentskills load github:Powerff/eng-code-skills#skills/backend-implement-verify-commit
npx agentskills load github:Powerff/eng-code-skills#skills/backend-api-layer-check
npx agentskills load github:Powerff/eng-code-skills#skills/frontend-hooks-check

# Full suite
npx agentskills load github:Powerff/eng-code-skills

npx agentskills list
npx agentskills unload backend-code-standards
```

### Cursor

```text
Load skill from github:Powerff/eng-code-skills/skills/frontend-component-audit
Audit this page component and propose a split that keeps UX identical.
```

Or copy `skills/<name>/` into `.cursor/skills/`.

### ChatGPT · Gemini · Copilot · Continue · Cline · Windsurf · Trae

1. Open `skills/<name>/prompt.md` (include `reference.md` when present).
2. Paste into Project / Gem / custom instructions / agent mode prompt.
3. Provide the target code or diff and require **risk warnings** + **manual checks**.

### Universal manual prompt (any LLM)

```text
You must follow the skill prompt below exactly.
Target: <path or paste>
---
<paste skills/<name>/prompt.md>
---
```

Works with OpenAI GPT, Anthropic Claude, Google Gemini, DeepSeek, Qwen, Kimi, Grok, and other tool-using coding models.

### Manual / offline

1. Clone this repository.
2. Copy the desired `skills/<name>/` folder (include `reference.md` when present).
3. Place under `~/.claude/skills/`, `<project>/.cursor/skills/`, or your host’s skill/rules directory.
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
npm run validate:json
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) to add skills.

---

## Repository layout

```text
eng-code-skills/
├── README.md
├── README.zh-CN.md
├── COMPATIBILITY.md
├── COMPATIBILITY.zh-CN.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
├── package.json
├── scripts/validate-skills.mjs
├── skills/                 # 24 skills
├── examples/               # Composition + multi-LLM examples
└── .github/workflows/      # CI validation
```

---

## Disclaimer

AI-assisted guidance only. Outputs may be wrong. Require human review and tests before shipping. Authors accept no liability for production incidents.

## License

[MIT](./LICENSE)
