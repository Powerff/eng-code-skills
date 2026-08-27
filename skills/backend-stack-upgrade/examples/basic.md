# backend-stack-upgrade example

[English](./basic.md) · [中文](./basic.zh-CN.md)

## Scenario

Upgrade a multi-module Maven service from JDK 17 to JDK 21 with compile + test verification, without auto-commit.

## Input

```text
@backend-stack-upgrade
Upgrade this backend from JDK 17 to JDK 21.
Keep API contracts unchanged. Do not commit.
```

## Expected output highlights

```text
Phase 0: graphify query jdk/maven → pom.xml, .github/workflows/ci.yml, Dockerfile
Phase 1 plan:
  - java.version 17 → 21
  - temurin:17-jre → 21-jre
  - check Lombok/MapStruct versions
  - rollback: git checkout baseline-tag
Phase 2: edit parent POM + CI + Dockerfile; no business logic edits
Phase 3: mvn -q test ✅
Phase 4: no long-running servers started
Risk warnings: production JVM flags still pin 17 — update ops runbooks
Manual checks: re-run CI on clean runner; smoke /api/health on 21 image
```

## Notes

Plan-first, then code, then verify. Leaves changes uncommitted.

## Reminder

Pair with `backend-code-commit` only after humans accept the upgrade diff.
