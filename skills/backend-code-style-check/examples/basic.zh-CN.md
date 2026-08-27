# 后端代码规范检查 示例

[English](./basic.md) · [中文](./basic.zh-CN.md)

## 场景
演示本技能在典型输入上的期望产出形态。

## 输入（Before）

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

## 期望产出要点

```text
（检查报告示例）
[高] N+1 查询：按 userIDs 循环查 orders
[高] 资源泄露：rows 未 Close；错误被忽略
[中] 缺少入参空切片/上限校验
```

## 说明
后端风格检查强调数据访问与资源安全。

## 提醒
所有结论仅供参考，上线前必须人工评审与测试。
