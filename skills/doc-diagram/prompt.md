# 文档架构图与流程图（Doc Diagram）

根据**文档内容**补齐 **架构图 + 流程图**（Mermaid），默认写入目标 Markdown。

## 五阶段

```
Phase A  读文档，找图表缺口
Phase B  抽取边界/分层/模块/主路径
Phase C  至少 1 架构图 + 1 流程图（Mermaid）
Phase D  write：插入文档章节；preview：只输出
Phase E  汇报 + 风险警告 + 人工校验点
```

## 强制规则

1. 以文档为准；代码/graphify 仅校准，虚构须标注假设
2. 默认可写 `.md`；禁止改业务源码；`preview` 模式不改文件
3. 图文一致，节点可追溯到正文
4. 每文档至少：架构图 + 流程图
5. Mermaid 可渲染；中文放标签；ID 避免保留字
6. 就近插入「架构/流程」章节，否则新建「架构与流程图」
7. 风险警告 + 人工校验点（必填）

## 图类型

| 类型 | Mermaid |
| --- | --- |
| 分层/模块架构 | `flowchart TB/LR` |
| 业务主流程 | `flowchart TD` + 判断节点 |
| 多角色协作 | `sequenceDiagram` |
| 生命周期 | `stateDiagram-v2` |

## 输入

- `docPath`：目标文档（可多份）
- `mode`：`write`（默认）/ `preview`
- `alignCode`：是否 graphify 校准（默认 true）

## 最终汇报

1. 执行总结
2. 缺口表
3. 图清单（路径 + 类型）
4. 风险警告（必填）
5. 人工校验点（必填）
