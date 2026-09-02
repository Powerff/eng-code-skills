# Example: iteration-plan (brownfield)

## Scenario

Plan the next iteration for an existing repo from current code and prior PRD.

## Input

```text
Load skill from github:Powerff/eng-code-skills/skills/iteration-plan

@iteration-plan
Project root: ./
Baseline PRD: docs/kit-prd-v1.0.md
Iteration: V1.1
Output: docs/kit-v1.1-prd.md
Constraints:
- P0: add validate script, 2 plan-only skills
- No breaking API changes
- 2-week delivery
```

## Expected output highlights

1. **Phase A** — Current state from README, skills/, scripts/.
2. **Phase B** — Gap vs baseline PRD backlog and code drift.
3. **Phase C** — P0/P1 split; out-of-scope explicit.
4. **Phase D** — Written `docs/kit-v1.1-prd.md` with modules, acceptance, ≥2 test cases.
5. **Phase E** — Summary + risks + manual checks.
6. **Handoff** — `@graph-engineering-requirements` then `@greenfield-graph-loop`.

## SpecForge example

```text
@iteration-plan
Baseline: docs/prd-to-code-v1.0.md
Output: prd/specforge-v2.0.md
Focus: CLI flags, state persistence, logging
```

Then `@prd-to-code` (SpecForge) or `@greenfield-graph-loop` after review.
