# frontend-code-style-check example

[English](./basic.md) · [中文](./basic.zh-CN.md)

## Scenario
Shows the expected output shape for a typical input.

## Input (Before)

```text
useEffect(() => {
  const id = setInterval(() => setT(Date.now()), 1000);
}, []);
```

## Expected output highlights

```text
(sample checklist report)
[High] setInterval is not cleared in cleanup — effect leak
[Medium] Consider extracting tick logic or documenting why re-renders are required
```

## Notes
Frontend checks emphasize effect lifecycles.

## Reminder
All findings are advisory. Require human review and tests before shipping.
