## Overview

Project **Lombok** is a java library that automatically plugs into editors and build tools, spicing up Java.

### Maven

After importing Lombok as following in Maven project, it will takes effect when compiling.

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>${lombok.version}</version>
    <scope>provided</scope>
</dependency>
```

### Support for IDE

Install plug-in _Lombok_.

## Principle

Since **Java 6**, Java supports regulation of _JSR 269 Pluggable Annotation Processing API_ which is called when _javac_ is running. Its procedures are as follows:

1. _javac_ analyzes the source code and generates an Abstract Syntax Tree (AST).
2. _javac_ calls _Lombok_ programs implementing _JSR 269 API_ when compiling.
3. _Lombok_ deals with the AST above modifies its nodes by associate annotations.
4. _javac_ generates bytecode files based on the modified AST.

## Usage

-   `@NonNull`
-   `@Cleanup` calls `close()` methods, taking effect for objects implementing `java.io.Closeable` method.
-   `@Getter`, `@Setter`
-   `@ToString`
-   `@EqualsAndHashCode` generates `equals()` and `hashCode()`
-   `@NoArgsConstructor`, `@RequiredArgsConstructor` and `@AllArgsConstructor` generate constructors that take no fields, `final` / `@NonNull` fields or all fields.
-   `@Data` is a shortcut for `@ToString`, `@EqualsAndHashCode`, `@Getter` on all fields, `@Setter` on all non-final fields and `@RequiredArgsConstrutor`.
-   `@Value`
-   `@Builder` builds types by Builder Pattern.
-   `@SneakyThrows` checks exceptions.
-   `@With`
-   `@Log` generates a logger field.

## References

-   [Overview (Lombok)](https://projectlombok.org/api/)
-   [Lombok Features](https://projectlombok.org/features/all)
