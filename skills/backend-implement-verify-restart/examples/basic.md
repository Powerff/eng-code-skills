# backend-implement-verify-restart example

[English](./basic.md) · [中文](./basic.zh-CN.md)

## Scenario
Demonstrates the packaged backend workflow skill adapted from Cursor `implement-verify-restart`.

## Input

```text
Apply backend-implement-verify-restart to the current backend change set / reported issue.
Keep project conventions. Emit risk warnings and a manual checklist.
```

## Expected output highlights

```text
- Follow the skill phases in order
- Produce an evidence-backed summary
- Include risk warnings + manual verification checklist
```

## Notes
Implement → verify → stop session services → restart for the user; no auto commit.

## Reminder
Advisory only. Require human review before production.
