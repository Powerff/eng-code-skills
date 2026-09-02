# 示例：iteration-plan（brownfield）

## 场景

已有代码库，基于现状与上一版 PRD，规划下一迭代并输出 PRD。

## 输入

```text
Load skill from github:Powerff/eng-code-skills/skills/iteration-plan

@iteration-plan
项目根：./
基线 PRD：docs/kit-prd-v1.0.md
迭代版本：V1.1
输出：docs/kit-v1.1-prd.md
约束：
- P0：补 validate 脚本、2 个 plan-only Skill
- 不做破坏性 API 变更
- 2 周交付
```

## 预期输出要点

1. **Phase A** — 从 README、skills/、scripts/ 盘点现状。
2. **Phase B** — 与基线 PRD backlog、代码漂移对比。
3. **Phase C** — P0/P1 划分；非目标写清。
4. **Phase D** — 落盘 `docs/kit-v1.1-prd.md`，含模块、验收、≥2 条测试用例。
5. **Phase E** — 摘要 + 风险 + 人工校验点。
6. **交接** — 审阅后 `@graph-engineering-requirements` → `@greenfield-graph-loop`。

## SpecForge 示例

```text
@iteration-plan
基线：docs/prd-to-code-v1.0.md
输出：prd/specforge-v2.0.md
重点：CLI 参数、state 持久化、日志
```

审阅后可接 SpecForge `@prd-to-code`，或 `@greenfield-graph-loop`。

## Cursor 加载

```text
Load skill from github:Powerff/eng-code-skills/skills/iteration-plan
```

或复制到 `.cursor/skills/iteration-plan/`。

## 推荐链路

```
@iteration-plan  →  审阅 PRD  →  @graph-engineering-requirements  →  @greenfield-graph-loop
   规划 PRD            人工确认           图谱定向+切片                    落地 MVP
```
