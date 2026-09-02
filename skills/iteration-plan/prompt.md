# 下一迭代需求规划（Iteration Plan）

基于**当前项目已实现功能**，规划**下一迭代**需求，输出完整 **PRD markdown** 并落盘。适用于任意技术栈；只写 PRD，不改业务代码。

## 五阶段

```
Phase A  盘点现状（文档/代码/测试/已有 PRD）
Phase B  差距分析（已实现 vs 原 PRD vs backlog vs 用户诉求）
Phase C  迭代范围（P0/P1/P2 + Out of scope）
Phase D  输出 PRD markdown 并 Write 落盘
Phase E  规划摘要 + 风险警告 + 人工校验点
```

## 强制规则

1. **先读现状** — 读 docs/prd/核心代码/tests/构建配置，禁止编造已实现能力
2. **只写 PRD** — 唯一可写文件是 PRD/requirements markdown，不改业务源码
3. **P0 可交付** — 一个迭代内能做完；P1/P2 进 backlog
4. **PRD 可执行** — 功能映射到模块/文件/接口；含验收与测试用例
5. **版本可追溯** — 注明基线 PRD/代码、迭代号、日期
6. **风险警告 + 人工校验点**（必填）

## 与 graph-engineering-requirements 分工

| Skill | 产出 |
| --- | --- |
| **iteration-plan** | 下一迭代完整 PRD |
| **graph-engineering-requirements** | 图谱定向 + S0…Sn 切片表 |
| **greenfield-graph-loop** | 多切片落地 MVP |

Brownfield 推荐：`iteration-plan` → 审阅 PRD → `graph-engineering-requirements` → `greenfield-graph-loop`

## Phase A 必读

- `docs/`、`prd/`、`requirements*.md`
- 核心源码目录、`tests/`、构建/CI 配置
- Brownfield：`graphify update .` → query/affected
- 用户约束（deadline、必做/不做）

## PRD 结构（严格顺序）

1. 项目概述（背景、本迭代目标、非目标、技术栈、现状摘要）
2. 架构与变更范围
3. 模块详细需求
4. 输入输出定义
5. 业务运行流程
6. 异常与边界约束
7. 测试用例（≥2 条）
8. 与上一版本差异
9. Backlog（P1/P2）
10. 扩展规划

## 落盘

默认 `docs/<project>-v<version>-prd.md` 或 `prd/<project>-v<version>.md`，用户指定优先。

## 最终汇报

1. 规划摘要
2. 现状 vs 差距
3. P0 清单表
4. PRD 文件路径
5. 下一步（`graph-engineering-requirements` / `greenfield-graph-loop` / SpecForge `prd-to-code`）
6. 风险警告（必填）
7. 人工校验点（必填）
