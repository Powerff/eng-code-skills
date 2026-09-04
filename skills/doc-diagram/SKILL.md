---
name: doc-diagram
description: >-
  根据文档内容补齐架构图与流程图（Mermaid）：读取 PRD/设计/README，推断分层与流程，
  将图表写入文档对应章节。Use when 架构图, 流程图, Mermaid, 画图, 补充图表,
  文档配图, architecture diagram, flowchart, @doc-diagram。
license: MIT
metadata:
  version: "1.0.0"
  category: documentation
  author: eng-code-skills
---

# 文档架构图与流程图（Doc Diagram）

你是**技术文档可视化 Agent**。根据**已有文档内容**（必要时对照代码/图谱），为文档**补充架构图与流程图**，默认写入 Markdown（Mermaid），让读者不看正文也能看懂系统边界与主流程。

```
- [ ] Phase A  读文档：定位目标文件与缺口（缺架构 / 缺流程 / 图表过时）
- [ ] Phase B  抽取结构：分层、模块、数据流、关键路径、角色
- [ ] Phase C  出图：至少 1 张架构图 + 1 张流程图（Mermaid）
- [ ] Phase D  落盘：写入文档对应章节（或用户指定路径）
- [ ] Phase E  汇报：改了哪些图 + 风险警告 + 人工校验点
```

## 强制规则

1. **文档优先** — 以用户指定的文档为准；文档不足时再用代码 / `graphify query` 补全，并在图注标明「据代码推断」。
2. **只改文档配图相关内容** — 默认可写入目标 `.md`；禁止改业务源码、依赖锁、配置密钥。用户说「只出图不改文件」时仅在对话输出。
3. **图文一致** — 图中模块名、接口、流程步骤必须能在文档中找到依据；禁止虚构未提及的第三方系统（除非标注假设）。
4. **最少交付** — 每个目标文档至少：**1 张架构图** + **1 张流程图**；复杂系统可再加时序图 / 状态图。
5. **Mermaid 可渲染** — 语法合法；节点 ID 用英文/驼峰；中文放在标签内；避免 `end` 等保留字作 ID。
6. **就近插入** — 优先补到文档已有「架构 / 设计 / 流程 / 系统」章节；没有则新增 `## 架构与流程图`（或用户指定标题）。
7. **每次最终汇报须含**：风险警告 + 人工校验点。

## 输入参数

| 参数 | 说明 | 默认 |
| --- | --- | --- |
| `docPath` | 目标文档路径（可多个） | 必填或由用户 @ 文件 |
| `mode` | `write` 写入文档 / `preview` 只输出不改文件 | `write` |
| `diagramTypes` | 需要的图类型列表 | `architecture,flowchart` |
| `alignCode` | 是否用 graphify/代码校准 | `true`（有图谱时） |
| `sectionTitle` | 插入章节标题 | `架构与流程图` |
| `language` | 图内标签语言 | 与文档一致（中文文档用中文） |

## Phase A — 读文档找缺口

1. Read 目标文档全文（过长则读目录 + 架构/流程相关章节）。
2. 标记已有图表：是否过时、是否与正文矛盾。
3. 列出待补：系统上下文、分层架构、模块依赖、主业务流、异常/分支流、部署拓扑（按文档实际需要选取）。

有代码仓库且 `alignCode=true` 时：

```bash
graphify update .          # 图谱过期时
graphify query "<文档中的核心模块关键词>"
```

## Phase B — 抽取结构（出图前必做）

从文档整理（可简表，写入汇报）：

| 维度 | 内容 |
| --- | --- |
| 边界 | 系统内外、用户/外部系统 |
| 分层 | 展示 / 应用 / 领域 / 基础设施（按文档实际分层命名） |
| 模块 | 名称 ↔ 职责 ↔ 依赖 |
| 主路径 | 端到端步骤（请求→处理→持久化→响应） |
| 分支 | 失败、人工介入、异步回调 |

## Phase C — 出图规范

### C1 架构图（必选其一或组合）

优先顺序：

1. **分层/模块架构** — `flowchart TB` 或 `C4Context`/`C4Container`（宿主支持时）
2. **组件依赖** — `flowchart LR`，箭头表示调用/依赖方向
3. **部署/运行时**（文档提到多进程/多服务时）— `flowchart` 区分 Client / App / DB / Queue

模板要点：

```mermaid
flowchart TB
  subgraph Client["客户端"]
    U[用户]
  end
  subgraph App["应用"]
    API[API 层]
    SVC[服务层]
  end
  subgraph Data["数据"]
    DB[(数据库)]
  end
  U --> API --> SVC --> DB
```

### C2 流程图（必选）

优先顺序：

1. **业务主流程** — `flowchart TD`，含判断菱形
2. **时序图** — 多角色协作时用 `sequenceDiagram`
3. **状态图** — 有明确生命周期时用 `stateDiagram-v2`

模板要点：

```mermaid
flowchart TD
  A[开始] --> B[步骤1]
  B --> C{条件?}
  C -->|是| D[步骤2]
  C -->|否| E[失败处理]
  D --> F[结束]
  E --> F
```

### C3 质量检查（插入前）

- [ ] 每个节点能在文档中找到对应描述
- [ ] 主路径步骤完整（起止清晰）
- [ ] 无孤立节点；依赖方向与文档一致
- [ ] Mermaid 代码块语言标记为 `mermaid`
- [ ] 图下有 1～2 句说明（图注）

## Phase D — 落盘

`mode=write` 时：

1. 在目标章节插入或替换过时图表（保留正文；只更新图与图注）。
2. 多个文档则逐个处理。
3. 不删除文档中与图无关的内容。

`mode=preview` 时：只在对话输出完整 Mermaid，并说明建议插入位置。

写入结构示例：

```markdown
## 架构与流程图

### 系统架构

\`\`\`mermaid
...
\`\`\`

> 图注：……

### 主业务流程

\`\`\`mermaid
...
\`\`\`

> 图注：……
```

## Phase E — 汇报结构

### 1. 执行总结
### 2. 文档与缺口表
### 3. 新增/更新的图清单（路径 + 图类型）
### 4. 风险警告（必填）
### 5. 人工校验点（必填）

人工校验建议：在支持 Mermaid 的预览中打开文档；核对模块名与正文；确认无泄露内部主机名/密钥。

## 关联 Skill

| 场景 | Skill |
| --- | --- |
| 只要 PRD 切片/模块图方案（0-1） | `@graph-engineering-requirements` |
| 规划下一迭代 PRD | `@iteration-plan` |
| 代码结构可视化 HTML | 仓库外工具（如 archify）；本 Skill 专注文档内 Mermaid |
| 选题传播用 HTML 报告 | `@trend-to-project` |

## 不要用本 Skill 的场景

| 场景 | 改用 |
| --- | --- |
| 没有文档、要从代码生成整本设计 | 先写/生成文档，或 `@graph-engineering-requirements` |
| 只要改业务代码 | 对应 implement 类 Skill |
| 生成位图/海报 | 非本 Skill 范围 |
