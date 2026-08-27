---
name: backend-code-commit
description: 将当前工作区最新代码提交到 Git 仓库，并撰写详细的变更说明（按模块/文件逐项描述）。Use when user asks to commit code, push changes, write commit message, 提交代码、代码提交、提交到仓库、写提交说明、详细 commit、@backend-code-commit。
license: MIT
metadata:
  version: "0.1.0"
  category: backend
  author: eng-code-skills
  source: cursor-skill:code-commit
---


# Cursor 代码提交

把当前最新的代码提交到仓库，并添加详细的代码说明。

## 执行顺序

```
- [ ] Step 1 收集变更
- [ ] Step 2 撰写详细说明
- [ ] Step 3 安全检查与暂存
- [ ] Step 4 提交并推送
- [ ] Step 5 汇报结果
```

---

## Step 1：收集变更

**并行执行**以下命令，全面了解当前状态：

```bash
git status
git diff
git diff --staged
git log --oneline -8
git branch -vv
```

分析要点：

- 已修改 / 新增 / 删除的文件清单
- 每个文件的核心改动（功能、修复、配置、文档）
- 是否有多组独立改动（应否拆成多个 commit）
- 当前分支与远程跟踪关系

若 working tree 无改动，告知用户并停止，不创建空 commit。

---

## Step 2：撰写详细说明

### 2.1 标题（第一行）

格式：`<type>: <一句话概括>`

| type | 用途 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `refactor` | 重构（不改行为） |
| `chore` | 工具、脚本、CI、依赖 |
| `docs` | 文档 |
| `style` | 格式、样式（无逻辑变化） |
| `perf` | 性能优化 |

标题 ≤ 72 字符，聚焦 **why**，不写实现细节。

### 2.2 正文（详细代码说明）

正文必须按模块逐项说明，让读者不看 diff 也能理解改了什么、为什么改。

**模板：**

```markdown
<type>: <标题>

## 背景
<1-3 句：本次提交要解决的问题或实现的目标>

## 变更摘要
- <模块/领域>: <一句话>
- <模块/领域>: <一句话>

## 详细说明

### <模块名>（如 backend / frontend / deploy）
- `<文件路径>`: <做了什么、为什么>
- `<文件路径>`: <做了什么、为什么>

### <模块名>
- `<文件路径>`: <做了什么、为什么>

## 影响范围
- API / 数据库 / 前端页面 / 部署流程 等

## 注意事项
- 迁移步骤、环境变量、需重启的服务（无则写「无」）
```

**撰写要求：**

1. **逐文件说明** — 每个纳入 commit 的文件至少一行描述
2. **说人话** — 用业务语言，不只罗列文件名
3. **区分新增与修改** — 新文件标注「新增」，改动标注「修改」
4. **关联需求** — 若对话中有需求文档（如 `docs/v2.0.1.md`），正文引用对应条目
5. **多主题拆分** — 若 diff 含互不相关的改动，拆成多个 commit，每个 commit 一份详细说明

---

## Step 3：安全检查与暂存

### 3.1 禁止提交

以下文件/目录**不得**纳入 commit：

- `.env`、`.env.local` 及含密钥/token 的文件
- `node_modules/`、`venv/`、`__pycache__/`
- 构建产物（`dist/`、`build/`、`.next/`）
- IDE 本地配置（`.vscode/`、`.qoder/`）— 除非用户明确要求
- 临时导出（`exports/`）— 除非用户明确要求
- 二进制大文件、日志、dump

发现敏感内容时：从暂存区移除，警告用户，继续提交其余安全文件。

### 3.2 暂存

```bash
git add <文件1> <文件2> ...
# 或按目录
git add backend/src frontend/src docs/
```

暂存后再次 `git diff --staged` 确认与 Step 2 说明一致。

---

## Step 4：提交并推送

### 4.1 提交

使用 HEREDOC 写入完整说明：

```bash
git commit -m "$(cat <<'EOF'
feat: 一句话标题

## 背景
...

## 变更摘要
- ...

## 详细说明
...

## 影响范围
...

## 注意事项
...
EOF
)"
```

### 4.2 推送

commit 成功后 push 到远程：

```bash
git push
# 新分支首次推送
git push -u origin HEAD
```

推送规则：

- 使用普通 push，**禁止** force push，除非用户明确要求
- push 失败时汇报错误，不自动 force push

用户明确说「只 commit 不 push」时，跳过推送。

---

## Step 5：汇报结果

向用户输出：

```markdown
## 提交完成

- **Commit**: `<hash>` — `<标题>`
- **分支**: `<branch>` → `origin/<branch>`
- **文件数**: N 个文件，+X / -Y 行

### 变更概览
| 模块 | 文件 | 说明 |
|------|------|------|
| ... | ... | ... |

### 远程状态
✅ 已推送 / ⏸ 仅本地 commit
```

---

## 触发示例

| 用户输入 | 行为 |
|----------|------|
| `@backend-code-commit` | 提交当前全部安全改动 + 详细说明 + push |
| `把当前代码提交到仓库，写详细说明` | 同上 |
| `提交代码，不要 push` | commit + 详细说明，不 push |
| `只提交 backend 的改动` | 仅暂存 backend 相关文件 |

---

## 禁止事项

- ❌ 不分析 diff 就写笼统的「update files」
- ❌ 提交 `.env` 等敏感文件
- ❌ 把无关改动混在一个 commit 里
- ❌ 未经要求 force push
- ❌ 创建空 commit

---

## 输出与收尾（eng-code-skills 统一）

完成工作流后，汇报中必须包含：

### 风险警告（必填）
列出未覆盖风险、不确定假设、可能影响生产的点；对修复/实现类任务，标明回归范围。

### 人工校验点（必填）
给出可执行检查清单（构建、接口、关键路径、停服/资源确认等）。

