# Multi-LLM usage examples

[English](./multi-llm.md) · [中文](./multi-llm.zh-CN.md)

How to run the same skill on mainstream hosts/models. Full matrix: [COMPATIBILITY.md](../COMPATIBILITY.md).

## 1) ChatGPT (GPT-4o / GPT-5)

1. Create a Project (or Custom GPT).
2. Paste `skills/backend-code-review/prompt.md` into instructions.
3. Upload or paste the PR diff / file.
4. Ask: “Follow the skill output sections. Do not change business logic.”

## 2) Claude Code / agentskills

```bash
npx agentskills load github:Powerff/eng-code-skills#skills/frontend-hooks-check
```

Then mention `@frontend-hooks-check` (or the host’s skill invoke syntax) on the target files.

## 3) Cursor

```text
Load skill from github:Powerff/eng-code-skills/skills/backend-api-layer-check
Check Controller/Service boundaries in this module.
```

## 4) Gemini Gem

Paste `prompt.md` into the Gem system instructions, attach code, require risk warnings + manual checks.

## 5) Continue / Cline / Roo / Windsurf / Trae

Point custom instructions / mode prompt at a local checkout:

```text
skills/code-refactor/prompt.md
```

Or paste the file contents once per session.

## 6) DeepSeek / Qwen / Kimi / Grok (chat or OpenAI-compatible API)

Same as manual-prompt:

```text
You must follow the skill prompt below exactly.
Target: src/service/OrderService.java

---
<paste skills/backend-code-style-check/prompt.md>
---
```

## Reminder

Outputs are advisory. Human review and tests remain mandatory regardless of model.
