# frontend-tech-debt-scan example

[English](./basic.md) · [中文](./basic.zh-CN.md)

## Scenario
Shows the expected output shape for a typical input.

## Input (Before)

```text
// God component 800+ lines mixing fetch, form, chart, modal
```

## Expected output highlights

```text
(sample debt report)
P1 Page component 800+ lines; view coupled to data fetching
P2 Redux and ad-hoc Context both store the same user session
P2 Multiple document.addEventListener calls without removal
```

## Notes
Scan reports do not automatically split the codebase.

## Reminder
All findings are advisory. Require human review and tests before shipping.
