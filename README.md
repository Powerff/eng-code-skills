# eng-code-skills

**标准化、可按需安装、前后端分离的 AI Agent 代码工程技能套件**

MIT Licensed · v0.1.0 · Compatible with [agentskills.io](https://agentskills.io) / Cursor / Claude Code

---

## 核心卖点

- ✅ **单 Skill 独立安装**，轻量即用，无需下载全套仓库
- ✅ **前后端分离专项规则**，不通用、不敷衍
- ✅ **零业务篡改**：安全重构，工程师放心用
- ✅ **标准 agentskills.io 规范**，Cursor / Claude Code 全适配

---

## English Overview

`eng-code-skills` is a suite of **12 self-contained Agent Skills** for style checks, safe refactors, tech-debt scans, and code reviews — split into **general / backend / frontend**. Every skill refuses silent business-logic changes and always emits **risk warnings + manual checklists**.

---

## 技能清单（12）

### 通用（General）

| Skill | 能力 |
| --- | --- |
| `code-style-check` | 通用规范与坏味道检测 |
| `code-refactor` | 通用安全重构（不改业务） |
| `tech-debt-scan` | 通用技术债务扫描 |
| `code-review` | 通用代码评审 |

### 后端（Java / Go / Python 等）

重点：事务、异常吞捕获、N+1、并发、资源泄露、硬编码密钥、参数校验、数据库风险

| Skill | 能力 |
| --- | --- |
| `backend-code-style-check` | 后端规范检查 |
| `backend-code-refactor` | 后端安全重构 |
| `backend-tech-debt-scan` | 后端技术债务扫描 |
| `backend-code-review` | 后端代码评审 |

### 前端（JS / TS / React / Vue）

重点：组件臃肿、状态滥用、副作用泄露、内存泄漏、Props、渲染冗余、样式耦合、Hooks 规范

| Skill | 能力 |
| --- | --- |
| `frontend-code-style-check` | 前端规范检查 |
| `frontend-code-refactor` | 前端安全重构 |
| `frontend-tech-debt-scan` | 前端技术债务扫描 |
| `frontend-code-review` | 前端代码评审 |

---

## 强制规则（所有 Skill）

1. **严禁修改业务逻辑**：只优化结构、命名、规范、重复与坏味道
2. **发现业务 Bug**：只标记风险，不自动修复
3. **每次输出必须包含**：风险警告 + 人工校验点
4. 后端技能优先：数据安全、事务、并发、资源释放
5. 前端技能优先：状态稳定、副作用可控、渲染性能

### 统一输出结构

1. 执行总结  
2. Diff 对比  
3. 完整新代码  
4. 风险警告（必填）  
5. 人工校验点（必填）

---

## 安装与使用

前置：**Node.js ≥ 18**

> 将下方 `Powerff/eng-code-skills` 替换为你的 fork 路径（如需要）。

### Claude Code（agentskills）

```bash
# 仅安装后端重构（推荐、轻量）
npx agentskills load github:Powerff/eng-code-skills#skills/backend-code-refactor

# 仅安装前端重构
npx agentskills load github:Powerff/eng-code-skills#skills/frontend-code-refactor

# 仅安装通用代码评审
npx agentskills load github:Powerff/eng-code-skills#skills/code-review

# 安装整套
npx agentskills load github:Powerff/eng-code-skills

# 查看 / 卸载
npx agentskills list
npx agentskills unload backend-code-refactor
```

### Cursor（远程即用）

在对话中加载单个技能，例如：

```text
Load skill from github:Powerff/eng-code-skills/skills/backend-code-refactor
Refactor this code, keep all business logic unchanged.
```

或将单个技能目录复制到项目 `.cursor/skills/`。

### 本地离线手动安装

1. `git clone https://github.com/Powerff/eng-code-skills.git`
2. 复制需要的单个 `skills/<name>/` 文件夹
3. 放到：
   - Claude Code：`~/.claude/skills/`
   - Cursor：项目目录 `.cursor/skills/`

---

## 单 Skill 目录结构

每个技能均为自包含单元（无跨技能依赖）：

```text
skills/<skill-name>/
├── SKILL.md      # agentskills.io / Cursor / Claude Code 入口
├── skill.json    # 元数据与入参出参 Schema
├── prompt.md     # 完整独立提示词
└── examples/     # 本技能演示案例
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
├── LICENSE
├── package.json
├── scripts/validate-skills.mjs
├── skills/          # 12 个独立技能
├── examples/        # 根级组合示例
└── .github/workflows/
```

---

## 示例

见 [`examples/`](./examples/) 与各技能目录下的 `examples/basic.md`。

---

## GitHub Topics（建议）

`ai-skill` `agent-skill` `engineering` `code-refactoring` `code-quality` `code-review` `llm-agent` `backend` `frontend` `java` `go` `python` `javascript` `typescript`

---

## 风险声明

本项目为 **AI 辅助工程工具**，所有重构、评审结果仅作为参考，存在 LLM 幻觉风险。**所有代码上线前必须人工评审 & 单元测试验证**。本项目不承担线上故障责任。

---

## License

[MIT](./LICENSE)
