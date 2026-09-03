# Example: plan-to-ship (fully automatic)

## Scenario

Plan SpecForge V2 and land immediately with prd-to-code — no approval pause.

## Input

```text
@plan-to-ship
Baseline: docs/prd-to-code-v1.0.md
Output PRD: prd/specforge-v2.0.md
Version: V2.0
Constraints: P0 = CLI flags, state persistence, logging; no Web UI; 2 weeks
implementer: auto
```

## Expected

1. **Phase P** — Writes `prd/specforge-v2.0.md`, prints short P0 summary.
2. **Phase I** — Immediately runs `prd-to-code` (no wait for 同意).
3. **Phase S** — Pipeline status + risks + manual checks (post-hoc).

## Skip plan

```text
@plan-to-ship
skipPlan: true
prdPath: prd/specforge-v2.0.md
implementer: greenfield-graph-loop
```

Goes straight to implement.

## Generic brownfield

```text
@plan-to-ship
Baseline: docs/kit-prd-v1.0.md
Output PRD: docs/kit-v1.1-prd.md
implementer: greenfield-graph-loop
```

Auto: write PRD → greenfield Graph+Loop MVP (no commit unless implementer=`greenfield-graph-loop-commit`).
