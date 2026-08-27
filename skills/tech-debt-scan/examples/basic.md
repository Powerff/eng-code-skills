# 通用技术债务扫描 示例

## 场景
演示本技能在典型输入上的期望产出形态。

## 输入（Before）

```text
// TODO: remove after migration (2021)
const API = 'http://127.0.0.1:3000';
function getUser(id){ return fetch(API+'/u/'+id).then(r=>r.json()) }
```

## 期望产出要点

```text
（无代码变更 — 扫描报告示例）
P1 硬编码基址：API 写死 localhost，阻碍多环境部署
P2 过期 TODO：2021 migration 标记仍在
P2 错误处理缺失：fetch 无非 2xx 处理
```

## 说明
债务扫描以报告为主，不自动改业务代码。

## 提醒
所有结论仅供参考，上线前必须人工评审与测试。
