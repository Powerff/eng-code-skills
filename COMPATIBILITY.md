# Compatibility — hosts & mainstream LLMs

[English](./COMPATIBILITY.md) · [中文](./COMPATIBILITY.zh-CN.md)

`eng-code-skills` is **prompt-based and model-agnostic**. Each skill is a self-contained folder (`SKILL.md` + `prompt.md` + `skill.json`). Any mainstream coding LLM that can follow structured instructions can run it.

This document explains **hosts** (where you load the skill) and **model families** (what answers).

---

## Supported model families

| Family | Typical products | Notes |
| --- | --- | --- |
| **OpenAI GPT** | GPT-4o / GPT-5 · ChatGPT · Codex | Strong structured output; use Projects / custom instructions or paste `prompt.md` |
| **Anthropic Claude** | Claude 4.x · Claude Code | Native Agent Skills / `~/.claude/skills/` |
| **Google Gemini** | Gemini 2.x · Gemini Code Assist | Paste `prompt.md` into Gems / system instructions |
| **DeepSeek** | DeepSeek Chat / Coder | Long-context coding; paste or Continue/Cline provider |
| **Qwen** | Qwen2.5 / Qwen3 · Tongyi | Same load path as other OpenAI-compatible APIs |
| **Moonshot Kimi** | Kimi / K2 | Long-context; paste or OpenAI-compatible gateway |
| **xAI Grok** | Grok | Paste `prompt.md` or route via compatible IDE agents |
| **Other** | Any tool-using coding LLM | Treat `prompt.md` as the system/skill body |

**Recommendation:** prefer **long-context, tool-using** models for workflow skills (`backend-implement-verify*`, `*-project-refactor`). Analysis skills (review / style / debt) work well on mid-size models too.

---

## Supported hosts / runtimes

| Host | How to load |
| --- | --- |
| **agentskills.io / Claude Code** | `npx agentskills load github:Powerff/eng-code-skills#skills/<name>` |
| **Cursor** | `Load skill from github:Powerff/eng-code-skills/skills/<name>` or copy into `.cursor/skills/` |
| **ChatGPT** | Create a Project / Custom GPT; paste `skills/<name>/prompt.md` (and `reference.md` if present) into instructions |
| **GitHub Copilot** | Add skill body to custom instructions / agent prompt, or paste `prompt.md` at session start |
| **Gemini** | Create a Gem / system prompt with `prompt.md` |
| **Continue** | Point a rule / prompt file at `prompt.md` (or symlink skill folder) |
| **Cline / Roo Code** | Custom mode / instructions: paste or reference `prompt.md` |
| **Windsurf / Trae** | Cascade / agent custom instructions: paste `prompt.md` |
| **manual-prompt** | Copy `prompt.md` into any chat; attach target code |

Every `skill.json` declares the same `compatibility` + `modelFamilies` lists for machine discovery.

---

## Universal load recipe (any LLM)

1. Open `skills/<skill-name>/prompt.md` (optionally also `SKILL.md` / `reference.md`).
2. Paste it as **system / custom instructions / agent skill body**.
3. Give the model the target (path, diff, or pasted code) and your constraints.
4. Require the skill’s mandatory sections — especially **风险警告** (risk warnings) and **人工校验** (manual checks).

```text
You must follow the skill prompt below exactly.
Target: <path or paste>
Constraints: <optional>

---
<paste prompt.md>
---
```

---

## What does *not* change by model

- Output contract (`summary` / risks / manual checks; plus `diff` when the skill produces code)
- Logic-safe defaults for analysis skills (no silent business-logic edits)
- Self-contained packages (no cross-skill file imports)

Model quality still varies: weaker models may skip phases or invent diffs — human review remains mandatory.

---

## Validate metadata locally

```bash
npm run validate
npm run validate:json
```

The validator requires every skill to declare the shared host + model-family lists.
