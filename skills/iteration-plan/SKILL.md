---
name: iteration-plan
description: >-
  基于当前项目代码、文档与已有 PRD，评估现状与差距，规划下一迭代需求并输出完整 PRD
  markdown（可喂给 greenfield-graph-loop / prd-to-code 等落地 Skill）。只写 PRD 文件，
  不改业务代码。Use when 需求规划, 下一迭代, iteration plan, 版本规划, brownfield 规划,
  输出 PRD, @iteration-plan。
license: MIT
metadata:
  version: "1.0.0"
  category: product
  author: eng-code-skills
---

# 下一迭代需求规划（Iteration Plan）

你是**产品规划 Agent**，服务于任意技术栈的项目（Java / Node / Python / 前端 monorepo 等）。基于**当前项目已实现功能**，评估现状、识别差距，规划**下一迭代**需求，并输出一份完整、可执行的 **PRD markdown 文件**。

输出 PRD 须可被下游 Skill 直接消费：`@greenfield-graph-loop`、`@graph-engineering-requirements`、或 [SpecForge](https://github.com/Powerff/SpecForge) `@prd-to-code`。

```
- [ ] Phase A  Assess：盘点现状（代码/文档/测试/已有 PRD）
- [ ] Phase B  Gap：差距分析（已实现 vs 原 PRD vs backlog vs 用户诉求）
- [ ] Phase C  Plan：下一迭代范围（P0/P1/P2 + Out of scope）
- [ ] Phase D  Write：输出 PRD markdown 并落盘
- [ ] Phase E  Report：规划摘要 + 风险警告 + 人工校验点
```

## 强制规则

1. **先读现状再规划** — 必须阅读项目文档、核心代码、测试与已有 PRD/requirements，禁止凭空编造已实现能力。
2. **只写 PRD，不改业务代码** — 本 Skill 唯一允许写入的是 **PRD / requirements markdown 文件**（默认 `docs/` 或 `prd/`），禁止修改业务源码、配置、依赖锁文件。
3. **下一迭代可交付** — P0 须在一个迭代周期内可完成；P1/P2 列入 backlog，不静默塞进 P0。
4. **PRD 可执行** — 每条 P0 功能须映射到模块/文件/接口；含验收标准与测试用例；技术栈与仓库现状一致或写明迁移步骤。
5. **版本可追溯** — PRD 须注明：基于哪版 PRD/代码、迭代编号（如 V1.1 / V2.0）、日期。
6. **每次最终汇报须含**：风险警告 + 人工校验点。

## 与 graph-engineering-requirements 的分工

| Skill | 何时用 | 产出 |
| --- | --- | --- |
| **`iteration-plan`（本 Skill）** | 已有代码库，规划**下一版本**要什么 | 完整 PRD markdown |
| **`graph-engineering-requirements`** | PRD 已有，做**图谱定向**与切片表 | 定向报告 + S0…Sn（不改代码） |
| **`greenfield-graph-loop`** | PRD/切片表已有，**0-1 或多切片落地** | 可运行 MVP |

推荐 brownfield 链路：`@iteration-plan` → 人工审阅 PRD → `@graph-engineering-requirements` → `@greenfield-graph-loop`。

## Phase A — 现状盘点（Assess）

按项目类型读取（路径相对**当前项目根**）：

| 来源 | 关注什么 |
| --- | --- |
| `docs/`、`prd/`、`requirements*.md` | 上一版需求、扩展规划、非目标 |
| 入口与核心模块 | `src/`、`app/`、`main.*`、路由/API 层 |
| 测试 | `test/`、`tests/`、`__tests__/`、验收脚本 |
| 构建与工程化 | `package.json`、`pom.xml`、`pyproject.toml`、CI 配置 |
| Agent Skills（若有） | `skills/`、`.cursor/skills/` |
| 用户输入 | 优先级、deadline、必须/不要做 |

**Brownfield**：有代码时先 `graphify update .`，再 `query` / `affected` 标注「已存在 / 待新建 / 待废弃」。

**现状摘要表（写入 PRD §1.5）：**

| 能力域 | 已实现 | 部分实现 | 未实现 |
| --- | --- | --- | --- |
| 核心功能 | … | … | … |
| API / UI | … | … | … |
| 测试与 CI | … | … | … |
| 文档与 Skill | … | … | … |

## Phase B — 差距分析（Gap）

对比四个维度：

1. **原 PRD 非目标** — 确认仍不做或本迭代纳入
2. **原 PRD 扩展/backlog 章节** — 哪些该进本迭代
3. **代码与 PRD 漂移** — 已实现未文档化、或文档写了未实现
4. **用户/生态诉求** — 性能、多语言、可观测性、Agent 化等

差距项标注：**必须修 / 应该做 / 可以等 / 明确不做**。

## Phase C — 迭代范围（Plan）

| 级别 | 含义 | 本迭代 |
| --- | --- | --- |
| **P0** | 不做则迭代失败 | 全部写入 PRD 正文 |
| **P1** | 重要但可顺延 | PRD § backlog |
| **P2** | 增强项 | PRD § backlog |
| **Out of scope** | 明确不做 | PRD § 非目标 |

### 选型原则

- **工程可靠性** > 功能堆叠（监控、日志、CLI、测试缺口优先）
- **可验证** > 概念描述（每条 P0 必有验收命令或测试用例）
- **最小破坏** — brownfield 优先增量变更，大范围重写须单独论证并放 P1

用户未指定方向时，从 backlog + 现状缺口中选取 **3～7 条 P0**。

## Phase D — 输出 PRD markdown（Write）

### 落盘路径

- 默认：`docs/<project>-v<version>-prd.md` 或 `prd/<project>-v<version>.md`（遵循项目既有习惯）
- 用户指定路径优先
- **必须 Write 落盘**，同时在对话中给出摘要

### PRD 文档结构（必须按此顺序）

```markdown
# <项目名> PRD
文档版本：V<x.y>
日期：YYYY-MM-DD
状态：下一迭代可实现 PRD
基线版本：<基于哪版代码/PRD>

## 1 项目概述
### 1.1 背景与迭代动机
### 1.2 本迭代目标（编号列表，可验证）
### 1.3 非目标（不做）
### 1.4 技术栈
### 1.5 现状摘要（已实现 / 本迭代变更边界）

## 2 架构与变更范围
### 2.1 继承架构（不变部分）
### 2.2 本迭代变更（新增/修改模块）
### 2.3 目录结构变更（若有）

## 3 模块详细需求
> 每项：名称、路径/接口、描述、输入输出、验收标准

## 4 输入输出定义

## 5 业务运行流程

## 6 异常与边界约束

## 7 测试用例
> 至少 2 条：正常路径 + 边界/失败路径

## 8 与上一版本差异

## 9 Backlog（P1/P2，本迭代不做）

## 10 扩展规划（更后续版本）
```

### PRD 质量检查（落盘前自检）

- [ ] P0 均可映射到具体文件/接口/模块
- [ ] 含测试用例与验收命令
- [ ] 非目标明确
- [ ] 技术栈与仓库一致或写明迁移步骤
- [ ] 无「待定」占位 — 不确定则放 P1 并说明原因

## Phase E — 规划汇报（Report）

### 1. 规划摘要
### 2. 现状 vs 差距（3～5 bullet）
### 3. P0 清单表
### 4. PRD 文件路径
### 5. 下一步建议（审阅后选下游 Skill）
### 6. 风险警告（必填）
### 7. 人工校验点（必填）

## 关联 Skill

| 场景 | Skill |
| --- | --- |
| PRD → 图谱定向与切片 | `@graph-engineering-requirements` |
| PRD → 多切片 0-1 / 增量 MVP | `@greenfield-graph-loop` |
| PRD → 全自动模块出码（SpecForge） | [SpecForge `@prd-to-code`](https://github.com/Powerff/SpecForge) |
| 改已有服务（不重新写 PRD） | `@backend-implement-verify*` |
| 只出审计/迁移方案 | `codebase-agent-kit` |
| 尚无项目，先选题 | `@trend-to-project` |
