# Actuator

## 配置

引入相关依赖：

```xml
<!--2.x-->
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

<!--3.x-->
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>
```

修改配置文件 `application.properties`：

```properties
# 自定义端口（可选）
management.server.port=8081
# 自定义基本路径（可选），需要先自定义端口
management.server.base-path=/management
management.endpoints.web.exposure.include=prometheus
management.endpoint.prometheus.enabled=true
management.metrics.export.prometheus.enabled=true
```

访问 `http://localhost:8081/management/actuator/prometheus` 即可查看 Prometheus 格式的监控数据。

## 参考

- [Production-ready Features :: Spring Boot](https://docs.spring.io/spring-boot/reference/actuator/index.html)
