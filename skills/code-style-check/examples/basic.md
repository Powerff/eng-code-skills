# code-style-check example

[English](./basic.md) · [中文](./basic.zh-CN.md)

## Scenario
Shows the expected output shape for a typical input.

## Input (Before)

```text
function calc(a,b,c){var x=a+b;if(c){if(x>10){return x*2}else{return x}}else{return a}}
```

## Expected output highlights

```text
function calculateSubtotal(unitPrice, quantity, applyDiscount) {
  const subtotal = unitPrice + quantity;
  if (!applyDiscount) {
    return unitPrice;
  }
  return subtotal > 10 ? subtotal * 2 : subtotal;
}
```

## Notes
Improves naming and structure only; calculation and branch semantics stay unchanged (original semantics are intentionally preserved to demonstrate “no business-logic change”).

## Reminder
All findings are advisory. Require human review and tests before shipping.
