# tech-debt-scan example

[English](./basic.md) · [中文](./basic.zh-CN.md)

## Scenario
Shows the expected output shape for a typical input.

## Input (Before)

```text
// TODO: remove after migration (2021)
const API = 'http://127.0.0.1:3000';
function getUser(id){ return fetch(API+'/u/'+id).then(r=>r.json()) }
```

## Expected output highlights

```text
(no code changes — sample scan report)
P1 Hardcoded base URL: API points at localhost, blocking multi-environment deploy
P2 Stale TODO: 2021 migration marker still present
P2 Missing error handling: fetch has no non-2xx handling
```

## Notes
Debt scans primarily produce reports; they do not automatically rewrite business code.

## Reminder
All findings are advisory. Require human review and tests before shipping.
