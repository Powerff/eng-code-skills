# 通用安全重构 示例

[English](./basic.md) · [中文](./basic.zh-CN.md)

## 场景
演示本技能在典型输入上的期望产出形态。

## 输入（Before）

```text
async function handle(req) {
  const u = req.body;
  if (!u.email) return { error: 'no email' };
  const n = u.name || 'anon';
  const dbUser = await db.users.create({ email: u.email, name: n });
  await mail.send(u.email, 'welcome ' + n);
  return { id: dbUser.id, email: dbUser.email, name: dbUser.name };
}
```

## 期望产出要点

```text
async function handle(req) {
  const userInput = req.body;
  if (!userInput.email) return { error: 'no email' };

  const displayName = userInput.name || 'anon';
  const created = await createUserRecord(userInput.email, displayName);
  await sendWelcomeEmail(userInput.email, displayName);
  return toUserResponse(created);
}

async function createUserRecord(email, name) {
  return db.users.create({ email, name });
}

async function sendWelcomeEmail(email, name) {
  await mail.send(email, 'welcome ' + name);
}

function toUserResponse(user) {
  return { id: user.id, email: user.email, name: user.name };
}
```

## 说明
仅提取函数与命名；校验、默认名、邮件文案、返回字段均不变。

## 提醒
所有结论仅供参考，上线前必须人工评审与测试。
