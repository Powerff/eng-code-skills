# backend-project-refactor example

[English](./basic.md) · [中文](./basic.zh-CN.md)

## Scenario
Backend service refactor using call-chain analysis → plan → code → CR → test loop.

## Input

```text
Run backend-project-refactor on the legacy entrypoint described in project-config.md.
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
Focus on deep call-chain analysis and ownership mapping before coding.

## Reminder
Methodology adapted from the Tencent Cloud Developer article on service-refactor Skills. Require human review before production.
