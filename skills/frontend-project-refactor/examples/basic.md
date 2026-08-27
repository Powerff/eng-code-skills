# frontend-project-refactor example

[English](./basic.md) · [中文](./basic.zh-CN.md)

## Scenario
Frontend project refactor using interaction/data-chain analysis → plan → code → CR → test loop.

## Input

```text
Run frontend-project-refactor on the legacy entrypoint described in project-config.md.
Follow the five phases. Do not skip human plan review.
```

## Expected output highlights

```text
- Phase 1: call-chain / interaction-chain analysis + plan + ownership map + GAP table
- Phase 2: clarification questions (≤5) recorded in clarifications.md
- Later phases only after human approval
- Risk warnings + manual checklist every phase
```

## Notes
Map routes/containers/state/API into the four-layer model before migration.

## Reminder
Methodology adapted from the Tencent Cloud Developer article on service-refactor Skills. Require human review before production.
