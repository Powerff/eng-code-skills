---
name: greenfield-graph-loop
description: 0-1 完整交付：Graph Engineering 需求图谱 → 多切片 Loop Engineering → MVP 验收 → 停服。不自动 commit/push。Use when greenfield, 0-1, 从需求实现, graph loop, @greenfield-graph-loop。
license: MIT
metadata:
  version: "0.1.0"
  category: greenfield-workflow
  author: eng-code-skills
---

# Greenfield Graph + Loop — 0-1 交付（不提交）

从**一份需求文档**把项目从 0 做到 **MVP 可验证**，编排 Graph Engineering 与 Loop Engineering，**不自动 commit/push**。

```
- [ ] Phase G  Graph Engineering（需求 → 切片计划）
- [ ] Phase L  Loop Engineering（逐切片 S0…Sn）
- [ ] Phase A  MVP 整体验收
- [ ] Phase S  停止服务并释放资源
```

## 方法论

| 引擎 | 职责 |
| --- | --- |
| **Graph Engineering** | 需求解构、graphify 定向、模块图、切片顺序 |
| **Loop Engineering** | 每切片：定向 → 实现 → 验证 → graphify update |

等价于内联执行 `graph-engineering-requirements` + 多次 `loop-engineering-slice`。

## 强制规则

1. **先 G 后 L** — 未完成 Phase G 不得写业务代码（用户已提供切片计划时可压缩 G）。
2. **逐切片闭环** — 每个 Sx 必须验证通过才进入 Sx+1；失败只回滚当前切片。
3. **MVP 边界** — 只做 P0；P1 列入 backlog，不静默扩展范围。
4. **图谱随代码长** — 每切片后 `graphify update`；S0 创建文件后立即首次 update。
5. **不自动提交** — 全部切片与 MVP 验收通过后变更留工作区。
6. **谁启动谁清理** — Phase S 停止本会话验证服务。
7. **每次阶段结束须含**：风险警告 + 人工校验点。

## Phase G — Graph Engineering

若无现成切片计划，按 `graph-engineering-requirements` 输出：

- P0 功能与 Done 定义
- 目录/模块图
- S0…Sn 表（每行：范围 + 验证标准）

**空仓库注意**：S0 前 graphify 不可用属正常；S0 后必须 `graphify update .`。

## Phase L — Loop Engineering（循环）

对每个切片 **Sx**（按依赖序）：

1. **L0** `graphify query/affected` 定向本切片
2. **L1** 实现（仅 Sx）
3. **L2** 按 Done 标准验证（登记服务）
4. **L3** `graphify update` + `affected`
5. 记录切片报告；进入 Sx+1 或 Phase A

禁止在单轮对话中跳过验证宣称「后续切片已完成」—— 若上下文不足，汇报当前切片完成并给出下一切片输入模板。

## Phase A — MVP 整体验收

- 对照 PRD P0 清单逐项验证
- 全量构建/测试（项目惯例命令）
- `graphify affected` 扫关键入口
- 输出 MVP 验收报告

## Phase S — 停服释放

停止 Phase L/A 登记的所有本会话服务。

## 输出结构（最终汇报）

### 1. Graph Engineering 摘要（切片表）
### 2. 各切片完成状态表（Sx / Done / 证据）
### 3. MVP 验收报告
### 4. 未完成 backlog（P1+）
### 5. 风险警告（必填）
### 6. 人工校验点（必填）

## 关联 Skill

- 仅要计划 → `graph-engineering-requirements`
- 单片 only → `loop-engineering-slice`
- 0-1 + commit → `greenfield-graph-loop-commit`
