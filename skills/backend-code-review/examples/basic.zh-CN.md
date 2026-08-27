# 后端代码评审 示例

[English](./basic.md) · [中文](./basic.zh-CN.md)

## 场景
演示本技能在典型输入上的期望产出形态。

## 输入（Before）

```text
app.post('/transfer', async (req, res) => {
  const { from, to, amount } = req.body;
  await db.query('UPDATE accounts SET bal=bal-? WHERE id=?', [amount, from]);
  await db.query('UPDATE accounts SET bal=bal+? WHERE id=?', [amount, to]);
  res.json({ ok: true });
});
```

## 期望产出要点

```text
（评审意见示例）
[必须关注] 无事务：中途失败导致资金不一致
[必须关注] 无鉴权/无金额校验/无幂等键
[高] 余额不足未检查 — 标记业务风险，不擅自改扣款规则
```

## 说明
资金路径问题以风险标记为主。

## 提醒
所有结论仅供参考，上线前必须人工评审与测试。
