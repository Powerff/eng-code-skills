# 前端安全重构 示例

## 场景
演示本技能在典型输入上的期望产出形态。

## 输入（Before）

```text
function Profile({ user }) {
  const [name, setName] = useState(user.name);
  return <div><input value={name} onChange={e => setName(e.target.value)} /><span>{user.email}</span></div>;
}
```

## 期望产出要点

```text
function Profile({ user }) {
  const [name, setName] = useState(user.name);
  return (
    <div>
      <NameField value={name} onChange={setName} />
      <EmailText email={user.email} />
    </div>
  );
}

function NameField({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}

function EmailText({ email }) {
  return <span>{email}</span>;
}
```

## 说明
仅拆分展示；状态初始值与数据流不变。

## 提醒
所有结论仅供参考，上线前必须人工评审与测试。
