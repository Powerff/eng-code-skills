# 根级示例（Examples）

本目录演示如何按需组合使用 `eng-code-skills`，**不替代**各技能目录内的 `examples/`。

## 1) 只装一个后端重构技能

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

先评审 PR，再对同一模块做债务台账；两者都**不自动改业务逻辑**。

## 3) 全量安装

```bash
npx agentskills load github:Powerff/eng-code-skills
```

适合团队统一基线；个人日常仍建议单技能按需加载以节省上下文。

## 4) Cursor 远程单技能

```text
Load skill from github:Powerff/eng-code-skills/skills/frontend-code-refactor
Split this React component without changing UX behavior.
```
