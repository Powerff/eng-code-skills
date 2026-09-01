# Loop Engineering — 单切片闭环

对一个 MVP 切片 Sx 执行：**图谱定向 → 实现 → 验证 → graphify update → 停服**。不自动 commit。

## 五阶段（不可跳步）

```
L0 切片确认 & graphify 定向
L1 实现本切片（仅 Sx 范围）
L2 验证（实证，登记启动的服务）
L3 graphify update + affected
L4 停服释放
```

## 强制规则

1. **单切片** — 禁止越界做 Sx+1 或无关重构
2. **先图谱再 Read/Grep** — L0 门禁
3. **验证实证** — 构建/命令/接口
4. **失败回 L1** — 改结构后先 graphify update
5. **不 commit** — 除非用户另选 commit 类 Skill
6. **风险警告 + 人工校验点**（必填）

## L0 输入

切片编号、范围、Done 标准（来自 graph-engineering-requirements 或用户说明）。

## 输出

1. 切片报告（Sx、Done 是否达成）
2. 改动清单
3. 验证报告表
4. 下一切片建议（不实现）
5. 风险警告
6. 人工校验点
