# Examples

[English](./README.md) · [中文](./README.zh-CN.md)

This directory shows how to compose `eng-code-skills` on demand. It does **not** replace the per-skill `examples/` directories.

## 1) Install a single backend refactor skill

```bash
npx agentskills load github:Powerff/eng-code-skills#skills/backend-code-refactor
```

Sample prompt:

```text
Use backend-code-refactor on OrderService.place():
- Structure-only changes
- Do not alter transactions or API responses
- Include risk warnings and a manual verification checklist
```

## 2) Combine frontend review + general tech-debt scan

```bash
npx agentskills load github:Powerff/eng-code-skills#skills/frontend-code-review
npx agentskills load github:Powerff/eng-code-skills#skills/tech-debt-scan
```

Review the PR first, then inventory debt for the same module. Neither skill should silently change business logic.

## 3) Install the full suite

```bash
npx agentskills load github:Powerff/eng-code-skills
```

Useful for a shared team baseline. Day-to-day work still benefits from loading one skill at a time to keep context smaller.

## 4) Cursor: load a single skill remotely

```text
Load skill from github:Powerff/eng-code-skills/skills/frontend-code-refactor
Split this React component without changing UX behavior.
```

## 5) Backend workflow skills

```bash
npx agentskills load github:Powerff/eng-code-skills#skills/backend-code-standards
npx agentskills load github:Powerff/eng-code-skills#skills/backend-implement-verify-commit
```

Use standards while writing APIs; use implement-verify-commit for a full delivery loop with graphify, verification, commit/push, and cleanup.

## 6) Project-level refactor (backend / frontend)

```bash
npx agentskills load github:Powerff/eng-code-skills#skills/backend-project-refactor
npx agentskills load github:Powerff/eng-code-skills#skills/frontend-project-refactor
```

Methodology: call/interaction-chain analysis → human plan review → implement → CR → test loop (adapted from [Tencent Cloud Developer article](https://mp.weixin.qq.com/s/kHpDP4yQoj5Vr0xGk2TDLg)).

## 7) Frontend Hooks + component audit

```bash
npx agentskills load github:Powerff/eng-code-skills#skills/frontend-hooks-check
npx agentskills load github:Powerff/eng-code-skills#skills/frontend-component-audit
```

Run Hooks checklist first on the hot path, then audit the page component for split boundaries. Neither skill should silently change UX behavior.

## 8) Backend API layering vs full standards

```bash
npx agentskills load github:Powerff/eng-code-skills#skills/backend-api-layer-check
npx agentskills load github:Powerff/eng-code-skills#skills/backend-code-standards
```

Use `backend-api-layer-check` for a fast DTO/VO/Entity boundary pass; use `backend-code-standards` when you need the full Java/Spring coding standards pack.

## 9) Same skill on ChatGPT / Gemini / Copilot / DeepSeek…

See [multi-llm.md](./multi-llm.md) ([中文](./multi-llm.zh-CN.md)) and the full matrix in [COMPATIBILITY.md](../COMPATIBILITY.md).

## Per-skill samples

Each skill ships bilingual samples under `skills/<name>/examples/`:

- `basic.md` — English
- `basic.zh-CN.md` — Chinese
