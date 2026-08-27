# 前端代码规范检查 示例

## 场景
演示本技能在典型输入上的期望产出形态。

## 输入（Before）

```text
useEffect(() => {
  const id = setInterval(() => setT(Date.now()), 1000);
}, []);
```

## 期望产出要点

```text
（检查报告示例）
[高] setInterval 未在 cleanup 中 clearInterval，存在副作用泄露
[中] 建议将 tick 逻辑抽离或说明为何必须驱动重渲染
```

## 说明
前端检查强调 effects 生命周期。

## 提醒
所有结论仅供参考，上线前必须人工评审与测试。
