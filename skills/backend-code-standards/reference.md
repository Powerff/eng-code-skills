# 编码规范 · 正反例参考

摘自 `delivery-platform-backend/docs/optimize.md`、`optimize-v2.md`、`optimize-v3.md`、`optimize-v4.md` 共性条款，供对照落地。

---

## 1. 状态 / 类型 → 枚举

❌ 业务类内分散常量或字面量：

```java
private static final String STATUS_RUNNING = "running";
credential.setType("key");
```

✅ 枚举 + `getCode()`：

```java
@Schema(description = "任务执行状态")
public enum TaskStatusEnum {
    PENDING("pending", "待执行"),
    RUNNING("running", "执行中"),
    SUCCESS("success", "成功"),
    FAILED("failed", "失败");

    private final String code;
    private final String desc;
    // constructor + getters + matches(String)
}

credential.setType(CredentialTypeEnum.KEY.getCode());
```

---

## 2. 魔法文案 / 错误码 → 常量

❌：

```java
return BizResult.fail(400, "server_ip required");
result.setMessage("updated");
```

✅：

```java
return BizResult.fail(BizCodeConstant.PARAM_INVALID, BizMsgConstant.SERVER_IP_REQUIRED);
result.setMessage(BizMsgConstant.UPDATED);
```

---

## 3. 禁止 Map 组装出参

❌：

```java
Map<String, Object> result = new LinkedHashMap<>();
result.put("hosts", countHosts());
return BizResult.success(result);
```

✅ 强类型 VO：

```java
@Getter @Setter @ToString
@Schema(description = "平台统计数据")
public class DashboardStatsVO {
    @Schema(description = "主机数量")
    private CountStatVO hosts;
    // ...
}
return BizResult.success(vo);
```

---

## 4. 禁止 Map 透传 Controller → Service

❌：

```java
Map<String, Object> body = new LinkedHashMap<>();
body.put("product_name", req.getProductName());
return BizResult.success(service.createTask(body));
```

✅：

```java
return BizResult.success(projectDeployService.createTask(req));
```

字段不一致时：另建 Service 层 DTO + Bean 拷贝，仍禁止退化为 Map。

---

## 5. 禁止 Entity 直接对外

❌：

```java
public BizResult<DataListVO<SshCredential>> list() { ... }
```

✅：

```java
List<SshCredentialVO> voList = BeanUtil.copyToList(entityList, SshCredentialVO.class);
// VO 不含 privateKeyEnc / passwordEnc
return BizResult.success(DataListVO.of(voList));
```

---

## 6. Request DTO 形态

❌ Controller 内部 `@Data` 静态类。

✅ 独立文件：

```java
@Getter @Setter @ToString
@Schema(description = "凭证信息请求参数")
public class CredentialRequest {
    @Schema(description = "凭证名称")
    private String name;
    // ...
}
```

---

## 7. Entity 字段注释

```java
/** 凭证类型：key-密钥，password-密码 */
private String type;

/** 加密后私钥 */
private String privateKeyEnc;
```

---

## 8. Service 接口 / 实现分离

```java
public interface UserService {
    User getUserById(Long id);  // 仅签名
}

@Service
public class UserServiceImpl implements UserService {
    @Override
    public User getUserById(Long id) { /* 业务 */ }
}
```

禁止在 interface 的 `default` 方法中写业务逻辑。

---

## 9. Bean 拷贝 + 枚举

```java
SshCredential credential = new SshCredential();
BeanUtil.copyProperties(pair, credential);
credential.setName(name);
credential.setType(CredentialTypeEnum.KEY.getCode());
```

注意：只拷贝同名同类型字段；差异字段手写；留意浅拷贝引用。

---

## 10. JavaDoc（含私有方法）

```java
/**
 * 持久化自动生成的 SSH 密钥凭证
 * @param name 凭证名称
 * @param username 目标登录用户名
 * @param pair 密钥对
 * @return 入库后的凭证实体
 */
private SshCredential persistGeneratedKey(String name, String username, GeneratedKeyPair pair) {
    // ...
}
```

---

## 11. OpenAPI

```java
@Tag(name = "部署基础信息", description = "部署相关默认配置查询与修改")
@RestController
public class DeployInfoController {

    @Operation(summary = "获取服务器 IP", description = "查询系统保存的部署服务器默认 IP")
    @GetMapping("/server-ip")
    public BizResult<ServerIpVO> getServerIp() { ... }
}
```

---

## 来源文档（仓库内）

- `docs/optimize.md` — 状态枚举、VO、Request 抽取、Lombok/Schema
- `docs/optimize-v2.md` — Service 分离、Bean 拷贝、JavaDoc、禁 Map 透传
- `docs/optimize-v3.md` — 禁 Entity 出参、Entity 字段注释
- `docs/optimize-v4.md` — 魔法值常量、完整 @Operation/@Tag
