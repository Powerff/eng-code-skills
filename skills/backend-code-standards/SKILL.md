---
name: backend-code-standards
description: 交付平台后端（Java/Spring）全局编码规范：枚举与常量收拢、禁止 Map/Entity 对外、DTO/VO 分层、 Service 接口实现分离、JavaDoc/OpenAPI、单一职责与 Bean 拷贝约定。 Use when writing or reviewing backend code, adding APIs/DTO/VO/Entity/Service, or when user mentions 代码规范、编码规范、统一范式、DTO、VO、枚举、魔法值、@backend-code-standards。
license: MIT
metadata:
  version: "0.1.0"
  category: backend
  author: eng-code-skills
  source: cursor-skill:code-standards
---


# 后端全局编码规范

源自 `delivery-platform-backend/docs` 多轮代码审查意见的共性规则，写代码 / 改代码 / 评审时必须遵守。  
细则与正反例见 [reference.md](reference.md)。

与 `@backend-code-optimize` 的关系：本 Skill 是**规范本身**；`backend-code-optimize` 是「评审 → 按意见落地 → 验证」的流程。优化落地时以本规范为准。

---

## 何时启用

- 新增/修改 Controller、Service、DTO、VO、Entity、枚举
- 用户提到「按规范写」「统一范式」「对照评审意见」
- 代码评审或全局整改扫雷

---

## 硬性规则（必须）

### 1. 禁止魔法值

| 类型 | 做法 |
|------|------|
| 业务状态 / 类型码（`online`、`running`、`key`） | 收拢到 **枚举**（`code` + `desc`），业务里只用 `Enum.X.getCode()` |
| 提示文案（`"updated"`、`"xxx required"`） | 收拢到 **`BizMsgConstant`**（或项目等价常量类） |
| 业务错误码（裸 `400`） | 收拢到 **`BizCodeConstant`** / 错误码枚举 |
| 业务类内部私有 `STATUS_XXX = "..."` | **禁止**；不得再在各业务文件分散定义状态常量 |

### 2. 分层数据对象

| 场景 | 要求 |
|------|------|
| Controller 入参 | 独立 `dto/request` 类；**禁止** Controller 内部 static 请求类 |
| Controller → Service | **禁止** `Map<String, Object>` 透传；直接传 Request/DTO |
| Controller 出参 | **强制** VO；**禁止** `LinkedHashMap` / `Map` 组装业务返回 |
| 对外返回 | **禁止** 直接返回 Entity / `BizResult<Entity>` / `DataListVO<Entity>`；Entity → VO |
| Entity | 仅持久化层；敏感字段（私钥、密码密文）不得进 VO |

### 3. DTO / VO 形态

- 独立 `.java` 文件；包路径：`dto/request`、`dto/vo`（按项目既有包）
- **禁止 `@Data`**；统一 `@Getter` + `@Setter` + `@ToString`
- 类与字段必须 `@Schema(description = "...")`（面向 OpenAPI）
- 返回统一包装项目既有 `BizResult`（或等价）

### 4. Entity

- 每个字段写 `/** 业务含义 */`（或项目约定的 `@Comment`）
- Entity 用 JavaDoc；DTO/VO 用 `@Schema`（两种注释职责不要混用）

### 5. Service 分层

- 接口：只声明方法签名，**无业务实现、无 default 业务逻辑**
- 实现：全部业务放在 `*ServiceImpl`

### 6. 方法与注释

- **公有 + 私有**方法均需规范 JavaDoc（`/** */`，禁止只用 `//` 当方法说明）
- 至少说明：职责、`@param`、`@return`；有异常/边界则补 `@throws` / 注意事项
- 单一职责：一方法一事；长方法拆分，可读优先

### 7. 赋值与拷贝

- 同名字段优先 `BeanUtil` / `BeanUtils` 拷贝，差异字段再单独 `set`
- 类型类字段用枚举 `getCode()`，禁止 `"key"` 这类字面量

### 8. OpenAPI

- Controller 类：`@Tag(name, description)`
- 每个接口方法：`@Operation(summary, description)`（summary 短名，description 业务说明）
- 字段文档靠 DTO/VO 的 `@Schema`，不在 `@Operation` 里逐字段罗列

---

## 落地检查清单

改完或评审时逐项确认：

```
- [ ] 无散落状态/类型字符串；已用枚举
- [ ] 无裸错误码/提示文案；已用 Biz*Constant
- [ ] 无 Map 入参透传、无 Map 组装出参
- [ ] 无 Entity 直接对外；有对应 VO
- [ ] Request 独立文件；无 @Data；有 @Schema
- [ ] Entity 字段有注释
- [ ] Service 接口无业务实现
- [ ] 公有/私有方法均有 JavaDoc
- [ ] Controller 有 @Tag；方法有完整 @Operation
- [ ] 长方法已按单一职责拆分（若本次触及）
```

---

## 执行要求

1. **对齐现有范式**：常量类名、包名、Bean 工具以当前仓库已有代码为准（如已有 `BizMsgConstant` 则复用，不另起炉灶）
2. **最小改动**：只改触及范围；全局扫雷须分模块分批
3. **行为不变**：规范整改不得改变业务语义与 API 契约（除非用户明确要求改契约）
4. 需要正反例与改造模板时，读取 [reference.md](reference.md)

---

## 输出与收尾（eng-code-skills 统一）

完成工作流后，汇报中必须包含：

### 风险警告（必填）
列出未覆盖风险、不确定假设、可能影响生产的点；对修复/实现类任务，标明回归范围。

### 人工校验点（必填）
给出可执行检查清单（构建、接口、关键路径、停服/资源确认等）。

