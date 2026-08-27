# backend-tech-debt-scan example

[English](./basic.md) · [中文](./basic.zh-CN.md)

## Scenario
Shows the expected output shape for a typical input.

## Input (Before)

```text
@Transactional
public void checkout(Cart cart) {
  charge(cart); // HTTP 调用支付
  stockRepo.decrement(cart.items);
  orderRepo.insert(cart);
}
```

## Expected output highlights

```text
(sample debt report)
P0 Remote call charge() inside a long transaction; timeouts can hold connections
P1 Unclear compensation if decrement/insert fails — consistency risk
```

## Notes
Report only; do not unilaterally change payment or inventory semantics.

## Reminder
All findings are advisory. Require human review and tests before shipping.
