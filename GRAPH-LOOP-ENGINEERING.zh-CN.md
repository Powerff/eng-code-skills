# Graph Engineering · Loop Engineering

[English](./GRAPH-LOOP-ENGINEERING.md) · 中文

从**一份需求文档**做 **0-1 交付**的两套互补引擎。

## Graph Engineering（图谱工程）

**先建图再写码** — 把需求变成可导航的图谱定向交付物。

| Skill | 作用 |
| --- | --- |
| [`iteration-plan`](./skills/iteration-plan/) | 已有代码库 → 盘点现状、规划**下一迭代**、输出 PRD markdown（只写 PRD） |
| [`graph-engineering-requirements`](./skills/graph-engineering-requirements/) | PRD → 分解、graphify 查询计划、模块图、MVP 切片表（只出方案） |

核心动作：`graphify update` → `query` / `explain` / `path` / `affected` → 书面定向结论。

## Loop Engineering（循环工程）

**一片一闭环、片片有证据** — 按切片纵向交付。

| Skill | 作用 |
| --- | --- |
| [`loop-engineering-slice`](./skills/loop-engineering-slice/) | 单切片 Sx：定向 → 实现 → 验证 → graphify update → 停服 |

## 编排器（0-1 全流程）

| Skill | 是否提交 |
| --- | --- |
| [`greenfield-graph-loop`](./skills/greenfield-graph-loop/) | 否 — MVP 留工作区 |
| [`greenfield-graph-loop-commit`](./skills/greenfield-graph-loop-commit/) | 是 — MVP 后 commit/push |

## 推荐流程

```
已有代码库，规划下一版
    → @iteration-plan                    （输出 docs/*-prd.md）
    → 人工审阅 PRD
    → @graph-engineering-requirements    （可选：图谱定向 + 切片表）
    → @greenfield-graph-loop-commit      （完整落地）

新仓库从 PRD 0-1
requirements.md
    → @graph-engineering-requirements   （可选：先要纯方案）
    → @greenfield-graph-loop-commit     （完整 0-1）
```

## 切片约定

| 切片 | 典型范围 |
| --- | --- |
| **S0** | 工程骨架 — package.json、目录、validate/build 通过 |
| **S1** | 第一条端到端链路（一个 API / 页面 / Skill） |
| **S2+** | 按依赖顺序补齐 P0 |

**S0 完成后务必** `graphify update .`，后续切片才能在真实代码上做 Graph Engineering。

## 与 brownfield 工作流对比

| 场景 | 选用 |
| --- | --- |
| 已有代码库，规划下一迭代 PRD | `iteration-plan` |
| 新仓库从 PRD 开做 | `greenfield-graph-loop*` |
| 改已有服务 | `backend-implement-verify*` |
| 只出迁移/审计方案 | `codebase-agent-kit` |
| **已落地案例（PRD→仓库）** | [examples/greenfield-codebase-agent-kit.zh-CN.md](./examples/greenfield-codebase-agent-kit.zh-CN.md) |
