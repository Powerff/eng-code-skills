---
name: loop-engineering-slice
description: Loop Engineering 单切片闭环：图谱定向 → 实现本切片 → 验证 → graphify update → 停服。基于一份切片计划执行一个 Sx，不自动 commit。Use when loop engineering, MVP slice, 单切片, 实现一片, @loop-engineering-slice。
license: MIT
metadata:
  version: "0.1.0"
  category: greenfield-workflow
  author: eng-code-skills
---

# Loop Engineering — 单切片闭环

**Loop Engineering** 最小循环单元：对一个 **MVP 切片（Sx）** 完成 Graph→Implement→Verify→Refresh→Stop，不提交。

```
- [ ] L0 切片确认 & 图谱定向（graphify）
- [ ] L1 实现本切片
- [ ] L2 验证本切片
- [ ] L3 graphify update & affected 复查
- [ ] L4 停止服务并释放资源
```

## 强制规则

1. **单切片范围** — 只完成当前 Sx；禁止顺手做下一切片或无关重构。
2. **先图谱再动手** — L0 未完成禁止 Read/Grep 全库勘察（graphify 除外）；空仓库 S0 后必须 `graphify update`。
3. **验证实证** — 必须跑命令/接口/构建；禁止「看起来没问题」。
4. **失败回环** — L2 失败 → 回 L1；结构变化后先 `graphify update` 再重验。
5. **不自动提交** — 变更留工作区；提交用 `greenfield-graph-loop-commit` 或 `backend-implement-verify-commit`。
6. **谁启动谁清理** — L4 必须停掉本会话为验证启动的服务。
7. **每次输出必须包含**：风险警告 + 人工校验点。

## L0 切片确认 & 图谱定向

输入须明确：**切片编号 Sx、范围、Done 标准**（来自 `graph-engineering-requirements` 或用户）。

```bash
graphify update .
graphify query "<本切片关键词>"
graphify affected "<本切片将改动的符号>"   # brownfield
```

书面记下：本切片文件清单、入口、依赖、风险。

## L1 实现本切片

- 匹配项目既有风格；最小 diff
- S0 典型内容：`package.json`、目录、`README` 骨架、健康检查/空 CLI
- S1+ 典型内容：一条可演示的纵向能力

## L2 验证本切片

按切片 Done 标准执行（构建、curl、单测、手测路径）。登记启动的服务供 L4 清理。

## L3 graphify update

```bash
graphify update .
graphify affected "<本切片核心符号>"
```

确认图谱与代码一致；记录波及节点供下一切片参考。

## L4 停服释放

对照会话启动清单停止进程；确认端口释放。

## 输出结构

### 1. 切片报告（Sx、Done 是否达成）
### 2. 改动清单
### 3. 验证报告表
### 4. 下一切片建议（仅建议，不实现）
### 5. 风险警告（必填）
### 6. 人工校验点（必填）

## 关联 Skill

- 需求图谱 → `graph-engineering-requirements`
- 多切片编排 → `greenfield-graph-loop`
