---
name: backend-implement-verify-restart
description: 按「图谱定向 → 实现需求 → 验证功能 → 停止服务释放资源 → 重启服务」的强制五阶段工作流执行开发任务，验证通过后先停掉本会话验证进程，再按项目惯例重启服务并留给用户继续使用，不自动 commit / push。Use when user asks to implement features then restart services, or mentions 实现需求、验证功能、重启服务、写完再验再重启、开发后拉起服务、@backend-implement-verify-restart。
license: MIT
metadata:
  version: "0.1.0"
  category: backend
  author: eng-code-skills
  source: cursor-skill:implement-verify-restart
---


# 图谱定向 → 实现 → 验证 → 停服释放 → 重启服务

严格执行五阶段顺序，**不可跳步、不可颠倒**。未通过验证阶段，不得宣称完成，不得进入重启。未完成图谱定向，禁止盲目用 Read/Grep/Glob 勘察代码。验证通过后，必须先停止本会话为验证而启动的服务并释放资源，再按项目惯例重启服务，确认健康后结束本 Skill。

**本 Skill 不包含提交与推送**：验证通过、停服并完成重启后汇报结果并停止；仅当用户另行明确要求时，再走 `backend-code-commit` / `backend-implement-verify-commit` 等提交类流程。

```
- [ ] Phase 0 图谱定向（graphify）
- [ ] Phase 1 实现需求
- [ ] Phase 2 验证功能
- [ ] Phase 3 停止服务并释放资源
- [ ] Phase 4 重启服务
```

## 核心原则

1. **先图谱，再动手** — 有 graphify 的项目必须先更新/查询知识图谱，再实现；图谱给出跨文件依赖与推断边，比直接 grep 更完整
2. **先实现，后验证，再停服，最后重启** — 验证通过后必须执行 Phase 3，再执行 Phase 4；不得跳过验证、停服或重启
3. **自己跑验证** — 必须实际执行命令或调用接口，不得仅凭代码审查宣称通过
4. **失败则回退** — 验证失败回到 Phase 1 修复；若修复改了代码结构，先 `graphify update` 再重新验证
5. **最小改动** — 只改需求相关文件，匹配项目既有风格与约定
6. **到验证、停服与重启为止** — 禁止自动 `git commit` / `git push`；变更留在工作区，由用户决定是否提交
7. **谁启动谁清理，清理后再交付运行态** — 本会话为验证启动的进程在 Phase 3 必须停止；Phase 4 再拉起的服务是交付给用户的，**不得在本 Skill 结束时杀掉**

---

## Phase 0：图谱定向（graphify）

**门禁**：本阶段未完成前，不得用 Read / Grep / Glob / Bash 做代码勘察（`graphify` 命令本身除外）。  
若项目无 `graphify` CLI 且无 `graphify-out/graph.json`，记录「图谱不可用」后跳过本阶段，直接 Phase 1，并在汇报中说明。

### 0.1 确保图谱可用

在仓库根目录执行：

```bash
# 图谱不存在或明显过期时：AST 增量更新（无 API 费用）
graphify update .

# 若 graphify-out/graph.json 已存在且刚更新过，可跳过 update，直接 0.2
```

出口：`graphify-out/graph.json` 存在且可读。

### 0.2 按需求查询影响面

用需求关键词跑图谱查询（可并行多条）：

```bash
graphify query "<需求/功能/模块关键词>"
graphify explain "<核心概念或符号>"
# 已知两端符号时：
graphify path "<符号A>" "<符号B>"
# 评估改动波及面时：
graphify affected "<拟改符号或文件名>"
```

若存在 `graphify-out/wiki/index.md`，优先按 wiki 导航；仅在 query/path/explain 不够时再读 `graphify-out/GRAPH_REPORT.md`。

### 0.3 产出定向结论（再进入 Phase 1）

书面记下（可简短）：

- 相关文件 / 符号列表
- 上下游依赖与建议改动入口
- 风险点（`affected` 指出的波及节点）

生成子 agent 且涉及代码探索时：必须在子 agent prompt 中写明「先 graphify query/explain，再 Read/Grep」。

### 0.4 Phase 0 出口条件

- [ ] 已确认图谱可用，或已明确记录「图谱不可用」并跳过原因
- [ ] 已用 query / explain / path / affected 至少一种完成定向
- [ ] 已列出拟读文件与影响面，再进入 Phase 1

---

## Phase 1：实现需求

### 1.1 理解需求

开始前明确：

