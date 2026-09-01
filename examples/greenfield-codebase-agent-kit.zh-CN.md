# 落地案例：codebase-agent-kit（PRD → 0-1 代码）

[English](./greenfield-codebase-agent-kit.md) · 中文

用真实 PRD 与已上线仓库 [Powerff/codebase-agent-kit](https://github.com/Powerff/codebase-agent-kit)，演示 **Graph Engineering + Loop Engineering** 如何从 0 做到可验证 MVP。

**PRD 来源：** `docs/kit-prd-v1.0.md`  
**使用 Skill：** `graph-engineering-requirements` → `greenfield-graph-loop-commit`  
**交付结果：** v0.1.0 — 8 个 plan-only Skill、校验脚本、双语 README、CI

---

## 1. PRD → P0 范围

| PRD 章节 | v0.1.0 P0 |
| --- | --- |
| §3.2 目录结构 | `skills/` × 8、`scripts/validate-skills.mjs`、`examples/`、`docs/` |
| §4 全部 Skill | 8 个自包含目录（SKILL.md + prompt.md + skill.json + examples） |
| §5 全局规则 | 每个 prompt/SKILL 写入同一套强制规则 |
| §6 安装文档 | 中英 README、usage 文档 |
| §1.5 非目标 | 不做 Web 服务、不做会改仓库的 Skill |

**不做（v0.1.0）：** v0.2 数据库 Schema Skill、v0.3 多项目上下文。

---

## 2. Phase G — 图谱工程（切片计划）

| 切片 | 范围 | Done 标准 |
| --- | --- | --- |
| **S0** | 仓库骨架 | `package.json`、`LICENSE`、`validate-skills.mjs`、`npm run validate` 可跑 |
| **S1** | 第一个 Skill 纵向打通 | `codebase-context-builder/` 完整且校验通过 |
| **S2** | 通用类 3 个 | global-refactor、tech-debt-audit、migration-plan |
| **S3** | 后端 2 个 | backend-codebase-audit、backend-module-split |
| **S4** | 前端 2 个 | frontend-codebase-audit、frontend-module-split |
| **S5** | 文档与 CI | README 中英、`docs/usage-*.md`、GitHub Actions |
| **S6** | MVP 验收 | 8 Skill 全过 validate，与 PRD 技能表一致 |

**S0 完成后执行：** `graphify update .`（空仓库在 S0 之前无图谱）。

---

## 3. 可复制 Cursor 对话

### 步骤 0 — 可选：先要纯方案

```text
Load skill from github:Powerff/eng-code-skills/skills/graph-engineering-requirements

PRD：docs/kit-prd-v1.0.md
项目：codebase-agent-kit，代码库级、只出方案的 Agent Skills。
技术栈：Node 18、agentskills.io 目录规范。只输出 S0–S6 切片表。
```

### 步骤 1 — 完整 0-1（含提交）

```text
Load skill from github:Powerff/eng-code-skills/skills/greenfield-graph-loop-commit

需求：docs/kit-prd-v1.0.md
目标目录：./codebase-agent-kit（新仓库）
MVP：v0.1.0 — 8 个 plan-only Skill、validate 脚本、双语 README。
按 S0→S6 切片执行，每片后 npm run validate。
MVP 通过后 commit 并 push。
```

### 步骤 2 — 只跑一切片（断点续做）

```text
@loop-engineering-slice
切片 S3：按 PRD §4.2 实现 backend-codebase-audit、backend-module-split。
Done：列入 EXPECTED 且 npm run validate 通过。
```

---

## 4. Phase L — 各切片实际产出

| 切片 | 主要交付物 |
| --- | --- |
| S0 | `package.json`、`LICENSE`、`scripts/validate-skills.mjs` |
| S1 | `skills/codebase-context-builder/` 五件套 |
| S2 | `codebase-global-refactor/`、`codebase-tech-debt-audit/`、`codebase-migration-plan/` |
| S3 | `backend-codebase-audit/`、`backend-module-split/` |
| S4 | `frontend-codebase-audit/`、`frontend-module-split/` |
| S5 | `README.md`、`README.zh-CN.md`、`docs/`、`.github/workflows/` |
| S6 | PRD 技能表与 `npm run list-skills` 一致（8 个） |

**单 Skill 目录模板：**

```text
skills/<name>/
├── SKILL.md
├── prompt.md
├── skill.json
└── examples/basic.md + basic.zh-CN.md
```

**PRD §5 必填话术：** 全局优先 · 严禁修改业务逻辑 · 风险警告 · 人工校验 · 只出方案不执行

---

## 5. Phase A — MVP 验收

```bash
cd codebase-agent-kit
npm run validate
npm run list-skills
graphify update .
graphify query "backend-codebase-audit"
```

| 检查项 | 预期 |
| --- | --- |
| Skill 数量 | 8 |
| 行为 | 全部 plan-only，prompt 禁止覆盖仓库 |
| 依赖 | prompt.md 无 `../` 跨 Skill 引用 |
| README | 中英双语，agentskills + Cursor 安装说明 |

---

## 6. MVP 之后 — 双套件工作流（PRD §11）

```
codebase-agent-kit（全局方案）→ eng-code-skills（改码+验证）→ codebase-agent-kit（全局复检）
```

示例：

```text
Load skill from github:Powerff/codebase-agent-kit/skills/codebase-migration-plan
本仓库 Spring Boot 2→3，只出迁移方案。

然后：
@backend-stack-upgrade
按已确认方案落地，先不要 commit。
```

---

## 7. 经验（下一个 PRD 可复用）

1. **先 Graph 再 Loop** — 切片表避免「一次 diff 塞 8 个 Skill」。
2. **S0 后再 graphify** — 空仓库无图；骨架落地后立刻 `graphify update`。
3. **校验器即门禁** — `EXPECTED` 数组是 Skill 数量的唯一真相源。
4. **元 Skill vs 业务代码** — 本 PRD 产的是 Prompt 套件；业务项目同样用 S0–Sn，但 S1+ 写业务逻辑。

---

## 风险警告

- 模型可能跳过切片间 validate — 每片强制 `npm run validate`。
- 从 eng-code-skills 拷贝模板时须改路径与 plan-only 表述。
- plan-only Skill 与改码工作流混用时须用户明确授权。

## 人工校验点

- [ ] 每个 Skill 有双语 examples
- [ ] CI 在 push 时跑 validate
- [ ] README 技能表与 EXPECTED 一致
- [ ] Cursor 试载：`Load skill from github:Powerff/codebase-agent-kit/skills/codebase-context-builder`
