# 后端接口分层检查 示例

[English](./basic.md) · [中文](./basic.zh-CN.md)

## 场景
标记 Entity 外泄与用 Map 拼装的接口响应。

## 输入（Before）

```text
@GetMapping("/users/{id}")
public Map<String, Object> getUser(@PathVariable Long id) {
  UserEntity u = userService.find(id);
  Map<String, Object> m = new HashMap<>();
  m.put("id", u.getId());
  m.put("passwordHash", u.getPasswordHash());
  return m;
}
```

## 期望产出要点

```text
[P0] 返回 Map 而非类型化 VO — 契约不稳定
[P0] 响应包含 passwordHash — 敏感字段外泄
[P1] 建议 UserVO + BizResult（或项目既有包装）；字段语义保持不变
```

## 说明
包名与包装类型对齐仓库既有约定；不得改状态码或字段含义。

## 提醒
所有结论仅供参考，上线前必须人工评审与测试。
