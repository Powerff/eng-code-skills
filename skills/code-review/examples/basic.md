# code-review example

[English](./basic.md) · [中文](./basic.zh-CN.md)

## Scenario
Shows the expected output shape for a typical input.

## Input (Before)

```text
export function divide(a, b) {
  return a / b;
}
```

## Expected output highlights

```text
(sample review findings; default is no code changes)
[Must address] b===0 yields Infinity/errors; caller contract undefined — flag as risk; do not change return behavior unilaterally
[Suggestion] Add parameter types and unit tests
```

## Notes
Reviews emphasize findings; logic defects are flagged, not silently fixed.

## Reminder
All findings are advisory. Require human review and tests before shipping.
