# 示例：doc-diagram

## 场景

给描述了 Skill / Loop / Graph 三层、但没有配图的 SpecForge PRD 补充架构图与流程图。

## 输入

```text
@doc-diagram
文档：docs/prd-to-code-v1.0.md
模式：write
图类型：architecture, flowchart
对照代码：true
```

## 预期

1. **Phase A** — 发现架构章节缺图。
2. **Phase B** — 抽出三层架构与「读 PRD → 拆解 → 模块 Loop → 路由」主路径。
3. **Phase C** — 输出分层架构 Mermaid + 主流程 Mermaid。
4. **Phase D** — 写入文档「架构与流程图」或原有架构章节。
5. **Phase E** — 风险（文档与代码漂移）+ 人工预览校验点。

## 只预览不改文件

```text
@doc-diagram
文档：README.md
模式：preview
```

仅在对话中输出 Mermaid。

## Cursor 加载

```text
Load skill from github:Powerff/eng-code-skills/skills/doc-diagram
```

或复制到 `~/.cursor/skills/doc-diagram/`。
