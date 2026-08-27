# 示例

[English](./README.md) · [中文](./README.zh-CN.md)

本目录演示如何按需组合使用 `eng-code-skills`，**不替代**各技能目录内的 `examples/`。

## 1) 只安装一个后端重构技能

```bash
npx agentskills load github:Powerff/eng-code-skills#skills/backend-code-refactor
```

对话示例：

```text
使用 backend-code-refactor 重构 OrderService.place()：
- 只做结构优化
- 不要改变事务与接口返回
- 输出必须含风险警告与人工校验点
```

## 2) 前端评审 + 通用债务扫描（多技能组合）

```bash
npx agentskills load github:Powerff/eng-code-skills#skills/frontend-code-review
npx agentskills load github:Powerff/eng-code-skills#skills/tech-debt-scan
```

先评审 PR，再对同一模块做债务台账；两者都不应自动改业务逻辑。

## 3) 全量安装

```bash
npx agentskills load github:Powerff/eng-code-skills
```

适合团队统一基线；个人日常仍建议按需加载单个技能，以节省上下文。

## 4) Cursor：远程加载单技能

```text
Load skill from github:Powerff/eng-code-skills/skills/frontend-code-refactor
Split this React component without changing UX behavior.
```

## 5) 后端工作流技能

```bash
npx agentskills load github:Powerff/eng-code-skills#skills/backend-code-standards
npx agentskills load github:Powerff/eng-code-skills#skills/backend-implement-verify-commit
```

写接口时启用编码规范；完整交付闭环使用 implement-verify-commit（含 graphify、验证、提交推送与清理）。

## 各技能示例

每个技能目录下提供双语示例 `skills/<name>/examples/`：

- `basic.md` — 英文
- `basic.zh-CN.md` — 中文
