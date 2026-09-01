# Case study: codebase-agent-kit (PRD → 0-1 code)

[中文](./greenfield-codebase-agent-kit.zh-CN.md) · English

End-to-end example of **Graph Engineering + Loop Engineering** using a real PRD and the shipped repo [Powerff/codebase-agent-kit](https://github.com/Powerff/codebase-agent-kit).

**PRD source:** `docs/kit-prd-v1.0.md` (in your monorepo)  
**Skills used:** `graph-engineering-requirements` → `greenfield-graph-loop-commit`  
**Delivered:** v0.1.0 — 8 plan-only skills, validator, bilingual README, CI

---

## 1. PRD → P0 scope

| PRD section | P0 for v0.1.0 |
| --- | --- |
| §3.2 directory layout | `skills/` × 8, `scripts/validate-skills.mjs`, `examples/`, `docs/` |
| §4 all skills | 8 self-contained skill folders (SKILL.md + prompt.md + skill.json + examples) |
| §5 global rules | Same phrases in every `prompt.md` / `SKILL.md` |
| §6 install docs | README EN/ZH, usage docs |
| §1.5 non-goals | No web app, no CLI product, no auto file overwrite in skills |

**Out of scope (v0.1.0):** v0.2 DB schema skill, v0.3 multi-project context.

---

## 2. Phase G — Graph Engineering (slice plan)

| Slice | Scope | Done when |
| --- | --- | --- |
| **S0** | Repo skeleton | `package.json`, `LICENSE`, `validate-skills.mjs` EXPECTED list, `npm run validate` passes (0 skills OK or scaffold) |
| **S1** | First skill end-to-end | `codebase-context-builder/` complete + in EXPECTED + validate OK |
| **S2** | General skills batch | `codebase-global-refactor`, `codebase-tech-debt-audit`, `codebase-migration-plan` |
| **S3** | Backend skills | `backend-codebase-audit`, `backend-module-split` |
| **S4** | Frontend skills | `frontend-codebase-audit`, `frontend-module-split` |
| **S5** | Docs & CI | README EN/ZH, `docs/usage-*.md`, `.github/workflows/validate-skills.yml` |
| **S6** | MVP acceptance | All 8 skills validate; README matches PRD skill table |

After **S0**: `graphify update .` — required before S1+ orientation on real files.

---

## 3. Copy-paste Cursor session

### Step 0 — Optional plan-only

```text
Load skill from github:Powerff/eng-code-skills/skills/graph-engineering-requirements

PRD: docs/kit-prd-v1.0.md
Project: codebase-agent-kit — codebase-level plan-only agent skills.
Stack: Node 18, agentskills.io layout. Output slice table S0–S6 only.
```

### Step 1 — Full 0-1 with commit

```text
Load skill from github:Powerff/eng-code-skills/skills/greenfield-graph-loop-commit

Requirements: docs/kit-prd-v1.0.md
Target directory: ./codebase-agent-kit (new repo)
MVP: v0.1.0 per PRD — 8 skills, all plan-only, validate script, bilingual README.
Follow slice plan S0→S6. After each slice run npm run validate.
Commit and push when MVP passes.
```

### Step 2 — One slice only (resume)

```text
@loop-engineering-slice
Slice S3: implement backend-codebase-audit + backend-module-split per PRD §4.2.
Done: both folders in validate EXPECTED, npm run validate passes.
```

---

## 4. Phase L — What each slice produced

| Slice | Key files created |
| --- | --- |
| S0 | `package.json`, `LICENSE`, `scripts/validate-skills.mjs`, `.gitignore` |
| S1 | `skills/codebase-context-builder/{SKILL.md,prompt.md,skill.json,examples/}` |
| S2 | `skills/codebase-global-refactor/`, `codebase-tech-debt-audit/`, `codebase-migration-plan/` |
| S3 | `skills/backend-codebase-audit/`, `backend-module-split/` |
| S4 | `skills/frontend-codebase-audit/`, `frontend-module-split/` |
| S5 | `README.md`, `README.zh-CN.md`, `docs/usage-cursor.md`, `.github/workflows/` |
| S6 | PRD skill table ↔ `npm run list-skills` match (8 skills) |

**Skill template (every folder):**

```text
skills/<name>/
├── SKILL.md          # YAML frontmatter + rules
├── prompt.md         # standalone prompt (no ../ refs)
├── skill.json        # name, compatibility, input/output schema
└── examples/
    ├── basic.md
    └── basic.zh-CN.md
```

**Mandatory prompt snippets (PRD §5):** 全局优先 · 严禁修改业务逻辑 · 风险警告 · 人工校验 · 只出方案不执行

---

## 5. Phase A — MVP verification

```bash
cd codebase-agent-kit
npm run validate          # All 8 skills OK
npm run list-skills       # 8 names match PRD §3.2
graphify update .
graphify query "codebase-context-builder"
```

| Check | Expected |
| --- | --- |
| Skill count | 8 |
| `kind` / behavior | plan-only — prompts say 禁止覆盖仓库 |
| Cross-skill deps | None — no `../` in prompt.md |
| README | EN + ZH, install via agentskills + Cursor |

---

## 6. After MVP — dual-kit workflow (PRD §11)

```text
1. codebase-agent-kit  → global plan (migration, debt, audit)
2. eng-code-skills     → per-file implement + verify (e.g. backend-implement-verify-commit)
3. codebase-agent-kit  → global re-check
```

Example:

```text
Load skill from github:Powerff/codebase-agent-kit/skills/codebase-migration-plan
Spring Boot 2→3 for this repo — plan only.

Then:
@backend-stack-upgrade
Execute approved plan steps — do not commit until I say so.
```

---

## 7. Lessons (for your next PRD)

1. **Graph first** — slice table prevents “implement all 8 skills in one messy diff”.
2. **S0 before graphify** — empty repo has no graph; first `graphify update` after skeleton.
3. **Validator as CI gate** — `EXPECTED` array is the single source of truth for skill count.
4. **Plan-only vs code** — this PRD builds *meta-skills* (prompts only); app code PRDs use the same slices but S1+ writes business logic.

---

## Risk warnings

- LLM may skip validation between slices — enforce `npm run validate` in each loop.
- Skill prompts must stay self-contained; copying from eng-code-skills still needs path rewrites.
- Do not mix plan-only skills with auto-write workflows without explicit user consent.

## Manual checks

- [ ] Every skill has bilingual examples
- [ ] `npm run validate` in CI on push
- [ ] README skill table matches `EXPECTED`
- [ ] Trial load in Cursor: `Load skill from github:Powerff/codebase-agent-kit/skills/codebase-context-builder`
