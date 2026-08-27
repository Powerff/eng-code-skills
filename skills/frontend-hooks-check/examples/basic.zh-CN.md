# 前端 Hooks 规范检查 示例

[English](./basic.md) · [中文](./basic.zh-CN.md)

## 场景
检测 effect 缺少 cleanup 与依赖数组不完整。

## 输入（Before）

```text
function usePoll(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const id = setInterval(async () => {
      const res = await fetch(url);
      setData(await res.json());
    }, 3000);
  }, []);
  return data;
}
```

## 期望产出要点

```text
[P0] effect 未 clearInterval — 卸载后定时器泄露
[P0] effect 使用了 url 但 deps 未包含 — 陈旧闭包风险
[P1] 可将 fetch+set 抽成命名函数；不得擅自改轮询间隔语义
```

## 说明
默认只出报告；用户明确要求落地时才做结构级修正。

## 提醒
所有结论仅供参考，上线前必须人工评审与测试。
