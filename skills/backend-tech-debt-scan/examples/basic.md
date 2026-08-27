# 后端技术债务扫描 示例

## 场景
演示本技能在典型输入上的期望产出形态。

## 输入（Before）

```text
@Transactional
public void checkout(Cart cart) {
  charge(cart); // HTTP 调用支付
  stockRepo.decrement(cart.items);
  orderRepo.insert(cart);
}
```

## 期望产出要点

```text
（债务报告示例）
P0 长事务内远程调用 charge()，易超时占连接
P1 decrement 与 insert 失败补偿策略不清晰 — 标记一致性风险
```

## 说明
只报告，不擅自改支付/库存语义。

## 提醒
所有结论仅供参考，上线前必须人工评审与测试。
