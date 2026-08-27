# 专家评审与落地参考

Agent 在 Phase 2 写评审、Phase 3 按意见落地时再读本文件。

---

## 1. 合格 vs 不合格的评审意见

### 1.1 合格（可直接改）

```markdown
**[结构职责]** `OrderService.java` `createOrder` ~L96
- 问题：方法内依次做库存校验、优惠计算、写订单、发 MQ，约 120 行
- 为什么：发 MQ 失败时回滚边界藏在过程代码里，后续加「预占库存」极易漏
- 改法：入口保持 `createOrder` 签名，提取 `validateStock`、`calcDiscount`、`persistOrder`、`publishCreatedEvent`；调用顺序与现网一致
- 行为影响：无（纯提取）
```

### 1.2 不合格（禁止这样写）

```markdown
- 代码质量不高，建议优化
- 这个方法有点长
- 加上注释会更好
- 按单一职责重构一下
- 不够优雅 / 不够工程化
```

缺位置、缺原因、缺改法的条目一律重写后再进入 Phase 3。

### 1.3 总体评价示例

- 好：「`importPapers` 主流程清楚，主要问题是校验与去重挤在一起、DOI 冲突分支没有说明为何 skip 而不是报错。值得小范围拆分，不需要动 API。」
- 差：「整体一般，建议全面重构。」

---

## 2. 评审维度检查清单

有问题才立项。全部通过时写「该维度无问题」，不要编造条目。

### 2.1 正确稳健

- 空指针/空集合是否只在「现网已如此」的路径上存在；新增防护会改变对外表现 → **Note**
- 流、连接、锁是否在现有成功/失败路径都释放（补 `finally`/try-with-resources 且顺序不变 → 可 Must）
- catch 后是否丢原始异常、是否把应失败变成成功
- 并发集合/共享可变状态是否明显误用（改语义 → Note；纯线程安全且行为等价 → 可 Must）

### 2.2 结构职责

命中任一条即可 Must/Should：

- 方法体超过 ~50 行，或嵌套超过 3 层
- 同时包含两类以上：校验 / 查询 / 转换 / 持久化 / 远程调用 / 响应组装
- 必须用「并且/然后」才能说清这个方法在做什么
- Controller/View 里出现业务规则或拼 SQL（按仓库既有分层纠正）

### 2.3 抽象重复

- 相同或近似逻辑出现 2 次以上，抽私有方法后调用点行为一致
- 只有一个实现的无意义接口/中间层 → Could 或建议删（若不影响对外 API）
- 过早抽象（为未来可能而引入的泛型/策略）→ 标过度设计，不扩 scope

### 2.4 命名意图

- 方法名是动词+宾语；布尔 `is/has/can`
- 同层不要混用 `get/fetch/load/query` 表达同一类读取
- 集合用复数或模块既有的 `*List`/`*Map`
- 名不副实必须改私有符号；公共签名禁止改

### 2.5 错误与日志

- 业务失败用项目既有业务异常/错误码，不新增另一种
- `catch` 必须记录或向上抛，禁止空 catch
- 日志含业务主键，不打印密钥
- 错误文案风格与同模块对齐

### 2.6 注释可读

必须出现在评审里的缺口：

- 对外 service/util/controller 公共方法无业务规则/失败语义
- 超过 15 行或含非显然规则的私有方法无说明
- 复杂算法、正则、第三方调用、兼容历史数据的分支无「为什么」

不要立项的：自解释的 `return x + 1`；复述函数名的注释（应删，而不是再加）

### 2.7 范式一致

先读同目录 2–3 个邻居文件。文件内两套写法时，向出现次数更多且与邻居一致的那套收敛。

- 卫语句早返回；失败路径先处理
- 魔法数字/状态字符串抽常量，放置位置与同模块一致
- 导入顺序与邻居一致，删除未使用 import

### 2.8 可测试性 / 过度设计

- 纯校验、映射、计分可拆成无 IO 的私有方法 → Should
- 为了「每一层都有接口」而增加的包装 → 不拆；已存在且无收益 → Could 标删除，谨慎落地

---

## 3. 业务注释与行内注释

写「业务含义」，不写「代码在干什么的字面翻译」。

### 3.1 业务注释（块注释）

**Java**

```java
/**
 * 按部署单执行远程发布：校验参数后连接主机，写入执行记录。
 * 仅处理「待发布」状态；已成功或已取消的单据直接拒绝。
 *
 * @param deployId 部署单 ID，必须属于当前项目
 * @return 本次执行的记录 ID
 * @throws BizException 单据不存在、状态不允许或远程执行失败
 */
public Long executeDeploy(Long deployId) { ... }
```

**JS/TS**

