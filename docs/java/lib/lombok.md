## 概述

### Maven

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>${lombok.version}</version>
    <scope>provided</scope>
</dependency>
```

### IDEA

安装插件 _Lombok_.

## 原理

从 **Java 6** 开始，Java 支持插入式注解处理 API（_JSR 269 Pluggable Annotation Processing API_），只要程序实现了该 API，_javac_ 编译源码时就会调用定义的注解。_Lombok_ 编译流程如下：

1. _javac_ 分析源码，生成一棵抽象语法树（_AST_）；
2. _javac_ 运行过程中调用实现 _JSR 269 API_ 的 _Lombok_ 程序；
3. _Lombok_ 根据定义的注解修改上述 _AST_ ；
4. _javac_ 基于修改后的 _AST_ 生成字节码文件。

## 应用

-   `@NonNull`
-   `@Cleanup` 调用 `close()` 方法
-   `@Getter`、`@Setter`
-   `@ToString`
-   `@EqualsAndHashCode` 生成 `equals()` 和 `hashCode()` 方法
-   `@NoArgsConstructor`、`@RequiredArgsConstructor`、`@AllArgsConstructor`
-   `@Data` 是 `@ToString`，`@EqualsAndHashCode`，`@Getter`，`@Setter` 和 `@RequiredArgsConstrutor` 的组合
-   `@Value` 标记不可变类
-   `@Builder`
-   `@SneakyThrows` 代替 `try{}catch{}`
-   `@Synchronized`
-   `@With` 生成不可变对象的 `setter` 方法，可以克隆对象仅改变一个属性
-   `@Log`: 生成命名为 `log` 的 `Logger` 静态常量，

## 参考

-   [Overview (Lombok)](https://projectlombok.org/api/)
-   [Lombok Features](https://projectlombok.org/features/all)
