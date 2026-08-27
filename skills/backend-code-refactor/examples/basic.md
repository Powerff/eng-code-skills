# 后端安全重构 示例

## 场景
演示本技能在典型输入上的期望产出形态。

## 输入（Before）

```text
public Order place(OrderReq req) {
  validate(req);
  User u = userRepo.find(req.userId);
  Order o = new Order();
  o.setUserId(u.getId());
  o.setTotal(req.total);
  orderRepo.save(o);
  return o;
}
```

## 期望产出要点

```text
public Order place(OrderReq req) {
  validate(req);
  User user = userRepo.find(req.userId);
  Order order = buildOrder(user.getId(), req.total);
  orderRepo.save(order);
  return order;
}

private Order buildOrder(Long userId, BigDecimal total) {
  Order order = new Order();
  order.setUserId(userId);
  order.setTotal(total);
  return order;
}
```

## 说明
仅提取构建逻辑；校验与持久化顺序不变。

## 提醒
所有结论仅供参考，上线前必须人工评审与测试。
