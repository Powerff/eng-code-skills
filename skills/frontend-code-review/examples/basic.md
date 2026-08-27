# frontend-code-review example

[English](./basic.md) · [中文](./basic.zh-CN.md)

## Scenario
Shows the expected output shape for a typical input.

## Input (Before)

```text
useEffect(() => { fetchUser(id).then(setUser); }, []);
```

## Expected output highlights

```text
(sample review findings)
[Must address] Dependency array missing id; id changes will not refetch — correctness risk
[Suggestion] Guard setState after unmount; cover loading/error states
```

## Notes
Missing effect dependencies are flagged as risks; behavior changes require human confirmation.

## Reminder
All findings are advisory. Require human review and tests before shipping.
