# eng-code-skills

[English](./README.md) · [中文](./README.zh-CN.md)

工程向 Agent Skills 套件：覆盖规范检查、安全重构、技术债务扫描、代码评审，以及从 Cursor 技术技能封装的 **后端交付工作流**（编码规范、评审优化、问题修复、提交、实现/验证闭环）。

兼容 [agentskills.io](https://agentskills.io)、Cursor、Claude Code。每个技能为自包含目录（`SKILL.md` + `skill.json` + `prompt.md` + 双语 `examples/`）。

**版本：** 0.1.0 · **协议：** [MIT](./LICENSE) · **Node.js：** ≥ 18 · **技能数：** 19

---

## 快捷跳转

- [通用](#通用) · [后端分析](#后端分析) · [后端工作流](#后端工作流) · [前端](#前端)
- [设计约束](#设计约束) · [安装](#安装) · [目录结构](#单技能目录结构) · [本地校验](#本地校验)
- [示例](./examples/README.zh-CN.md)（[English](./examples/README.md)）

| 跳转 | 技能 |
| --- | --- |
| [通用](#通用) | [`code-style-check`](./skills/code-style-check/) · [`code-refactor`](./skills/code-refactor/) · [`tech-debt-scan`](./skills/tech-debt-scan/) · [`code-review`](./skills/code-review/) |
| [后端分析](#后端分析) | [`backend-code-style-check`](./skills/backend-code-style-check/) · [`backend-code-refactor`](./skills/backend-code-refactor/) · [`backend-tech-debt-scan`](./skills/backend-tech-debt-scan/) · [`backend-code-review`](./skills/backend-code-review/) |
| [后端工作流](#后端工作流) | [`backend-code-standards`](./skills/backend-code-standards/) · [`backend-code-optimize`](./skills/backend-code-optimize/) · [`backend-bug-fix`](./skills/backend-bug-fix/) · [`backend-code-commit`](./skills/backend-code-commit/) · [`backend-implement-verify`](./skills/backend-implement-verify/) · [`backend-implement-verify-commit`](./skills/backend-implement-verify-commit/) · [`backend-implement-verify-restart`](./skills/backend-implement-verify-restart/) |
| [前端](#前端) | [`frontend-code-style-check`](./skills/frontend-code-style-check/) · [`frontend-code-refactor`](./skills/frontend-code-refactor/) · [`frontend-tech-debt-scan`](./skills/frontend-tech-debt-scan/) · [`frontend-code-review`](./skills/frontend-code-review/) |

---

## 设计约束

**分析 / 安全优化类**（style、refactor、debt、review、standards、optimize）：

1. 默认不改业务逻辑（除非技能流程明确允许已验证的修复路径）。
2. 业务 Bug 默认标记风险；仅在技能工作流允许时才修复（如 bug-fix）。
3. 每次输出必须包含 **风险警告** 与 **人工校验清单**。

**后端工作流类**（bug-fix、implement/verify、commit）：

1. 严格按阶段顺序执行，不跳过验证与清理。
2. 最小改动，对齐仓库既有约定。
3. 收尾仍须给出 **风险警告** 与 **人工校验**。

领域侧重点：

- 后端分析：事务、并发、资源、数据安全
- 前端：状态稳定、副作用、渲染性能
- 后端工作流：Java/Spring 规范、证据驱动修复、graphify 导向交付闭环

---

## 技能列表

### 通用

| 技能 | 说明 |
| --- | --- |
| [`code-style-check`](./skills/code-style-check/) | 语言无关规范与坏味道检测 |
| [`code-refactor`](./skills/code-refactor/) | 行为保持型结构重构 |
| [`tech-debt-scan`](./skills/tech-debt-scan/) | 项目级技术债务盘点 |
| [`code-review`](./skills/code-review/) | 通用代码评审 |

### 后端分析

关注：事务、异常吞捕获、N+1、并发、资源泄露、密钥、校验、数据库风险。

| 技能 | 说明 |
| --- | --- |
| [`backend-code-style-check`](./skills/backend-code-style-check/) | 后端规范与风险检查 |
| [`backend-code-refactor`](./skills/backend-code-refactor/) | 后端行为保持型重构 |
| [`backend-tech-debt-scan`](./skills/backend-tech-debt-scan/) | 后端技术债务盘点 |
| [`backend-code-review`](./skills/backend-code-review/) | 后端导向代码评审 |

### 后端工作流

由 Cursor 日常技术技能封装而来；提示词内互引已统一为仓库内 `backend-*` 名称。

| 技能 | 来源（Cursor） | 说明 |
| --- | --- | --- |
| [`backend-code-standards`](./skills/backend-code-standards/) | `code-standards` | Java/Spring 编码规范（DTO/VO、枚举、Service 分层、OpenAPI） |
| [`backend-code-optimize`](./skills/backend-code-optimize/) | `code-optimize` | 专家评审 → 行为不变优化 → 验证 |
| [`backend-bug-fix`](./skills/backend-bug-fix/) | `bug-fix` | 先定位根因再修复并验证 |
| [`backend-code-commit`](./skills/backend-code-commit/) | `code-commit` | 详细提交说明与安全 commit/push |
| [`backend-implement-verify`](./skills/backend-implement-verify/) | `implement-verify` | graphify → 实现 → 验证 → 停服（不提交） |
| [`backend-implement-verify-commit`](./skills/backend-implement-verify-commit/) | `implement-verify-commit` | 含提交推送的完整闭环，再停服 |
| [`backend-implement-verify-restart`](./skills/backend-implement-verify-restart/) | `implement-verify-restart` | 验证 → 停本会话服务 → 重启给用户（不提交） |

### 前端

关注：组件臃肿、状态滥用、副作用泄露、Hooks、Props、冗余渲染、样式耦合。

| 技能 | 说明 |
| --- | --- |
| [`frontend-code-style-check`](./skills/frontend-code-style-check/) | 前端规范与风险检查 |
| [`frontend-code-refactor`](./skills/frontend-code-refactor/) | 前端行为保持型重构 |
| [`frontend-tech-debt-scan`](./skills/frontend-tech-debt-scan/) | 前端技术债务盘点 |
| [`frontend-code-review`](./skills/frontend-code-review/) | 前端导向代码评审 |

---

## 安装

### agentskills / Claude Code

```bash
# 单技能示例
npx agentskills load github:Powerff/eng-code-skills#skills/backend-implement-verify-commit
npx agentskills load github:Powerff/eng-code-skills#skills/backend-code-standards
npx agentskills load github:Powerff/eng-code-skills#skills/frontend-code-refactor

# 整套
npx agentskills load github:Powerff/eng-code-skills

npx agentskills list
npx agentskills unload backend-code-standards
```

### Cursor

```text
Load skill from github:Powerff/eng-code-skills/skills/backend-bug-fix
Reproduce the API failure, locate root cause, then fix with verification.
```

或将 `skills/<name>/` 复制到 `.cursor/skills/`。

### 手动 / 离线

1. 克隆本仓库。
2. 复制所需 `skills/<name>/`（若有 `reference.md` 一并复制）。
3. 放到 `~/.claude/skills/` 或 `<project>/.cursor/skills/`。

---

## 单技能目录结构

```text
skills/<skill-name>/
├── SKILL.md           # 运行时入口
├── skill.json         # 元数据与 I/O Schema
├── prompt.md          # 独立提示词正文
├── reference.md       # 可选细则（standards / optimize）
└── examples/
    ├── basic.md       # 英文
    └── basic.zh-CN.md # 中文
```

### 本地校验

```bash
npm run validate
npm run list-skills
```

---

## 仓库结构

```text
eng-code-skills/
├── README.md
├── README.zh-CN.md
├── LICENSE
├── package.json
├── scripts/validate-skills.mjs
├── skills/                 # 19 个技能
├── examples/               # 组合示例（中英）
└── .github/workflows/      # CI 校验
```

---

## 免责声明

本项目仅提供 AI 辅助工程指导，输出可能有误。上线前须人工评审与测试。作者不对生产事故承担责任。

## 许可证

[MIT](./LICENSE)
