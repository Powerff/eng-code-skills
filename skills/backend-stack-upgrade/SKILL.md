---
name: backend-stack-upgrade
description: 后端技术栈升级完整闭环：图谱定向 → 升级方案 → 编码落地 → 功能验证 → 停服释放。典型场景 JDK 17→21；会改仓库但不自动 commit/push。Use when JDK upgrade, Java 21, stack upgrade, 架构升级, 运行时升级, toolchain, @backend-stack-upgrade。
license: MIT
metadata:
  version: "0.1.0"
  category: backend-workflow
  author: eng-code-skills
---

# 图谱定向 → 升级方案 → 编码落地 → 功能验证 → 停服释放

面向**后端技术栈 / 运行时升级**（典型：JDK 17 → JDK 21；亦可用于语言小版本、构建工具链、兼容性受控的框架升级）的强制五阶段工作流。

**放在 eng-code-skills 的原因**：本 Skill **会改仓库文件并跑验证**。若只需迁移方案、不改代码，请改用 [codebase-agent-kit](https://github.com/Powerff/codebase-agent-kit) 的 `codebase-migration-plan`。

```
- [ ] Phase 0 图谱定向（graphify）
- [ ] Phase 1 升级方案（库存 + 破坏性变更 + 分阶段计划）
- [ ] Phase 2 编码落地（toolchain / 源码 / 配置 / CI）
- [ ] Phase 3 功能验证（构建 · 测试 · 冒烟）
- [ ] Phase 4 停止服务并释放资源
```

## 核心原则

1. **先图谱，再方案，再动手** — 未完成 Phase 0/1，禁止大面积改代码
2. **方案必须可回滚** — 标明基线标签/分支、回滚命令、兼容窗口
3. **最小有效变更** — 只改升级必需项；禁止借机做无关重构或「顺便」改业务
4. **行为与契约优先** — API / 数据语义 / 对外协议默认不变；若升级强制破坏，必须在方案中显式列出并征得确认
5. **自己跑验证** — 不得仅凭代码审查宣称升级成功
6. **不自动 commit / push** — 变更留在工作区；需要提交时另走 `backend-code-commit` / `backend-implement-verify-commit`
7. **谁启动谁清理** — 本会话为验证启动的进程，Phase 4 必须停止

## 适用范围（示例）

| 场景 | 例 |
| --- | --- |
| JDK / JVM | 17 → 21（本 Skill 主例） |
| 构建工具 | Maven/Gradle 插件与 `release`/`toolchain` 对齐 |
| 受控框架升级 | 与目标 JDK 强绑定且破坏面可控的依赖升级 |
| 非目标 | 纯前端大版本迁移（用 frontend 专项）；只出方案不落地（用 kit） |

---

## Phase 0：图谱定向（graphify）

**门禁**：本阶段未完成前，不得用 Read / Grep / Glob / Bash 做代码勘察（`graphify` 命令本身除外）。  
若项目无 `graphify` CLI 且无 `graphify-out/graph.json`，记录「图谱不可用」后跳过，直接 Phase 1。

```bash
graphify update .
graphify query "jdk java maven gradle toolchain"
graphify query "<当前版本关键词，如 java.version 17>"
graphify affected "pom.xml"
# 或其他构建入口：build.gradle.kts / .sdkmanrc / Dockerfile
```

产出：构建入口文件、模块列表、CI 镜像/版本文件、疑似 JNI/反射/内部 API 热点。

---

## Phase 1：升级方案（必须先于编码）

### 1.1 库存（Inventory）

确认并记录：

- 当前 / 目标运行时（例：`source=17` → `target=21`）
- 构建入口：`pom.xml` / `build.gradle*` / 父 POM / 多模块
- CI：GitHub Actions / Jenkins / Dockerfile base image
- 本地工具链：`.java-version` / `.sdkmanrc` / IDE 配置是否需提示
- 关键依赖：Spring Boot、ByteBuddy、Lombok、MapStruct、Mockito、Groovy 等与 JDK 敏感组件

### 1.2 破坏性变更与命中点（JDK 17→21 检查表）

至少覆盖（按仓库实际命中打勾）：

| 项 | 关注点 |
| --- | --- |
| `javac` / `--release` / `maven.compiler.release` | 统一到 21，避免混用 17 |
| 移除 / 封装的 JDK 内部 API | `sun.misc`、深层 reflection；补 `--add-opens` 仅作过渡 |
| 安全管理器 / 动态 Agent | JDK 21 限制变化，检查启动脚本 |
| 序列化 / 日期 / Locale | 行为差异回归 |
| 依赖 bytecode | 旧库不支持 21 class file 时需升级 |
| 容器基础镜像 | `eclipse-temurin:17` → `21` |
| 多模块 | 每个模块 `release` 一致 |

### 1.3 分阶段计划（写入汇报）

1. Toolchain / CI / Docker 先升，源码次之  
2. 编译通过 → 单测 → 集成 / 冒烟  
3. 明确回滚：切回基线 tag、还原镜像 tag  

**出口条件**：已输出「影响文件清单 + 风险 + 回滚 + 验证清单」。若目标版本/范围有歧义，先问用户，勿猜测。

---

## Phase 2：编码落地

仅在 Phase 1 方案明确后执行。

### 2.1 典型改动面（按需）

- Maven：`maven.compiler.release=21` / `java.version=21` / toolchain plugin  
- Gradle：`JavaLanguageVersion.of(21)` / toolchain  
- 包装脚本、`Dockerfile`、`docker-compose`、CI `matrix.java`  
- 因编译失败必须升级的依赖版本（记录原因）  
- 启动参数：`--add-opens` 等过渡项集中注释「JDK21 过渡」

### 2.2 禁止事项

- ❌ 无关业务需求开发  
- ❌ 静默改变 API 契约或数据含义  
- ❌ 删除测试来「让构建变绿」  
- ❌ 自动 `git commit` / `git push`

### 2.3 落地后

```bash
graphify update .
```

---

## Phase 3：功能验证

**必须实际执行**，禁止跳过。

### 3.0 启动服务登记

为验证启动的长驻进程记入会话清单（服务名 / 命令 / pid 或 port），供 Phase 4 清理。复用已有服务须标注「复用，不停」。

### 3.1 建议命令（按项目裁剪）

```bash
# Maven
mvn -v
mvn -q -DskipTests compile
mvn test

# Gradle
./gradlew -v
./gradlew classes test

# 运行时确认
java -version
```

容器项目：构建镜像并做健康检查 / 关键 API 冒烟。

### 3.2 验证报告（必填结构）

| 检查项 | 结果 | 说明 |
|--------|------|------|
| 图谱定向 | ✅/⏭ | |
| 升级方案 | ✅/❌ | 源→目标、破坏项 |
| Toolchain/CI | ✅/❌ | |
| 编译 | ✅/❌ | |
| 测试 | ✅/❌ | |
| 冒烟 | ✅/⏭ | |
| 会话启动清单 | ✅/⏭ | |

**未通过 → 回 Phase 2 修复 → `graphify update` → 重跑 Phase 3。不得跳过验证宣称完成。**

---

## Phase 4：停止服务并释放资源

只停本会话新启动进程；复用已有的不杀。优先 SIGTERM，再视情况 SIGKILL。确认端口释放后，在最终汇报中写明清理结果。

---

## 输出与收尾（eng-code-skills 统一）

每次结束必须包含：

### 风险警告（必填）

- 仍可能的运行时 / 依赖兼容风险  
- 过渡性 `--add-opens` 等技术债  
- 未覆盖的环境（生产 JVM 参数、native 镜像等）

### 人工校验点（必填）

- 在干净 CI 上再跑一遍  
- 预发环境用目标 JDK 镜像回归核心路径  
- 确认监控 / 启动脚本无硬编码 17  

### 执行总结

- 源版本 → 目标版本  
- 改动文件摘要  
- 验证证据（命令与结果）  
- 明确：**未自动提交**；需要入库时调用提交类 Skill  

## 与其它 Skill 的关系

| 需求 | Skill |
| --- | --- |
| 只要迁移方案 | `codebase-agent-kit` → `codebase-migration-plan` |
| 方案 + 改码 + 验证（本 Skill） | `backend-stack-upgrade` |
| 验证后还要 commit/push | 完成后接 `backend-code-commit` 或改用带提交的交付闭环 |
| 单文件规范/分层 | `backend-code-style-check` / `backend-api-layer-check` |
