# 兼容性 — 宿主与主流大模型

[English](./COMPATIBILITY.md) · [中文](./COMPATIBILITY.zh-CN.md)

`eng-code-skills` 是 **基于提示词、模型无关** 的技能包。每个技能都是自包含目录（`SKILL.md` + `prompt.md` + `skill.json`）。只要大模型能遵循结构化指令，即可使用。

本文说明 **宿主**（在哪里加载）与 **模型族**（由谁作答）。

---

## 支持的模型族

| 模型族 | 常见产品 | 说明 |
| --- | --- | --- |
| **OpenAI GPT** | GPT-4o / GPT-5 · ChatGPT · Codex | 结构化输出强；用 Project / 自定义 GPT，或粘贴 `prompt.md` |
| **Anthropic Claude** | Claude 4.x · Claude Code | 原生 Agent Skills / `~/.claude/skills/` |
| **Google Gemini** | Gemini 2.x · Gemini Code Assist | 粘贴到 Gem / 系统指令 |
| **DeepSeek** | DeepSeek Chat / Coder | 长上下文编码；粘贴或经 Continue/Cline |
| **Qwen** | Qwen2.5 / Qwen3 · 通义 | 与其它 OpenAI 兼容 API 同路径加载 |
| **Moonshot Kimi** | Kimi / K2 | 长上下文；粘贴或经兼容网关 |
| **xAI Grok** | Grok | 粘贴 `prompt.md` 或经 IDE Agent |
| **其它** | 任意工具调用型编码模型 | 将 `prompt.md` 作为系统 / 技能正文 |

**建议：** 工作流类技能（`backend-implement-verify*`、`*-project-refactor`）优先用 **长上下文 + 工具调用** 模型；分析类（评审 / 规范 / 债务）中等规模模型通常也够用。

---

## 支持的宿主 / 运行时

| 宿主 | 加载方式 |
| --- | --- |
| **agentskills.io / Claude Code** | `npx agentskills load github:Powerff/eng-code-skills#skills/<name>` |
| **Cursor** | `Load skill from github:Powerff/eng-code-skills/skills/<name>` 或复制到 `.cursor/skills/` |
| **ChatGPT** | 建 Project / Custom GPT；把 `prompt.md`（及可选 `reference.md`）贴进说明 |
| **GitHub Copilot** | 写入自定义指令 / Agent Prompt，或会话开头粘贴 `prompt.md` |
| **Gemini** | 创建 Gem / 系统提示并粘贴 `prompt.md` |
| **Continue** | 规则 / prompt 文件指向 `prompt.md` |
| **Cline / Roo Code** | 自定义模式 / 指令：粘贴或引用 `prompt.md` |
| **Windsurf / Trae** | Cascade / Agent 自定义指令：粘贴 `prompt.md` |
| **manual-prompt** | 复制 `prompt.md` 到任意对话，并附上目标代码 |

每个 `skill.json` 都声明同一套 `compatibility` + `modelFamilies`，便于机器发现。

---

## 通用加载配方（任意大模型）

1. 打开 `skills/<skill-name>/prompt.md`（可选同时参考 `SKILL.md` / `reference.md`）。
2. 将其粘贴为 **系统提示 / 自定义指令 / Agent 技能正文**。
3. 提供目标（路径、diff 或粘贴代码）与约束。
4. 要求模型遵守技能强制章节 — 尤其是 **风险警告** 与 **人工校验**。

```text
你必须严格遵循下方技能提示词。
目标：<路径或粘贴代码>
约束：<可选>

---
<粘贴 prompt.md>
---
```

---

## 不因模型而改变的部分

- 输出契约（`summary` / 风险 / 人工校验；有代码产出时含 `diff`）
- 分析类技能的默认「行为不变」（禁止静默改业务逻辑）
- 技能包自包含（无跨技能文件依赖）

模型能力仍有差异：弱模型可能跳步或幻觉 diff — **人工评审始终必须**。

---

## 本地校验元数据

```bash
npm run validate
npm run validate:json
```

校验器要求每个技能声明统一的宿主与模型族列表。
