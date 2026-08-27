# 前端组件专项审计 示例

[English](./basic.md) · [中文](./basic.zh-CN.md)

## 场景
审计把请求、表单规则与展示堆在一起的臃肿页面组件。

## 输入（Before）

```text
function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [q, setQ] = useState('');
  useEffect(() => { fetch('/api/orders').then(r => r.json()).then(setOrders); }, []);
  const filtered = orders.filter(o => o.name.includes(q));
  // 400+ 行：表格 UI、导出 CSV、权限判断、toast、弹窗...
  return <div>...</div>;
}
```

## 期望产出要点

```text
[P0] 单组件同时承担请求 + 过滤 + 导出 + 权限 + UI
[P1] 建议拆分：useOrdersQuery / OrderFilters / OrderTable / export 工具
[P2] 权限判断应抽成纯函数以便单测
Diff：无（默认仅审计；用户要求拆分时再落地）
```

## 说明
若落地拆分，必须保持交互、文案与请求行为不变。

## 提醒
所有结论仅供参考，上线前必须人工评审与测试。
