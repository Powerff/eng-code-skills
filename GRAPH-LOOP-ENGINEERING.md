# Graph Engineering · Loop Engineering

[中文](./GRAPH-LOOP-ENGINEERING.zh-CN.md) · English

Two complementary engines for **0-1 delivery from a requirements document**.

## Graph Engineering

**Turn requirements into a navigable map before coding.**

| Skill | Role |
| --- | --- |
| [`iteration-plan`](./skills/iteration-plan/) | Existing codebase → assess state, plan **next iteration**, write PRD markdown (PRD file only) |
| [`plan-to-ship`](./skills/plan-to-ship/) | **Pipeline**: iteration-plan → immediately prd-to-code / greenfield-graph-loop (no human gate) |
| [`graph-engineering-requirements`](./skills/graph-engineering-requirements/) | PRD → decomposition, graphify query plan, module map, MVP slice table (plan-only) |

Core moves: `graphify update` → `query` / `explain` / `path` / `affected` → written orientation deliverable.

## Loop Engineering

**Ship one vertical slice at a time with proof.**

| Skill | Role |
| --- | --- |
| [`loop-engineering-slice`](./skills/loop-engineering-slice/) | Single slice Sx: orient → implement → verify → graphify update → stop |

## Orchestrators (0-1)

| Skill | Commit? |
| --- | --- |
| [`greenfield-graph-loop`](./skills/greenfield-graph-loop/) | No — MVP in working tree |
| [`greenfield-graph-loop-commit`](./skills/greenfield-graph-loop-commit/) | Yes — MVP + push |

## Typical flow

```
Existing codebase — plan and ship (fully automatic)
    → @plan-to-ship
         Phase P: @iteration-plan (write PRD)
         Phase I: immediately @prd-to-code or @greenfield-graph-loop* (no pause)

Existing codebase — manual steps
    → @iteration-plan                    (writes docs/*-prd.md)
    → human PRD review
    → @graph-engineering-requirements    (optional: graph orientation + slices)
    → @greenfield-graph-loop-commit      (ship MVP)

New repo from PRD
requirements.md
    → @graph-engineering-requirements   (optional if you want plan-only first)
    → @greenfield-graph-loop-commit     (full 0-1)
```

## Slice conventions

| Slice | Typical scope |
| --- | --- |
| **S0** | Tooling skeleton — package.json, dirs, validate/build passes |
| **S1** | First end-to-end path (one API, one page, or one skill) |
| **S2+** | Remaining P0 features in dependency order |

After **S0**, always run `graphify update .` so later slices use Graph Engineering on real code.

## vs brownfield workflows

| Scenario | Use |
| --- | --- |
| Existing codebase — plan next iteration PRD | `iteration-plan` |
| Existing codebase — plan → ship (automatic) | `plan-to-ship` |
| New project from PRD | `greenfield-graph-loop*` |
| Change existing service | `backend-implement-verify*` |
| Plan-only migration | `codebase-agent-kit` |
| **Worked example (PRD → repo)** | [examples/greenfield-codebase-agent-kit.md](./examples/greenfield-codebase-agent-kit.md) |