- 要改什么（功能 / Bug / 接口 / 页面）
- 成功标准（用户可见行为、API 响应、数据变化）
- 影响范围（backend / frontend / corporate-web / prisma / scripts / agent-service 等）

有歧义时先问用户，不要猜测关键业务逻辑。

### 1.2 精读代码（图谱已定向之后）

仅针对 Phase 0 列出的文件做 Read（必要时再 Grep 补细节）：

- 同类功能的现有实现（路由、服务、组件、配置）
- 数据模型（如 `backend/prisma/schema.prisma`）
- 环境变量与中间件（auth、internalAuth 等）

禁止跳过 Phase 0 直接全库搜索。

### 1.3 实现

- 复用已有函数与模式，避免重复造轮子
- 不做需求外的重构或过度抽象
- 改完立即检查 linter（`ReadLints` 针对改动文件）

### 1.4 实现后刷新图谱

代码文件有改动后，在进入 Phase 2 之前执行：

```bash
graphify update .
```

保持图谱与代码一致，供验证阶段的 `affected` 使用。图谱不可用时跳过并注明。

### 1.5 Phase 1 出口条件

- [ ] 所有需求点均有对应代码改动
- [ ] 改动文件无新增 linter 错误
- [ ] 已执行 `graphify update .`（或已注明跳过原因）
- [ ] 能说明「改了什么、为什么这样改」

---

## Phase 2：验证功能

**必须实际执行验证**，禁止跳过。根据改动类型选择验证手段。

### 2.0 启动服务时登记（供 Phase 3 清理、Phase 4 重启）

为验证而启动任何长驻进程时，**当场记入会话启动清单**（可写在回复草稿或内部笔记中），至少包含：

| 字段 | 示例 |
|------|------|
| 服务名 | backend / frontend / agent-service / docker compose |
| 启动命令 | `npm run dev` / `uvicorn ...` / `docker compose up -d` |
| 标识 | PID、Shell `shell_id`、compose 项目名、监听端口 |
| 启动方式 | 前台后台 / `block_until_ms: 0` / compose 分离模式 |
| 健康检查 | `curl -s http://localhost:3001/api/health` |

规则：

- **只登记本会话新启动的服务**；进入任务前已在跑的服务不要记入、也不要在 Phase 3 杀掉
- 若复用已有服务（未新启动），在清单中标注「复用已有，Phase 3 不停止；Phase 4 视热重载情况决定是否重启」
- 验证过程中每启动一个，就追加一条，避免事后遗忘
- 启动命令与健康检查必须写清，供 Phase 4 原样复用

### 2.1 影响面复查（有 graphify 时）

```bash
graphify affected "<本次改动的核心符号或文件>"
```

将输出中的关键邻居纳入回归关注点（不必对每个节点都测，但高风险路径要覆盖）。

### 2.2 通用验证清单

| 检查项 | 做法 |
|--------|------|
| 语法 / 类型 | 对改动文件跑 `ReadLints` |
| 服务能启动 | 相关 `dev` / 启动命令，确认无 crash（并按 2.0 登记） |
| API 行为 | `curl` 调用接口，核对 status code 与响应体 |
| 前端构建 | `cd frontend && npm run build`（若改了前端） |
| 数据库 | 若改 schema，执行 `db:push` / `db:generate` 并确认无报错 |
| 回归 | 结合 `affected` 结果，确认未破坏相邻功能（auth、分页、已有 CRUD 等） |

### 2.3 本项目常用验证命令

```bash
# 后端健康检查
curl -s http://localhost:3001/api/health

# Internal 接口（需 INTERNAL_API_KEY）
curl -s -X POST http://localhost:3001/api/internal/import-papers \
  -H "Content-Type: application/json" \
  -H "x-internal-key: $INTERNAL_API_KEY" \
  -d '{"papers":[],"analyze":false}'

# 前端构建
cd frontend && npm run build

# Prisma 同步
cd backend && npm run db:generate && npm run db:push
```

端口、密钥以项目 `.env` 为准；服务未启动时先启动再测（启动后按 2.0 登记）。

### 2.4 验证结果记录

```markdown
## 验证报告

| 检查项 | 结果 | 说明 |
|--------|------|------|
| 图谱定向 | ✅/⏭ | Phase 0 已完成 / 已跳过（原因） |
| graphify update | ✅/⏭ | 实现后已刷新 / 已跳过 |
| affected 复查 | ✅/⏭ | ... |
| linter | ✅/❌ | ... |
| 服务启动 | ✅/❌ | ... |
| 功能点 A | ✅/❌ | ... |
| 会话启动清单 | ✅/⏭ | 已登记 N 个 / 未新启服务 |

**结论**：通过 / 未通过（未通过时列出待修复项，回到 Phase 1；修代码后须再 `graphify update`）
```

