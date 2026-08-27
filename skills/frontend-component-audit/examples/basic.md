# frontend-component-audit example

[English](./basic.md) · [中文](./basic.zh-CN.md)

## Scenario
Audit a fat page component that mixes fetch, form rules, and presentation.

## Input (Before)

```text
function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [q, setQ] = useState('');
  useEffect(() => { fetch('/api/orders').then(r => r.json()).then(setOrders); }, []);
  const filtered = orders.filter(o => o.name.includes(q));
  // 400+ lines: table UI, export CSV, permission checks, toast, modal...
  return <div>...</div>;
}
```

## Expected output highlights

```text
[P0] Single component owns request + filter + export + permission + UI
[P1] Suggest split: useOrdersQuery hook / OrderFilters / OrderTable / export util
[P2] Permission checks should be pure helpers for unit tests
Diff: none (audit-only unless user asks to split)
```

## Notes
Keep UX, copy, and API calls behavior-identical if a split is requested.

## Reminder
Advisory only. Require human review and tests before shipping.
