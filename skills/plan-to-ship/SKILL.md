---
name: plan-to-ship
description: >-
  全自动串联：@iteration-plan 输出 PRD → 立即 @prd-to-code 或 @greenfield-graph-loop
  落地。无需人工点同意，一键从「规划下一迭代」到「可运行 MVP」。Use when plan to ship,
  规划并落地, 迭代串联, brownfield 全流程, 自动出码, @plan-to-ship。
license: MIT
metadata:
  version: "1.1.0"
  category: greenfield-workflow
  author: eng-code-skills
---

# Plan → Ship（全自动串联）

你是**迭代交付编排 Agent**。把规划与落地串成一条**无交互**流水线：

```
@iteration-plan  →  @prd-to-code  /  @greenfield-graph-loop
     规划 PRD              立即落地出码（不停顿）
```

```
- [ ] Phase P  Plan：内联执行 iteration-plan（写 PRD）
- [ ] Phase I  Implement：PRD 落盘后立即按路由落地（禁止等待用户确认）
- [ ] Phase S  Summary：汇总结果 + 风险警告 + 人工校验点
```

## 强制规则

1. **先规划后落地** — 未完成 Phase P（PRD 已落盘）不得进入 Phase I。
2. **禁止交互门禁** — PRD 写完后**立即**进入 Phase I，**不得**停下来等「同意 / 继续 / approved」。不要询问用户是否继续。
3. **只编排不重复发明** — Phase P / Phase I 分别严格遵循下游 Skill 规则，不弱化其强制条款。
4. **路由可指定** — 用户指定 `implementer` 优先；未指定则按下方自动路由。
5. **默认不 commit** — Phase I 默认走不提交路径；用户明确要求 commit/push 时才用 `greenfield-graph-loop-commit`。
6. **每次最终汇报须含**：风险警告 + 人工校验点（供事后核对，不是事前审批）。

## 输入参数

| 参数 | 说明 | 默认 |
| --- | --- | --- |
| `baselinePrd` | 基线 PRD / requirements 路径 | 自动发现 `docs/*prd*` / `prd/*.md` |
| `outputPrdPath` | 本迭代 PRD 输出路径 | `docs/<project>-v<version>-prd.md` 或 `prd/` |
| `iterationVersion` | 版本号，如 V2.0 | 从基线推断，缺省用日期戳 |
| `constraints` | deadline、必做/不做 | 用户原文 |
| `implementer` | `prd-to-code` \| `greenfield-graph-loop` \| `greenfield-graph-loop-commit` \| `auto` | `auto` |
| `outputRoot` | 出码目录（prd-to-code 用） | `./output_project` |
| `language` | 目标语言（可选） | 从 PRD 推断 |
| `skipPlan` | 已有 PRD，跳过 Phase P 直接落地 | false |
| `prdPath` | `skipPlan` 时使用的 PRD 路径 | — |

## Phase P — Plan（内联 iteration-plan）

严格按 `iteration-plan` 执行：

1. Assess → Gap → Plan → Write PRD → Report
2. 写完 PRD 后，在对话中**简要列出** `prdPath` + P0 摘要（不超过 10 行）
3. **不暂停**，立刻进入 Phase I

若 `skipPlan=true` 且给出 `prdPath`，跳过本阶段，直接用该 PRD 进入 Phase I。

## Phase I — Implement（路由落地，立即执行）

### 自动路由（implementer=auto）

| 条件 | 选用 |
| --- | --- |
| 用户显式指定 | 听用户的 |
| 仓库存在 SpecForge / `skills/prd-to-code` / 用户提到 SpecForge | `@prd-to-code` |
| 否则（通用 brownfield / 多语言精细切片） | `@greenfield-graph-loop` |
| 用户要求 commit/push | `@greenfield-graph-loop-commit` |

### I-A：prd-to-code（SpecForge）

按 SpecForge `prd-to-code` 规则执行（Agent 原生模式）：

1. 读 Phase P 产出的 PRD（或 `prdPath`）
2. WBS 拆解 → 逐模块 R-A-O-A → 路由 done / human_required
3. 输出目录：`outputRoot`

加载提示：

```text
若本机未安装 prd-to-code：
Load skill from github:Powerff/SpecForge/skills/prd-to-code
或工作区内 SpecForge/skills/prd-to-code/
```

### I-B：greenfield-graph-loop

按 `greenfield-graph-loop` 规则执行：

1. Phase G：图谱定向 + S0…Sn（可压缩若 PRD 已含切片）
2. Phase L：逐切片闭环
3. Phase A：MVP 验收
4. Phase S：停服

若用户选 commit 路径，改走 `greenfield-graph-loop-commit`（含 Phase C）。

## Phase S — Summary

最终汇报顺序：

### 1. 流水线状态表

| 阶段 | 状态 | 产物 |
| --- | --- | --- |
| P Plan | done | prdPath |
| I Implement | done / human_required / failed | outputRoot 或工作区变更 |

### 2. PRD 与落地摘要
### 3. 下游 Skill 原始关键结果（done / 切片状态 / fail_modules）
### 4. 风险警告（必填）
### 5. 人工校验点（必填，事后核对）

## 续跑（跳过规划）

```text
@plan-to-ship
skipPlan: true
prdPath: docs/foo-v2.0-prd.md
implementer: greenfield-graph-loop
```

直接进入 Phase I，仍不需要确认。

## 关联 Skill

| 阶段 | Skill |
| --- | --- |
| P | `iteration-plan`（本仓库） |
| I | SpecForge `prd-to-code` |
| I | `greenfield-graph-loop` / `greenfield-graph-loop-commit` |
| 仅定向 | `graph-engineering-requirements` |

## 不要用本 Skill 的场景

| 场景 | 改用 |
| --- | --- |
| 只要 PRD，不落地 | `@iteration-plan` |
| PRD 已有，只要切片方案 | `@graph-engineering-requirements` |
| PRD 已有，只要出码 | 直接 `@prd-to-code` 或 `@greenfield-graph-loop` |
| 改已有服务小需求 | `@backend-implement-verify*` |