```javascript
/**
 * 批量导入论文：校验 → 去重 → 入库 → 可选 AI 分析。
 * analyze=false 时跳过分析，不影响入库结果。
 *
 * @param {Array} papers 待导入列表，元素需含 doi 或 title
 * @param {{ analyze?: boolean }} options
 * @returns {Promise<{ imported: number, skipped: number }>}
 */
async function importPapers(papers, options) { ... }
```

**Vue 方法**

```javascript
/**
 * 加载当前项目的部署历史，并按创建时间倒序展示。
 * 空列表保持表格可见，不跳转。
 */
async function loadDeployHistory() { ... }
```

**Python**

```python
def score_paper(paper: dict, rules: dict) -> float:
    """按配置权重计算论文综合分，返回 0–100。缺字段按 0 参与加权，不抛错。"""
```

### 3.2 行内注释

只注释「为什么」和业务分支。

```java
// 远端脚本超时视为失败而非重试：重复发布会覆盖制品
if (elapsedMs > REMOTE_TIMEOUT_MS) {
    markFailed(deployId, "remote timeout");
    return;
}

// 兼容历史数据：早期单据没有 env 字段，默认生产环境
String env = StringUtils.hasText(deploy.getEnv()) ? deploy.getEnv() : ENV_PROD;
```

```javascript
// 同一 DOI 以库内已有记录为准，避免覆盖人工修订的摘要
if (existingDois.has(paper.doi)) {
  skipped += 1
  continue
}
```

### 3.3 不要写的注释

```javascript
// 不好：返回 imported 和 skipped
return { imported, skipped }

// 不好：循环 papers
for (const paper of papers) { ... }
```

---

## 4. 单一职责拆分

公共入口保持原名与签名；内部只编排。副作用顺序与拆前一致。

### 4.1 拆分后形态

```javascript
/**
 * 批量导入论文：校验 → 去重 → 入库 → 可选 AI 分析
 */
async function importPapers(papers, options) {
  const valid = papers.map(validatePaper)
  const unique = dedupePapers(valid, await loadExistingDois())
  const imported = await persistPapers(unique)
  if (options.analyze) {
    await analyzePapers(imported)
  }
  return { imported: imported.length, skipped: papers.length - imported.length }
}

/** 校验单条论文必填字段，不通过则抛错 */
function validatePaper(paper) { ... }

/** 按 DOI 去重，返回可入库列表 */
function dedupePapers(papers, existingDois) { ... }

/** 将论文列表写入数据库 */
function persistPapers(papers) { ... }
```

### 4.2 Java 对照

```java
public Long executeDeploy(Long deployId) {
    DeployOrder order = loadDeployOrder(deployId);
    validateExecutable(order);
    DeployResult result = runRemoteDeploy(order);
    return persistDeployResult(order, result);
}

/** 仅校验单据是否允许执行 */
private void validateExecutable(DeployOrder order) { ... }

/** 仅负责远程发布并返回原始结果 */
private DeployResult runRemoteDeploy(DeployOrder order) { ... }

/** 仅负责把执行结果写入记录表 */
private Long persistDeployResult(DeployOrder order, DeployResult result) { ... }
```

### 4.3 方法粒度口诀

| 方法类型 | 只做一件事 |
|----------|------------|
| `validate*` | 校验，失败即返回/抛错 |
| `load*` / `find*` | 读取，不做变换 |
| `build*` / `map*` / `to*` | 转换/组装 |
| `persist*` / `save*` | 写入 |
| `run*` / `call*` | 外部副作用（SSH、HTTP、消息） |
| 原公共方法 | 按固定顺序编排上述步骤 |

---

## 5. 编码范式对齐

先读同目录 2–3 个邻居文件，再改当前文件。

### 5.1 控制流

- 卫语句早返回，减少 else 嵌套
- 失败路径先处理，成功路径放最后
- 禁止在新代码里引入比邻居文件更深的嵌套

### 5.2 常量

```java
private static final int REMOTE_TIMEOUT_MS = 30_000;
private static final String ENV_PROD = "prod";
```

状态、类型、开关字符串抽到常量或枚举，与同模块放置位置一致（类内常量 vs 独立 Constants 类）。

### 5.3 分层（按仓库既有结构对齐）

| 层 | 应有职责 | 不应出现 |
|----|----------|----------|
| Controller / Route | 参数接收、鉴权注解、调用 Service | 复杂业务、直接拼 SQL |
| Service | 业务编排与规则 | 大量 UI 文案拼接 |
| Mapper / Repo | 数据读写 | 业务流程判断（除非仓库已如此） |
| View / 页面 | 展示与交互 | 直接请求多个底层 API 拼业务（应走现有 api 模块） |

### 5.4 导入与文件头

与同目录文件保持同一顺序（如：静态/第三方 → 项目包 → 类型导入）。不把未使用的 import 留在文件里。
