# Plan → Ship（全自动）

串联：`iteration-plan` → **立即** `prd-to-code` / `greenfield-graph-loop`。

**禁止**停下来等「同意 / 继续 / approved」。PRD 落盘后立刻出码。

## 三阶段

```
Phase P  Plan：内联 iteration-plan，写 PRD
Phase I  Implement：立即按路由落地（无交互）
Phase S  Summary：状态表 + 风险 + 人工校验（事后）
```

## 强制规则

1. 先 P 后 I；未落盘 PRD 不得出码
2. **无门禁** — 写完 PRD 立刻进 I，禁止询问是否继续
3. 内联遵循下游 Skill 全部强制条款
4. `implementer` 用户指定优先；`auto`：有 SpecForge/`prd-to-code` → SpecForge，否则 → greenfield-graph-loop；要提交 → greenfield-graph-loop-commit
5. 默认不 commit
6. 最终汇报：风险警告 + 人工校验点

## 跳过规划

```
@plan-to-ship
skipPlan: true
prdPath: docs/foo-v2.0-prd.md
implementer: auto
```

## 最终汇报

1. 流水线状态表（P/I）
2. PRD 与落地摘要
3. 下游关键结果
4. 风险警告（必填）
5. 人工校验点（必填）
