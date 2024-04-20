# Spring Boot

## Get Started

`SpringApplication` 类提供了一种便捷的方式，通过 `main()` 方法启动 Spring 应用：

```java
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

其中，`@SpringBootApplication` 注解包含了以下三个注解：

- `@EnableAutoConfiguration` 注解：启用自动配置，Spring Boot 将根据项目依赖自动配置应用；
- `@ComponentScan` 注解：启用自动注入，所有 `@Controller, @Service, @Repository, @Component` 注解的类将自动注入为 Spring Bean；
- `@SpringBootConfiguration` 注解：注入上下文中额外的 Bean 和配置。

## 参考

- [Developing with Spring Boot :: Spring Boot](https://docs.spring.io/spring-boot/reference/using/index.html)
- [Core Features :: Spring Boot](https://docs.spring.io/spring-boot/reference/features/index.html)