### 2.5 Phase 2 出口条件

- [ ] 每个需求点都有对应的验证证据（命令输出或接口响应）
- [ ] 验证报告结论为「通过」
- [ ] 无已知阻塞性 Bug
- [ ] 本会话新启服务已记入启动清单（或明确「无新启服务」）
- [ ] **尚未**向用户宣称「全部完成」——须先进入 Phase 3 停服，再进入 Phase 4 重启

**未通过 → 修复 → `graphify update`（若改了代码）→ 重新跑 Phase 2，不得进入 Phase 3 / 4。**

---

## Phase 3：停止服务并释放资源

仅在 Phase 2 结论为「通过」后执行。目标：先清掉本会话验证进程，再进入 Phase 4 用最新代码重新拉起。

**不要在此结束本 Skill。**

### 3.1 按启动清单逐项停止

对 Phase 2.0 登记的「本会话新启动」条目，按相反顺序停止：

```bash
# 1) 本 Agent 用 Shell 后台拉起的进程：用 terminal 元数据中的 pid 结束
kill <pid> 2>/dev/null || true
# 仍未退出时再温和强杀（仅针对本会话登记的 pid）
kill -9 <pid> 2>/dev/null || true

# 2) docker compose 本会话拉起的栈
docker compose -f <compose文件> down
# 或按项目名：docker compose -p <project> down

# 3) 已知端口仍被本会话进程占用时，核对 pid 归属后再结束
lsof -i :<port> -sTCP:LISTEN
```

停止原则：

- **只停清单内本会话启动的进程**；标注「复用已有」的一律不杀（交给 Phase 4 决定是否重启）
- 优先优雅退出（`SIGTERM` / `compose down`），数秒无响应再用 `SIGKILL`
- 不要 `kill -9` 无关的系统进程或用户其他终端里的服务
- 若清单为空（验证未新启任何服务），记录「无需停服」并跳过杀进程，仍进入 Phase 4

### 3.2 确认资源已释放

对清单中的端口 / 服务名做快速确认，例如：

```bash
# 端口应不再监听（或仍由「复用已有」的进程占用）
lsof -i :3001 -sTCP:LISTEN || echo "port 3001 free"
lsof -i :3000 -sTCP:LISTEN || echo "port 3000 free"
```

若停止失败：在汇报中写明残留 pid/端口与手动清理建议；端口仍被本会话进程占用时，不得进入 Phase 4 强行再启（会端口冲突）。

### 3.3 停服结果记录

```markdown
## 资源释放报告

| 服务 | 标识 (pid/port) | 操作 | 结果 |
|------|-----------------|------|------|
| backend | pid 12345 / :3001 | kill | ✅ 已停止 |
| frontend | 复用已有 | 跳过 | ⏭ 未动 |

**结论**：资源已释放 / 部分残留（附手动命令）
```

### 3.4 Phase 3 出口条件

- [ ] 已对照会话启动清单处理每一项（停止或明确跳过）
- [ ] 已做端口 / 进程确认（或注明无需确认）
- [ ] **尚未**向用户宣称完成——必须进入 Phase 4 重启

---

## Phase 4：重启服务

仅在 Phase 3 完成后执行。目标：用**最新代码**把项目相关服务重新拉起来，健康检查通过后**留给用户继续使用**，本 Skill 结束时不得再杀掉这些进程。

### 4.1 确定重启范围

按以下优先级决定要重启哪些服务（只重启本次改动相关的栈，不要把无关服务全拉起来）：

1. **会话启动清单里本会话新启过的服务** — 用 2.0 记录的同一条启动命令、同一工作目录、同一端口重新拉起
2. **清单中标注「复用已有」的服务** — 若进程已热重载（nodemon / vite HMR 等）且已加载本次改动，可跳过；否则先停再启，确保跑的是新代码
3. **清单为空，但改动了会跑在服务里的代码** — 按项目惯例启动对应栈（`package.json` 的 `dev` / `start`、`docker compose up -d`、README 启动命令）；端口与密钥以 `.env` 为准

不要重启：

- 与本次改动无关的第三方 / 系统服务
- 用户明确说「不要重启」的服务（记录跳过原因）

### 4.2 启动并登记交付运行清单

在后台启动（Shell `block_until_ms: 0` 或 compose 分离模式），**当场记入交付运行清单**：

