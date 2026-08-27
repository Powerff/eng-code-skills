# 多模型使用示例

[English](./multi-llm.md) · [中文](./multi-llm.zh-CN.md)

同一技能在主流宿主 / 模型上的加载方式。完整矩阵见 [COMPATIBILITY.zh-CN.md](../COMPATIBILITY.zh-CN.md)。

## 1) ChatGPT（GPT-4o / GPT-5）

1. 创建 Project（或 Custom GPT）。
2. 将 `skills/backend-code-review/prompt.md` 粘贴进说明。
3. 上传或粘贴 PR diff / 文件。
4. 要求：「按技能输出结构作答，不要改业务逻辑。」

## 2) Claude Code / agentskills

```bash
npx agentskills load github:Powerff/eng-code-skills#skills/frontend-hooks-check
```

再按宿主语法对目标文件调用该技能。

## 3) Cursor

```text
Load skill from github:Powerff/eng-code-skills/skills/backend-api-layer-check
检查本模块 Controller/Service 分层边界。
```

## 4) Gemini Gem

把 `prompt.md` 贴进 Gem 系统指令，附上代码，并要求输出风险警告与人工校验点。

## 5) Continue / Cline / Roo / Windsurf / Trae

让自定义指令 / 模式指向本地仓库中的：

```text
skills/code-refactor/prompt.md
```

或每个会话粘贴一次全文。

## 6) DeepSeek / Qwen / Kimi / Grok（对话或 OpenAI 兼容 API）

与手动粘贴相同：

```text
你必须严格遵循下方技能提示词。
目标：src/service/OrderService.java

---
<粘贴 skills/backend-code-style-check/prompt.md>
---
```

## 提醒

无论使用何种模型，产出仅供参考；上线前必须人工评审与测试。
