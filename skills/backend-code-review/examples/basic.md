# backend-code-review example

[English](./basic.md) · [中文](./basic.zh-CN.md)

## Scenario
Shows the expected output shape for a typical input.

## Input (Before)

```text
app.post('/transfer', async (req, res) => {
  const { from, to, amount } = req.body;
  await db.query('UPDATE accounts SET bal=bal-? WHERE id=?', [amount, from]);
  await db.query('UPDATE accounts SET bal=bal+? WHERE id=?', [amount, to]);
  res.json({ ok: true });
});
```

## Expected output highlights

```text
(sample review findings)
[Must address] No transaction: mid-failure can desync balances
[Must address] No auth / amount validation / idempotency key
[High] Insufficient-balance path unchecked — business risk; do not change debit rules unilaterally
```

## Notes
Money-path issues are primarily risk flags.

## Reminder
All findings are advisory. Require human review and tests before shipping.
