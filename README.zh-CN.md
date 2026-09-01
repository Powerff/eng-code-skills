# eng-code-skills

[English](./README.md) · [中文](./README.zh-CN.md)

工程向 Agent Skills 套件：覆盖规范检查、安全重构、技术债务扫描、代码评审、**前端 Hooks / 组件审计**、**后端接口分层检查**、后端交付工作流，以及**前后端项目级重构**技能（链路分析 → 方案审查 → 编码 → CR → 测试闭环）。

兼容 **主流编码大模型**（GPT / Claude / Gemini / DeepSeek / Qwen / Kimi / Grok 等）以及 [agentskills.io](https://agentskills.io)、Cursor、Claude Code、ChatGPT、GitHub Copilot、Continue、Cline、Windsurf、Trae 等宿主。每个技能为自包含目录（`SKILL.md` + `skill.json` + `prompt.md` + 双语 `examples/`）。详见 [COMPATIBILITY.zh-CN.md](./COMPATIBILITY.zh-CN.md)。

**版本：** 0.2.3 · **协议：** [MIT](./LICENSE) · **Node.js：** ≥ 18 · **技能数：** 29 · [变更日志](./CHANGELOG.md) · [贡献指南](./CONTRIBUTING.md) · [兼容性](./COMPATIBILITY.zh-CN.md) · [Graph+Loop 0-1](./GRAPH-LOOP-ENGINEERING.zh-CN.md)

---

## 快捷跳转

- [通用](#通用) · [后端分析](#后端分析) · [后端工作流](#后端工作流) · [0-1 交付 Graph+Loop](#01-交付-graph--loop-engineering) · [前端](#前端)
- [怎么选技能](#怎么选技能) · [设计约束](#设计约束) · [安装](#安装) · [目录结构](#单技能目录结构) · [本地校验](#本地校验)
- [兼容性](./COMPATIBILITY.zh-CN.md)（[English](./COMPATIBILITY.md)） · [示例](./examples/README.zh-CN.md)（[English](./examples/README.md)） · [多模型](./examples/multi-llm.zh-CN.md)

| 跳转 | 技能 |
| --- | --- |
| [通用](#通用) | [`code-style-check`](./skills/code-style-check/) · [`code-refactor`](./skills/code-refactor/) · [`tech-debt-scan`](./skills/tech-debt-scan/) · [`code-review`](./skills/code-review/) |
| [后端分析](#后端分析) | [`backend-code-style-check`](./skills/backend-code-style-check/) · [`backend-code-refactor`](./skills/backend-code-refactor/) · [`backend-tech-debt-scan`](./skills/backend-tech-debt-scan/) · [`backend-code-review`](./skills/backend-code-review/) · [`backend-api-layer-check`](./skills/backend-api-layer-check/) |
| [后端工作流](#后端工作流) | [`backend-code-standards`](./skills/backend-code-standards/) · … · [`backend-stack-upgrade`](./skills/backend-stack-upgrade/) |
| [0-1 Graph+Loop](#01-交付-graph--loop-engineering) | [`graph-engineering-requirements`](./skills/graph-engineering-requirements/) · [`loop-engineering-slice`](./skills/loop-engineering-slice/) · [`greenfield-graph-loop`](./skills/greenfield-graph-loop/) · [`greenfield-graph-loop-commit`](./skills/greenfield-graph-loop-commit/) |
| [前端](#前端) | [`frontend-code-style-check`](./skills/frontend-code-style-check/) · [`frontend-code-refactor`](./skills/frontend-code-refactor/) · [`frontend-tech-debt-scan`](./skills/frontend-tech-debt-scan/) · [`frontend-code-review`](./skills/frontend-code-review/) · [`frontend-hooks-check`](./skills/frontend-hooks-check/) · [`frontend-component-audit`](./skills/frontend-component-audit/) · [`frontend-project-refactor`](./skills/frontend-project-refactor/) |

---

## 怎么选技能

| 目标 | 先用 | 可选深挖 |
| --- | --- | --- |
| 快速坏味道（任意栈） | `code-style-check` | 领域 `*-code-style-check` |
| 只做结构安全重构 | `code-refactor` / 领域 refactor | — |
| PR / 合入评审 | `code-review` 或领域 review | `backend-api-layer-check` / `frontend-hooks-check` |
| 债务盘点与排期 | `tech-debt-scan`（或领域） | 项目级 refactor |
| Java/Spring 编码规范 | `backend-code-standards` | `backend-api-layer-check` |
| 只查 DTO/VO/Entity 分层 | `backend-api-layer-check` | `backend-code-standards` |
| React/Vue Hooks 正确性 | `frontend-hooks-check` | `frontend-code-review` |
| 臃肿组件拆分方案 | `frontend-component-audit` | `frontend-code-refactor` |
| 有证据的 Bug 修复 | `backend-bug-fix` | — |
| 完整交付闭环 | `backend-implement-verify-commit` | `backend-code-standards` |
| 大型服务 / 前端迁移 | `backend-project-refactor` / `frontend-project-refactor` | — |
| JDK / 运行时 / 工具链升级（方案→改码→验证） | `backend-stack-upgrade` | 只出方案：`codebase-agent-kit` 的 `codebase-migration-plan` |
| **从需求 0-1 做新项目（PRD→MVP）** | `greenfield-graph-loop-commit` | 先要纯方案：`graph-engineering-requirements`；单片：`loop-engineering-slice` |

---

## 只出方案 vs 会改仓库

按这个表选 Skill（以及选哪一套 kit）。

### A) 默认只出报告 / 方案（不覆盖工作树）

产出检查结果、方案与示例 Diff。只有你**明确要求落地**时，才做结构级修改；仍禁止静默改业务语义。

| 类型 | Skills |
| --- | --- |
| 通用 | `code-style-check` · `code-refactor` · `tech-debt-scan` · `code-review` |
| 后端分析 | `backend-code-style-check` · `backend-code-refactor` · `backend-tech-debt-scan` · `backend-code-review` · `backend-api-layer-check` |
| 前端分析 | `frontend-code-style-check` · `frontend-code-refactor` · `frontend-tech-debt-scan` · `frontend-code-review` · `frontend-hooks-check` · `frontend-component-audit` |
| 规范 / 优化 | `backend-code-standards` · `backend-code-optimize` |
| 0-1 图谱定向 | `graph-engineering-requirements` |

**Cursor 用法：**

```text
Load skill from github:Powerff/eng-code-skills/skills/backend-api-layer-check
检查 src/main/java/... 的分层，只出报告，不要改文件。
```

**agentskills：**

```bash
npx agentskills load github:Powerff/eng-code-skills#skills/code-style-check
```

### B) 会改工作区（工作流）

按阶段改文件 / 跑命令。验证与清理规则不可跳过。是否 commit/push 以各 Skill 说明为准。

| Skill | 改代码？ | Commit/push？ |
| --- | --- | --- |
| `backend-bug-fix` | 会（修复路径） | 默认否 |
| `backend-implement-verify` | 会 | 否 |
| `backend-implement-verify-restart` | 会 | 否 |
| `backend-implement-verify-commit` | 会 | 是 |
| `backend-code-commit` | 仅提交相关 | 是 |
| `backend-project-refactor` | 会（方案审查后） | 按阶段 / 你的要求 |
| `frontend-project-refactor` | 会（方案审查后） | 按阶段 / 你的要求 |
| `backend-stack-upgrade` | 会（工具链+必要代码） | 否（再接 commit Skill） |
| `loop-engineering-slice` | 会（单切片 Sx） | 否 |
| `greenfield-graph-loop` | 会（多切片 MVP） | 否 |
| `greenfield-graph-loop-commit` | 会（多切片 MVP） | 是 |

**功能开发（不提交）：**

```text
@backend-implement-verify
实现 X，用测试/curl 验证，停掉你启动的服务。不要 commit。
```

**JDK 17→21 落地：**

```bash
npx agentskills load github:Powerff/eng-code-skills#skills/backend-stack-upgrade
```

```text
@backend-stack-upgrade
JDK 17 → 21。保持 API 契约。不要 commit。
```

**从 PRD 0-1 交付（含提交）：**

```text
@greenfield-graph-loop-commit
需求：docs/kit-prd-v1.0.md，按 Graph+Loop 做到 MVP 后 commit/push。
```

### C) 全仓只出方案 → codebase-agent-kit

[codebase-agent-kit](https://github.com/Powerff/codebase-agent-kit) 的 **8** 个 Skill **全部只出方案**（上下文、全局重构计划、债务、迁移、拆分、审计），禁止覆盖仓库。方案确认后再用上方 eng-code-skills 工作流落地。

---

## 设计约束

**分析 / 安全优化类**（style、refactor、debt、review、standards、optimize、hooks、component audit、API layer）：

1. 默认不改业务逻辑（除非技能流程明确允许已验证的修复路径）。
2. 业务 Bug 默认标记风险；仅在技能工作流允许时才修复（如 bug-fix）。
3. 每次输出必须包含 **风险警告** 与 **人工校验清单**。

**后端工作流类**（bug-fix、implement/verify、commit）：

1. 严格按阶段顺序执行，不跳过验证与清理。
2. 最小改动，对齐仓库既有约定。
3. 收尾仍须给出 **风险警告** 与 **人工校验**。

**项目重构类**（`backend-project-refactor`、`frontend-project-refactor`）：

1. 重构 ≠ 一比一搬运 — 先做调用链 / 交互链路分析再编码。
2. 五阶段 + 人工方案审查；Harness 成本上限（精读/修复/测试轮次）。
3. 决策写入 `clarifications.md`；每阶段输出风险与人工校验点。

领域侧重点：

- 后端分析：事务、并发、资源、数据安全、接口分层
- 前端：状态稳定、副作用、Hooks、组件边界、渲染性能
- 后端工作流：Java/Spring 规范、证据驱动修复、graphify 交付闭环
- 项目重构：归属图、GAP 表、分阶段迁移 + 测试闭环

---

## 技能

### 通用

| 技能 | 说明 |
| --- | --- |
| [`code-style-check`](./skills/code-style-check/) | 语言无关的规范与坏味道检测 |
| [`code-refactor`](./skills/code-refactor/) | 结构保持型安全重构 |
| [`tech-debt-scan`](./skills/tech-debt-scan/) | 项目级技术债务盘点 |
| [`code-review`](./skills/code-review/) | 通用代码评审 |

### 后端分析

重点：事务、异常吞捕获、N+1、并发、资源泄露、密钥、校验、DB 风险、**接口分层（DTO/VO/Entity）**。

| 技能 | 说明 |
| --- | --- |
| [`backend-code-style-check`](./skills/backend-code-style-check/) | 后端规范与风险清单 |
| [`backend-code-refactor`](./skills/backend-code-refactor/) | 后端结构保持型重构 |
| [`backend-tech-debt-scan`](./skills/backend-tech-debt-scan/) | 后端技术债务盘点 |
| [`backend-code-review`](./skills/backend-code-review/) | 后端向代码评审 |
| [`backend-api-layer-check`](./skills/backend-api-layer-check/) | Controller/Service + DTO/VO/Entity 边界检查 |

### 后端工作流

源自日常后端交付使用的 Cursor 技术技能；提示词内跨技能引用统一使用本仓库的 `backend-*` 名称。

| 技能 | 来源（Cursor） | 说明 |
| --- | --- | --- |
| [`backend-code-standards`](./skills/backend-code-standards/) | `code-standards` | Java/Spring 编码规范（DTO/VO、枚举、Service 分离、OpenAPI） |
| [`backend-code-optimize`](./skills/backend-code-optimize/) | `code-optimize` | 专家评审 → 行为不变优化 → 验证 |
| [`backend-bug-fix`](./skills/backend-bug-fix/) | `bug-fix` | 有证据定位根因后修复并验证 |
| [`backend-code-commit`](./skills/backend-code-commit/) | `code-commit` | 详细提交说明与安全 stage/commit/push |
| [`backend-implement-verify`](./skills/backend-implement-verify/) | `implement-verify` | graphify → 实现 → 验证 → 停服（不提交） |
| [`backend-implement-verify-commit`](./skills/backend-implement-verify-commit/) | `implement-verify-commit` | 含 commit/push 的完整闭环，再停服 |
| [`backend-implement-verify-restart`](./skills/backend-implement-verify-restart/) | `implement-verify-restart` | 验证 → 停会话服务 → 为用户重启（不提交） |
| [`backend-project-refactor`](./skills/backend-project-refactor/) | 服务重构方法论 | 调用链分析 → 方案审查 → 分层编码 → CR → 测试闭环 |
| [`backend-stack-upgrade`](./skills/backend-stack-upgrade/) | 技术栈 / JDK 升级 | 图谱 → 升级方案 → 工具链/代码 → 验证 → 停服（不自动提交） |

### 0-1 交付（Graph · Loop Engineering）

从**一份需求**把项目从 0 做到 MVP。方法论：[GRAPH-LOOP-ENGINEERING.zh-CN.md](./GRAPH-LOOP-ENGINEERING.zh-CN.md)

| 技能 | 说明 |
| --- | --- |
| [`graph-engineering-requirements`](./skills/graph-engineering-requirements/) | **Graph Engineering** — PRD → 图谱 query 计划、模块图、S0…Sn 切片表（只出方案） |
| [`loop-engineering-slice`](./skills/loop-engineering-slice/) | **Loop Engineering** — 单切片：定向 → 实现 → 验证 → graphify update → 停服 |
| [`greenfield-graph-loop`](./skills/greenfield-graph-loop/) | 编排器：G → 多片 L → MVP 验收 → 停服（不提交） |
| [`greenfield-graph-loop-commit`](./skills/greenfield-graph-loop-commit/) | 同上 + commit/push |

### 前端

重点：臃肿组件、状态滥用、副作用泄露、**Hooks**、Props、冗余渲染、样式耦合；以及项目级迁移。

| 技能 | 说明 |
| --- | --- |
| [`frontend-code-style-check`](./skills/frontend-code-style-check/) | 前端规范与风险清单 |
| [`frontend-code-refactor`](./skills/frontend-code-refactor/) | 前端结构保持型重构 |
| [`frontend-tech-debt-scan`](./skills/frontend-tech-debt-scan/) | 前端技术债务盘点 |
| [`frontend-code-review`](./skills/frontend-code-review/) | 前端向代码评审 |
| [`frontend-hooks-check`](./skills/frontend-hooks-check/) | React/Vue Hooks 与 Composition API 清单 |
| [`frontend-component-audit`](./skills/frontend-component-audit/) | 组件职责 / 可测性 / a11y 审计 |
| [`frontend-project-refactor`](./skills/frontend-project-refactor/) | 交互/数据链路分析 → 方案审查 → 迁移 → CR → 测试闭环 |

---

## 安装

技能 **与模型无关**：可将 `prompt.md` 粘贴到任意主流大模型，或通过下方宿主加载。完整矩阵：[COMPATIBILITY.zh-CN.md](./COMPATIBILITY.zh-CN.md) · 配方：[examples/multi-llm.zh-CN.md](./examples/multi-llm.zh-CN.md)。

### agentskills / Claude Code

```bash
# 单技能（示例）
npx agentskills load github:Powerff/eng-code-skills#skills/backend-implement-verify-commit
npx agentskills load github:Powerff/eng-code-skills#skills/backend-api-layer-check
npx agentskills load github:Powerff/eng-code-skills#skills/frontend-hooks-check

# 全量
npx agentskills load github:Powerff/eng-code-skills

npx agentskills list
npx agentskills unload backend-code-standards
```

### Cursor

```text
Load skill from github:Powerff/eng-code-skills/skills/frontend-component-audit
审计该页面组件，给出保持 UX 不变的拆分方案。
```

或将 `skills/<name>/` 复制到 `.cursor/skills/`。

### ChatGPT · Gemini · Copilot · Continue · Cline · Windsurf · Trae

1. 打开 `skills/<name>/prompt.md`（若有 `reference.md` 一并带上）。
2. 粘贴到 Project / Gem / 自定义指令 / Agent 模式提示词。
3. 提供目标代码或 diff，并要求输出 **风险警告** 与 **人工校验**。

### 通用手动提示（任意大模型）

```text
你必须严格遵循下方技能提示词。
目标：<路径或粘贴代码>
---
<粘贴 skills/<name>/prompt.md>
---
```

适用于 OpenAI GPT、Anthropic Claude、Google Gemini、DeepSeek、Qwen、Kimi、Grok 及其它工具调用型编码模型。

### 手动 / 离线

1. Clone 本仓库。
2. 复制所需 `skills/<name>/`（若有 `reference.md` 一并带上）。
3. 放到 `~/.claude/skills/`、`<project>/.cursor/skills/` 或宿主对应的 skills/rules 目录。
---

## 单技能目录结构

```text
skills/<skill-name>/
├── SKILL.md           # 运行时入口
├── skill.json         # 元数据 + I/O schema
├── prompt.md          # 独立提示词正文
├── reference.md       # 可选深参考（standards / optimize）
└── examples/
    ├── basic.md       # 英文
    └── basic.zh-CN.md # 中文
```

### 本地校验

```bash
npm run validate
npm run list-skills
npm run validate:json
```

新增技能见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

---

## 仓库布局

```text
eng-code-skills/
├── README.md
├── README.zh-CN.md
├── COMPATIBILITY.md
├── COMPATIBILITY.zh-CN.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
├── package.json
├── scripts/validate-skills.mjs
├── skills/                 # 24 个技能
├── examples/               # 组合示例 + 多模型示例
└── .github/workflows/      # CI 校验
```

---

## 免责声明

本项目仅为 AI 辅助工程指导，产出可能有误。上线前必须人工评审与测试。作者不对生产事故承担责任。

## 许可证

[MIT](./LICENSE)
