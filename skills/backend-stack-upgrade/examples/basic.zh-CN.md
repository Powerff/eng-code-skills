# backend-stack-upgrade 示例

[English](./basic.md) · [中文](./basic.zh-CN.md)

## 场景

将多模块 Maven 服务从 JDK 17 升级到 JDK 21，完成编译与测试验证，不自动提交。

## 输入

```text
@backend-stack-upgrade
把本后端从 JDK 17 升到 JDK 21。
保持 API 契约不变。不要 commit。
```

## 期望产出要点

```text
Phase 0：graphify 定位 pom / CI / Dockerfile
Phase 1 方案：
  - java.version 17 → 21
  - 镜像 temurin:17 → 21
  - 检查 Lombok/MapStruct
  - 回滚：回到 baseline tag
Phase 2：只改工具链与必要依赖，不改业务语义
Phase 3：mvn test 通过
Phase 4：无新启长驻服务则无需杀进程
风险警告：生产 JVM 参数仍可能写死 17
人工校验：干净 CI 重跑；21 镜像冒烟 /api/health
```

## 说明

先方案后改码再验证；变更留在工作区，不自动入库。

## 提醒

人工确认 diff 后再用 `backend-code-commit` 提交。
