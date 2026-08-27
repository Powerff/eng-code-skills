# 通用代码规范检查 示例

[English](./basic.md) · [中文](./basic.zh-CN.md)

## 场景
演示本技能在典型输入上的期望产出形态。

## 输入（Before）

```text
function calc(a,b,c){var x=a+b;if(c){if(x>10){return x*2}else{return x}}else{return a}}
```

## 期望产出要点

```text
function calculateSubtotal(unitPrice, quantity, applyDiscount) {
  const subtotal = unitPrice + quantity;
  if (!applyDiscount) {
    return unitPrice;
  }
  return subtotal > 10 ? subtotal * 2 : subtotal;
}
```

## 说明
仅改善命名与结构；计算公式与分支语义保持不变（示例中故意保留原语义以演示「不改业务」）。

## 提醒
所有结论仅供参考，上线前必须人工评审与测试。
