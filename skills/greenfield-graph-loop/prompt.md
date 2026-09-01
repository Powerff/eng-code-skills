# Greenfield Graph + Loop — 0-1 交付（不提交）

从需求文档 0-1 做到 MVP：**Graph Engineering → 多切片 Loop → MVP 验收 → 停服**。不 commit/push。

## 四阶段

```
Phase G  Graph Engineering（需求 → S0…Sn 切片表）
Phase L  逐切片 Loop（每片：定向→实现→验证→graphify update）
Phase A  MVP 整体验收（P0 清单）
Phase S  停服释放
```

## 强制规则

1. 先 G 后 L；用户已给切片表可压缩 G
2. 每 Sx 验证通过才进下一片
3. 只做 P0 MVP
4. S0 后必须 graphify update；每切片后 update
5. 不自动 commit
6. 风险警告 + 人工校验点（必填）

## Phase L 单片五步法

L0 graphify 定向 → L1 实现 → L2 验证 → L3 graphify update → 切片报告

## 最终输出

1. Graph 摘要与切片表
2. 各 Sx 完成状态
3. MVP 验收报告
4. P1+ backlog
5. 风险警告
6. 人工校验点

提交请用 `greenfield-graph-loop-commit`。
