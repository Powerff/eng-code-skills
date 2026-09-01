---
name: graph-engineering-requirements
description: Graph Engineering：从需求/PRD 做图谱定向与模块分解，输出 query 清单、依赖图、切片建议与入口文件，只出方案不改代码。Use when graph engineering, PRD 图谱, 需求分解, 0-1 定向, @graph-engineering-requirements。
license: MIT
metadata:
  version: "0.1.0"
  category: greenfield-workflow
  author: eng-code-skills
---

# Graph Engineering — 需求图谱定向

**Graph Engineering** 第一阶段：把需求文档变成可执行的**图谱定向交付物**，禁止跳过本阶段直接全库 grep。

## 强制规则

1. **只出方案**：输出图谱定向报告；**禁止**自动创建/修改业务代码（除非用户明确要求「顺便初始化空仓库骨架」且单独确认）。
2. **图谱优先**：仓库已有代码时必须先 `graphify update .` 再 query；空仓库则输出「首切片后的 graphify 检查点」。
3. **需求可追溯**：每条功能点须映射到模块/文件/接口（规划级，可标「待创建」）。
4. **切片就绪**：产出须能直接喂给 `loop-engineering-slice` / `greenfield-graph-loop`。
5. **每次输出必须包含**：风险警告 + 人工校验点。

## Graph Engineering 三步

### Step G1 — 需求解构

从 PRD / 用户描述提取：

| 维度 | 产出 |
| --- | --- |
| 目标用户 & 成功标准 | 可验证的 Done 定义 |
| 功能清单 | P0 / P1 / P2 |
| 非功能 | 性能、安全、部署约束 |
| 显式不做 | Out of scope |

### Step G2 — 图谱查询计划

```bash
graphify update .          # 有代码时
graphify query "<模块关键词>"
graphify explain "<核心概念>"
graphify path "<入口>" "<数据层>"
graphify affected "<拟改符号>"   #  brownfield 时
```

空仓库：列出**首切片创建后**应执行的 query 关键词列表。

### Step G3 — 模块与依赖图（文字/Mermaid）

- 建议目录结构（按项目栈）
- 模块边界与依赖方向（禁止循环依赖）
- 建议改动入口（Controller / Route / Page / CLI 等）
- **MVP 切片顺序**（见下表）

## MVP 切片模板

| 切片 | 范围 | 验证标准 |
| --- | --- | --- |
| S0 | 工程骨架（包管理、目录、健康检查） | 能启动 / build |
| S1 | 核心领域模型 + 一条纵向链路 | 端到端手测通过 |
| S2+ | 按 P0 功能递增 | 每切片独立可验 |

## 输出结构（必须按此顺序）

### 1. 执行总结
### 2. 需求解构表（P0/P1/P2 + Out of scope）
### 3. 图谱 query 清单（已执行 / 待首切片后执行）
### 4. 模块依赖图（Mermaid 或层级列表）
### 5. MVP 切片计划（S0…Sn，含验证标准）
### 6. 风险警告（必填）
### 7. 人工校验点（必填）

## 关联 Skill

- 单切片落地 → `loop-engineering-slice`
- 完整 0-1 多切片 → `greenfield-graph-loop` / `greenfield-graph-loop-commit`
- 仅改码不提交 → `backend-implement-verify`
