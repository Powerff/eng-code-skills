# 后端项目重构 示例

[English](./basic.md) · [中文](./basic.zh-CN.md)

## 场景
演示五阶段项目重构工作流的期望产出。

## 输入

```text
对 project-config.md 中的老入口启用 backend-project-refactor。
严格五阶段；未审查方案不得编码。
```

## 期望产出要点

```text
- Phase 1：链路分析 + 方案 + 归属映射 + GAP 表
- Phase 2：澄清问题（≤5）写入 clarifications.md
- 人确认后才进入后续阶段
- 每阶段含风险警告与人工校验点
```

## 说明
先深挖调用链与归属映射，再编码。

## 提醒
方法论参考腾讯云开发者「服务重构 Skill」一文。上线前须人工评审。
