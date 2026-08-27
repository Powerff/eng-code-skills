# eng-code-skills

[English](./README.md) · [中文](./README.zh-CN.md)

Agent skills for code style checks, safe refactoring, technical debt scanning, and code review.

Designed for [agentskills.io](https://agentskills.io)-compatible runtimes, including Cursor and Claude Code. Skills are packaged independently so you can install a single skill or the full set. The suite is organized into **general**, **backend**, and **frontend** domains.

**Version:** 0.1.0 · **License:** [MIT](./LICENSE) · **Node.js:** ≥ 18

---

## Design constraints

All skills share the same operating rules:

1. Do not change business logic. Allowed changes are limited to structure, naming, conventions, duplication, and code smells.
2. Business bugs and logic errors are reported as risks only; they are not auto-fixed.
3. Every response must include risk warnings and a manual verification checklist.
4. Backend skills prioritize data safety, transactions, concurrency, and resource lifecycle.
5. Frontend skills prioritize state stability, controlled side effects, and render performance.

### Response format

1. Execution summary  
2. Diff (or “no code changes” for scan/review-only runs)  
3. Complete updated code (when applicable)  
4. Risk warnings (required)  
5. Manual verification checklist (required)

---

## Skills

### General

| Skill | Description |
| --- | --- |
| `code-style-check` | Language-agnostic style and smell detection |
| `code-refactor` | Structure-preserving refactoring |
| `tech-debt-scan` | Project-level technical debt inventory |
| `code-review` | General-purpose code review |

### Backend (Java / Go / Python and similar)

Focus areas: transactions, swallowed exceptions, N+1 queries, concurrency, resource leaks, hardcoded secrets, input validation, and database risk.

| Skill | Description |
| --- | --- |
| `backend-code-style-check` | Backend style and risk checklist |
| `backend-code-refactor` | Backend structure-preserving refactoring |
| `backend-tech-debt-scan` | Backend technical debt inventory |
| `backend-code-review` | Backend-oriented code review |

### Frontend (JavaScript / TypeScript / React / Vue)

Focus areas: oversized components, state misuse, effect leaks, memory leaks, props validation, redundant renders, style coupling, and Hooks conventions.

| Skill | Description |
| --- | --- |
| `frontend-code-style-check` | Frontend style and risk checklist |
| `frontend-code-refactor` | Frontend structure-preserving refactoring |
| `frontend-tech-debt-scan` | Frontend technical debt inventory |
| `frontend-code-review` | Frontend-oriented code review |

---

## Installation

### agentskills / Claude Code

```bash
# Single skill
npx agentskills load github:Powerff/eng-code-skills#skills/backend-code-refactor
npx agentskills load github:Powerff/eng-code-skills#skills/frontend-code-refactor
npx agentskills load github:Powerff/eng-code-skills#skills/code-review

# Full suite
npx agentskills load github:Powerff/eng-code-skills

# List / remove
npx agentskills list
npx agentskills unload backend-code-refactor
```

### Cursor

Load a skill remotely in chat:

```text
Load skill from github:Powerff/eng-code-skills/skills/backend-code-refactor
Refactor this code, keep all business logic unchanged.
```

Or copy `skills/<name>/` into the project’s `.cursor/skills/` directory.

### Manual / offline

1. Clone the repository.
2. Copy the desired `skills/<name>/` directory.
3. Place it under:
   - Claude Code: `~/.claude/skills/`
   - Cursor: `<project>/.cursor/skills/`

---

## Skill package layout

Each skill is self-contained and has no cross-skill dependencies:

```text
skills/<skill-name>/
├── SKILL.md      # Runtime entry (agentskills.io / Cursor / Claude Code)
├── skill.json    # Metadata and input/output schema
├── prompt.md     # Standalone prompt
└── examples/     # Skill-local examples
```

Validate locally:

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
├── skills/
├── examples/
└── .github/workflows/
```

Additional usage notes: [`examples/`](./examples/). Per-skill samples live under each skill’s `examples/` directory.

---

## Disclaimer

This project provides AI-assisted engineering guidance. Outputs may contain model errors or hallucinations. Treat all suggestions as advisory. Require human review and automated tests before shipping changes. The authors accept no liability for production incidents resulting from use of these skills.

## License

[MIT](./LICENSE)