| 字段 | 示例 |
|------|------|
| 服务名 | backend / frontend |
| 启动命令 | 与 Phase 2.0 相同，或项目惯例命令 |
| 标识 | 新 PID、`shell_id`、compose 项目名、监听端口 |
| 健康检查 | 与 2.0 相同的 curl / 页面探测 |

这些条目是交付给用户的，**不纳入 Phase 3 那种「谁启动谁清理」杀进程范围**。

### 4.3 等待健康再确认

启动后做短轮询，确认进程还在、端口在听、健康检查通过。例如：

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/api/health
lsof -i :3001 -sTCP:LISTEN
lsof -i :3000 -sTCP:LISTEN
```

规则：

- 优先复用 Phase 2 已验证过的健康检查命令
- 数秒内未起来：看启动日志；失败则修复启动命令后重试一次
- 仍失败：在汇报中写明失败服务、日志要点、手动启动命令，不阻塞其余已成功服务的交付
- 不要用超长空等代替健康检查

### 4.4 重启结果记录

```markdown
## 服务重启报告

| 服务 | 标识 (pid/port) | 操作 | 健康检查 | 结果 |
|------|-----------------|------|----------|------|
| backend | pid 23456 / :3001 | 重新拉起 | /api/health 200 | ✅ 运行中 |
| frontend | 复用已有 + HMR | 跳过 | — | ⏭ 热重载已生效 |

**结论**：已重启并留给用户 / 部分失败（附手动命令）
```

### 4.5 验证通过后汇报（含停服与重启）

Phase 4 完成后，向用户汇报并**结束本 Skill**：

- 简述改动摘要（改了什么、为什么）
- 附上验证报告（结论为「通过」）
- 附上资源释放报告
- 附上服务重启报告（端口、URL、pid / 启动命令）
- 说明 Phase 0 图谱定向是否执行
- 明确变更仍在工作区，**未** commit / push；如需提交可再用 `@backend-code-commit` 或 `@backend-implement-verify-commit`
- 明确 Phase 4 拉起的服务**仍在运行**，不要在汇报后再杀

### 4.6 Phase 4 出口条件

- [ ] 已按 4.1 处理每一项（重启、热重载跳过、或失败已汇报）
- [ ] 已做健康检查 / 端口确认（或注明跳过原因）
- [ ] 已向用户汇报，且未执行 commit / push
- [ ] 最终汇报中包含资源释放结果与重启结果
- [ ] Phase 4 拉起的进程仍在运行

---

## 触发示例

| 用户输入 | 执行方式 |
|----------|----------|
| `@backend-implement-verify-restart 给 internal 加 xxx 接口` | Phase 0→1→2→3→4，验证通过后停服再重启 |
| `实现 XX 功能并验证，然后把服务拉起来` | 完整五阶段，不 commit，含停服与重启 |
| `写完再验再重启` | 完整五阶段，不 commit，含停服与重启 |
| `帮我看看这个 bug`（仅分析） | Phase 0 + Phase 1 诊断，可不改代码；改了则须验证；若启过服务仍应停掉再按需重启 |
| 用户明确说「不要重启」 | Phase 0→1→2→3，跳过 Phase 4 并在汇报中说明 |
| 用户验证通过后说「提交吧」 | 本 Skill 已结束；改走提交类 Skill，勿在本流程内自动 commit |

---

## 禁止事项

- ❌ 跳过 Phase 0，直接 Read/Grep/Glob 全库勘察（图谱可用时）
- ❌ 改完代码不跑 `graphify update` 就进入验证（图谱可用时）
- ❌ 未验证就宣称完成
- ❌ 验证失败仍汇报「通过」或仍重启交付
- ❌ **验证通过后忘记 Phase 3**，直接在旧进程上宣称重启
- ❌ **停服后忘记 Phase 4**，把用户环境留在「全部已停」状态（用户明确说不要重启除外）
- ❌ Phase 3 误杀用户原本已在运行、且热重载已生效的服务
- ❌ Phase 4 结束后再把刚拉起的交付进程杀掉
- ❌ **自动 `git add` / `git commit` / `git push`**（即使用户顺口提了「提交」，也应等本流程结束后由用户明确发起）
- ❌ 跳过 linter 或构建检查
- ❌ 验证只靠「看起来没问题」

---

## 输出与收尾（eng-code-skills 统一）

完成工作流后，汇报中必须包含：

### 风险警告（必填）
列出未覆盖风险、不确定假设、可能影响生产的点；对修复/实现类任务，标明回归范围。

### 人工校验点（必填）
给出可执行检查清单（构建、接口、关键路径、停服/资源确认等）。

