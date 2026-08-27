# frontend-hooks-check example

[English](./basic.md) · [中文](./basic.zh-CN.md)

## Scenario
Detect missing effect cleanup and incomplete dependency arrays.

## Input (Before)

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

## Expected output highlights

```text
[P0] Missing clearInterval in effect cleanup — timer leak on unmount
[P0] `url` used inside effect but omitted from deps — stale closure risk
[P1] Suggest extracting fetch+set into a named async helper; do not change poll interval semantics
```

## Notes
Report-first. Structure-only fixes only when the user explicitly asks to apply them.

## Reminder
Advisory only. Require human review and tests before shipping.
