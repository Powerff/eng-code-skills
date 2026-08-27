# backend-api-layer-check example

[English](./basic.md) · [中文](./basic.zh-CN.md)

## Scenario
Flag Entity leakage and Map-based API responses.

## Input (Before)

```text
@GetMapping("/users/{id}")
public Map<String, Object> getUser(@PathVariable Long id) {
  UserEntity u = userService.find(id);
  Map<String, Object> m = new HashMap<>();
  m.put("id", u.getId());
  m.put("passwordHash", u.getPasswordHash());
  return m;
}
```

## Expected output highlights

```text
[P0] Returning Map instead of typed VO — unstable contract
[P0] Exposing passwordHash via response map — sensitive field leak
[P1] Prefer UserVO + BizResult (or project wrapper); keep field semantics identical
```

## Notes
Align package names and wrappers with the existing codebase. Do not change status codes or field meaning.

## Reminder
Advisory only. Require human review and tests before shipping.
