# eng-code-skills

[English](./README.md) · [中文](./README.zh-CN.md)

面向代码规范检查、安全重构、技术债务扫描与代码评审的 Agent Skills 套件。

兼容 [agentskills.io](https://agentskills.io) 规范，可用于 Cursor 与 Claude Code。每个技能独立打包，支持单技能安装或整套安装，并按 **通用 / 后端 / 前端** 分层组织。

**版本：** 0.1.0 · **协议：** [MIT](./LICENSE) · **Node.js：** ≥ 18

---

## 设计约束

所有技能遵循同一套操作规则：

1. 不修改业务逻辑。仅允许调整结构、命名、规范、重复代码与坏味道。
2. 发现业务 Bug 或逻辑错误时，仅标记风险，不自动修复。
3. 每次输出必须包含风险警告与人工校验清单。
4. 后端技能优先关注数据安全、事务、并发与资源生命周期。
5. 前端技能优先关注状态稳定、副作用可控与渲染性能。

### 输出格式

1. 执行总结  
2. Diff（纯扫描/评审且无代码变更时可写「无代码变更」）  
3. 完整更新后的代码（如适用）  
4. 风险警告（必填）  
5. 人工校验清单（必填）

---

## 技能列表

### 通用

| 技能 | 说明 |
| --- | --- |
| `code-style-check` | 语言无关的规范与坏味道检测 |
| `code-refactor` | 保持行为不变的结构重构 |
| `tech-debt-scan` | 项目级技术债务盘点 |
| `code-review` | 通用代码评审 |

### 后端（Java / Go / Python 等）

关注点：事务、异常吞捕获、N+1 查询、并发、资源泄露、硬编码密钥、入参校验、数据库风险。

| 技能 | 说明 |
| --- | --- |
| `backend-code-style-check` | 后端规范与风险检查 |
| `backend-code-refactor` | 后端行为保持型重构 |
| `backend-tech-debt-scan` | 后端技术债务盘点 |
| `backend-code-review` | 后端导向代码评审 |

### 前端（JavaScript / TypeScript / React / Vue）

关注点：组件臃肿、状态滥用、副作用泄露、内存泄漏、Props 校验、冗余渲染、样式耦合、Hooks 规范。

| 技能 | 说明 |
| --- | --- |
| `frontend-code-style-check` | 前端规范与风险检查 |
| `frontend-code-refactor` | 前端行为保持型重构 |
| `frontend-tech-debt-scan` | 前端技术债务盘点 |
| `frontend-code-review` | 前端导向代码评审 |

---

## 安装

### agentskills / Claude Code

```bash
# 单技能
npx agentskills load github:Powerff/eng-code-skills#skills/backend-code-refactor
npx agentskills load github:Powerff/eng-code-skills#skills/frontend-code-refactor
npx agentskills load github:Powerff/eng-code-skills#skills/code-review

# 整套
npx agentskills load github:Powerff/eng-code-skills

# 查看 / 卸载
npx agentskills list
npx agentskills unload backend-code-refactor
```

### Cursor

在对话中远程加载技能：

```text
Load skill from github:Powerff/eng-code-skills/skills/backend-code-refactor
Refactor this code, keep all business logic unchanged.
```

或将 `skills/<name>/` 复制到项目的 `.cursor/skills/` 目录。

### 手动 / 离线

1. 克隆本仓库。
2. 复制所需的 `skills/<name>/` 目录。
3. 放置到：
   - Claude Code：`~/.claude/skills/`
   - Cursor：`<project>/.cursor/skills/`

---

## 单技能目录结构

每个技能自包含，无跨技能依赖：

```text
skills/<skill-name>/
├── SKILL.md      # 运行时入口（agentskills.io / Cursor / Claude Code）
├── skill.json    # 元数据与入参/出参 Schema
├── prompt.md     # 独立提示词
└── examples/     # 技能内示例
```

本地校验：

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
├── skills/
├── examples/
└── .github/workflows/
```

更多用法说明见 [`examples/`](./examples/)。各技能目录下的 `examples/` 含对应示例。

---

## 免责声明

本项目提供 AI 辅助工程指导，输出可能包含模型错误或幻觉。所有建议仅供参考。上线前须经人工评审与自动化测试。因使用本技能导致的生产事故，作者不承担任何责任。

## 许可证

[MIT](./LICENSE)
