# backend-code-style-check example

[English](./basic.md) · [中文](./basic.zh-CN.md)

## Scenario
Shows the expected output shape for a typical input.

## Input (Before)

```text
func GetOrders(db *sql.DB, userIDs []int64) ([]Order, error) {
  var out []Order
  for _, id := range userIDs {
    rows, _ := db.Query("SELECT * FROM orders WHERE user_id=?", id)
    // ... append, rows not closed
  }
  return out, nil
}
```

## Expected output highlights

```text
(sample checklist report)
[High] N+1 queries: looping userIDs to query orders
[High] Resource leak: rows not Closed; errors ignored
[Medium] Missing empty-slice / upper-bound input validation
```

## Notes
Backend style checks emphasize data access and resource safety.

## Reminder
All findings are advisory. Require human review and tests before shipping.
