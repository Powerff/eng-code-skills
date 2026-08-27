# 前端代码评审 示例

[English](./basic.md) · [中文](./basic.zh-CN.md)

## 场景
演示本技能在典型输入上的期望产出形态。

## 输入（Before）

```text
useEffect(() => { fetchUser(id).then(setUser); }, []);
```

## 期望产出要点

```text
（评审意见示例）
[必须关注] 依赖数组缺少 id，id 变化不会重新请求 — 标记正确性风险
[建议] 处理卸载后 setState、以及 loading/error 态
```

## 说明
effect 依赖问题以风险标记；是否改行为需人工确认。

## 提醒
所有结论仅供参考，上线前必须人工评审与测试。
