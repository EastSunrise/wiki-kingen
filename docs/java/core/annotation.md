# Annotation

## 元注解

### @Target

标记注解所应用的上下文——`ElementType`，包括：

- `TYPE`：类，接口（包括注解类型），或者枚举
- `FIELD`：成员变量（包括枚举常量）
- `METHOD`：方法
- `PARAMETER`：参数
- `CONSTRUCTOR`：构造方法
- `LOCAL_VARIABLE`：本地变量
- `ANNOTATION_TYPE`：注解类型
- `PACKAGE`：包

### @Retention

标记注解所应用的时间——`RetentionPolicy`，包括：

- `SOURCE`：编译前
- `CLASS`：运行前的 _.class_ 文件，默认值
- `RUNTIME`：一直保持到运行时，可以通过反射获取

### @Documented

如果 `@A` 被 `@Documented` 标记，则 `@A` 标记的元素生成文档时会显示 `@A`.

### @Inherited

标记的注解会被自动继承.

## 示例

```java title="Test.java"
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Test{

}
```

### @Repeatable

允许重复使用同一个注解，例如：

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@Repeatable(RegexList.class)
@interface Regex {

    String pattern();

    /**
     * Container annotation used by the Java compiler to store repeated annotations.
     */
    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.FIELD)
    @interface RegexList {
        Regex[] value();
    }
}


class Bean {

    @Regex(pattern = "^[a-zA-Z]+$")
    @Regex(pattern = "^[0-9]+$")
    private String name;
}
```

## 类型检查

注解可以用于创建类型检查模块，例如：

```java
@NonNull String name;
```

## 参考

- [Lesson: Annotations (The Java™ Tutorials > Learning the Java Language)](https://docs.oracle.com/javase/tutorial/java/annotations/index.html)
- [java.lang.annotation (Java SE 11 & JDK 11 )](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/annotation/package-summary.html)
