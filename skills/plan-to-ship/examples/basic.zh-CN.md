# 示例：plan-to-ship（全自动）

## 场景

规划 SpecForge V2，写完 PRD 后**立即**用 `@prd-to-code` 落地，不等待「同意」。

## 输入

```text
@plan-to-ship
基线：docs/prd-to-code-v1.0.md
输出 PRD：prd/specforge-v2.0.md
版本：V2.0
约束：P0 = CLI 参数、state 持久化、日志；不做 Web UI；2 周
implementer: auto
```

## 预期

1. **Phase P** — 落盘 `prd/specforge-v2.0.md`，简要列出 P0
2. **Phase I** — 立刻执行 `prd-to-code`（不询问是否继续）
3. **Phase S** — 流水线状态 + 风险 + 事后人工校验点

## 跳过规划

```text
@plan-to-ship
skipPlan: true
prdPath: prd/specforge-v2.0.md
implementer: greenfield-graph-loop
```

直接进入落地阶段。

## 通用 brownfield

```text
@plan-to-ship
基线：docs/kit-prd-v1.0.md
输出 PRD：docs/kit-v1.1-prd.md
implementer: greenfield-graph-loop
```

自动：写 PRD → Graph+Loop 落地（要提交时设 `implementer: greenfield-graph-loop-commit`）。

## 串联示意

```
@plan-to-ship
  ├─ P  @iteration-plan（内联，写 PRD）
  └─ I  @prd-to-code 或 @greenfield-graph-loop（立即执行）
```
