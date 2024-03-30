# Java

学习世界上最好的编程语言—— [Java](https://www.oracle.com/java/)！本文档基于 ~~[Java 8](https://docs.oracle.com/javase/8/)~~ ~~[Java 11](https://docs.oracle.com/en/java/javase/11/)~~ [Java 17](https://docs.oracle.com/en/java/javase/17/).

## 安装

下载安装 [Java](https://www.oracle.com/java/technologies/downloads/) 并按如下配置环境变量（其中`dir`为安装目录）：

```ini
JAVA_HOME=%dir%\jdk_version
# Linux使用":"分割
path=.;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;

# 如果同时安装多个版本
JAVA_HOME=%JAVA_HOME17% # 指定当前版本
JAVA_HOME8=/path/to/jdk1.8
JAVA_HOME11=/path/to/jdk11
JAVA_HOME17=/path/to/jdk17
```

> 删除安装时自动添加到系统目录 _C:\Windows\System32_ 下的 _java.exe_, _javaw.exe_, _javaws.exe_.

## Java 8 新特性

### 函数式接口和 Lambda 表达式

```java
void example() {
    Runnable runnable = () -> System.out.println("lambda without arguments and return value");
    Supplier<String> supplier = () -> "lambda with return value";
    Consumer<String> consumer = str -> System.out.println("lambda with an argument");
    Function<String, String> function = str -> "lambda with an argument and return value";
}
```

### Stream API

通过 Stream API 流式处理集合和数组等数据结构。

```java
void example() {
    Arrays
        .asList(1, 2, 3, 4, 5).stream()
        .filter(num -> num % 2 == 0)
        .map(num -> num * 2)
        .forEach(System.out::println);
}
```

### Optional

```java
void example() {
    String str = Optional.of("optional string").orElse(null);
}
```

### 接口 static 和 default 方法

```java
interface Example {

    static void staticFunc() {
        System.out.println("static function");
    }

    default void defaultFunc() {
        System.out.println("default function");
    }
}
```

### JSR 310 日期和时间

```java
void example() {
    LocalDate date = LocalDate.of(2000, 1, 1);
    LocalTime time = LocalTime.of(12, 0, 0);
    LocalDateTime dateTime = LocalDateTime.of(date, time);
    Period period = Period.of(1, 1, 1);
    Duration duration = Duration.of(100, ChronoUnit.HOURS);
    Instant instant = dateTime.toInstant(ZoneOffset.ofHours(8));
}
```

## Java 11 新特性

### 模块化

### JShell 交互式编程

### 接口 private 方法

```java
interface Example {

    private static void staticFunc() {
        System.out.println("private static function");
    }

    private void privateFunc() {
        System.out.println("private function");
    }
}
```

### 局部变量类型推断

```java
void example() {
    var a = "Hello World";
}
```

> 这种推断仅仅发生在编译期，非动态推断。

### HttpClient

```java
void example() {
    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder().GET().uri(new URI("https://baidu.com")).build();
    HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
    System.out.println(response.body());
}
```

## Java 17 新特性

### switch 语法

```java
String evaluate(int score) {
    return switch (score) {
        case 5 -> "A";
        case 4 -> "B";
        case 3 -> "C";
        case 0, 1, 2 -> "D";
        default -> throw new IllegalArgumentException("unknown score");
    };
}
```

### 文本块

```java
String block = """
    this is first line;
    this is second line.
    """;
```

### instanceof

```java
Object x = "xx";
if (x instanceof String y) {
    System.out.println(y);
}
```

### record

`record` 实际是 `final` 类型的不可变类，继承自 `java.lang.Record`.

```java
public record Example(int x, int y) {}

Example example = new Example(1, 2);
System.out.println(example);
System.out.println(example.x());
System.out.println(example.y());
```

### sealed

```java
// 仅允许B,C继承
public sealed class A permits B, C {}

public final class B extends A {}

// 不再密封
public non-sealed class C extends A {}

public class D extends C {}
```

## Java 21 新特性

### 虚拟线程

平台线程和内核线程一一对应，由操作系统管理和调度；虚拟线程是用户模式线程，在 JVM 内部实现，由 JVM 管理和调度，开销比较小。如果某个任务经常处于阻塞状态（等待 I/O 操作），适合使用虚拟线程。

```java
public static void main(String[] args) {
    try (ExecutorService executor = Executors.newThreadPerTaskExecutor(Thread.ofVirtual().factory())) {
        for (int i = 0; i < 100_000; i++) {
            final int j = i;
            executor.execute(() -> System.out.println(j));
        }
    }
}
```

## 参考

- [JDK 17 Documentation](https://docs.oracle.com/en/java/javase/17/)
- [JDK 11 Documentation](https://docs.oracle.com/en/java/javase/11/)
- [Java Platform, Standard Edition (Java SE) 8](https://docs.oracle.com/javase/8/)
- [The Java™ Tutorials](https://docs.oracle.com/javase/tutorial/index.html)
- [Java Language and Virtual Machine Specifications](https://docs.oracle.com/javase/specs/index.html)
- [Java Platform, Enterprise Edition (Java EE) 7](https://docs.oracle.com/javaee/7/tutorial/index.html)
- Java 核心技术 10. 卷 I & 卷 II.
