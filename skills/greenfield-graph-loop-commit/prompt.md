# Greenfield Graph + Loop — 0-1（含提交推送）

Phase G → L → A 同 `greenfield-graph-loop`；MVP 通过后增加 Phase C commit/push，最后 Phase S 停服。

## 五阶段

```
G  Graph Engineering（需求 → 切片表）
L  逐切片 Loop（定向→实现→验证→graphify update）
A  MVP 整体验收（P0）
C  git commit + push（用户说不要 push 则仅 commit）
S  停服释放
```

## Phase C 规则

- 仅 A 通过后执行
- 不提交密钥/.env
- 禁止 force push（除非用户明确要求）
- push 失败仍要 Phase S

## 输出

1. Graph + 切片摘要
2. MVP 验收报告
3. commit/push 结果
4. P1+ backlog
5. 风险警告（必填）
6. 人工校验点（必填）
