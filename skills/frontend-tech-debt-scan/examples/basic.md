# 前端技术债务扫描 示例

## 场景
演示本技能在典型输入上的期望产出形态。

## 输入（Before）

```text
// God component 800+ lines mixing fetch, form, chart, modal
```

## 期望产出要点

```text
（债务报告示例）
P1 页面组件 800+ 行，视图与数据耦合
P2 同时使用 Redux 与临时 Context 存同一用户会话
P2 多处 document.addEventListener 无移除
```

## 说明
扫描报告不自动拆仓。

## 提醒
所有结论仅供参考，上线前必须人工评审与测试。
