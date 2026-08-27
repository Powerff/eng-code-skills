# backend-implement-verify-commit example

[English](./basic.md) · [中文](./basic.zh-CN.md)

## Scenario
Demonstrates the packaged backend workflow skill adapted from Cursor `implement-verify-commit`.

## Input

```text
Apply backend-implement-verify-commit to the current backend change set / reported issue.
Keep project conventions. Emit risk warnings and a manual checklist.
```

## Expected output highlights

```text
- Follow the skill phases in order
- Produce an evidence-backed summary
- Include risk warnings + manual verification checklist
```

## Notes
Full loop: implement → verify → commit/push → stop verification services.

## Reminder
Advisory only. Require human review before production.
