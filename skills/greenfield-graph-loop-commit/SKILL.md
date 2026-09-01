---
name: greenfield-graph-loop-commit
description: 0-1 完整闭环：Graph Engineering → 多切片 Loop → MVP 验收 → commit/push → 停服。Use when greenfield commit, 0-1 提交, 需求实现并推送, @greenfield-graph-loop-commit。
license: MIT
metadata:
  version: "0.1.0"
  category: greenfield-workflow
  author: eng-code-skills
  source: cursor-skill:implement-verify-commit
---

# Greenfield Graph + Loop — 0-1 交付（含提交推送）

在 `greenfield-graph-loop` 基础上增加 **Phase C 提交推送**，形成从需求到远程的完整闭环。

```
- [ ] Phase G  Graph Engineering
- [ ] Phase L  Loop Engineering（S0…Sn）
- [ ] Phase A  MVP 整体验收
- [ ] Phase C  提交并推送代码
- [ ] Phase S  停止服务并释放资源
```

## 与 greenfield-graph-loop 的差异

| 项 | graph-loop | graph-loop-commit |
| --- | --- | --- |
| MVP 后 | 变更留工作区 | commit + push（用户说不要 push 时仅 commit） |
| 适用 | 试探 / 多轮迭代 | 交付上线 / 协作仓库 |

Phase G / L / A 规则与 `greenfield-graph-loop` **完全相同**。

## Phase C — 提交并推送（Git Safety）

**门禁**：Phase A MVP 验收全部通过后才可执行。

并行检查：

```bash
git status
git diff
git log --oneline -5
git branch -vv
```

- 禁止提交 `.env`、密钥、token
- diff 应覆盖本次 0-1 MVP 相关文件
- 若跟踪 `graphify-out/`，按项目惯例决定是否纳入 commit

```bash
git add <相关文件>
git commit -m "$(cat <<'EOF'
feat: <MVP 一句话>

<why：完成了 PRD 哪些 P0>
EOF
)"
git push -u origin HEAD   # 新分支首次
```

- 禁止 force push（除非用户明确要求）
- push 失败：汇报错误，**仍执行 Phase S**

用户明确「不要 push」→ 仅 commit，然后 Phase S。

## Phase S — 停服释放

与 `backend-implement-verify-commit` Phase 4 相同：只停本会话登记的服务。

## 输出结构（最终汇报）

### 1. Graph + 切片完成摘要
### 2. MVP 验收报告
### 3. 提交推送结果（hash / 分支 / 远程同步状态）
### 4. P1+ backlog
### 5. 风险警告（必填）
### 6. 人工校验点（必填）

## 关联 Skill

- 不提交 → `greenfield-graph-loop`
-  brownfield 单次需求 → `backend-implement-verify-commit`
