#### Overview

Project **Lombok** is a java library that automatically plugs into editors and build tools, spicing up Java.

Download [here](https://projectlombok.org/download) or add **Maven: org.projectlombok: lombok: x.x.x** with *provided* for *scope*, meaning that *Lombok* only takes effect when compiling.

#### Support for IDE

Install plug-in *Lombok*.

#### Principle

Since Java 6, Java supports regulation of *JSR 269 Pluggable Annotation Processing API* which is called when *javac* is running. Its procedures are as follows:

1. *javac* analyzes the source code and generates an Abstract Syntax Tree (AST).
2. *javac* calls *Lombok* programs implementing *JSR 269 API* when compiling.
3. *Lombok* deals with the AST above modifies its nodes by associate annotations.
4. *javac* generates bytecode files based on the modified AST.

#### Usage

1. **@NonNull**
2. **@Cleanup** calls *close()* methods, taking effect for objects implementing *java.io.Closeable* method.
3. **@Getter/@Setter**
4. **@ToString**
5. **@EqualsAndHashCode** generates *equals()* and *hashCode()*
6. **@NoArgsConstructor**, **@RequiredArgsConstructor** and **@AllArgsConstructor** generate constructors that take no fields, *final*/*@NonNull* fields or all fields.
7. **@Data** is a shortcut for *@ToString*, *@EqualsAndHashCode*, *@Getter* on all fields, *@Setter* on all non-final fields and *RequiredArgsConstrutor*.
8. **@Value**
9. **@Builder** builds types by Builder Pattern.
10. **@SneakyThrows** checks exceptions.
11. **@Log** generates a logger field.

#### References

1. [Project Lombok](https://projectlombok.org/)
2. [Lombok的基本使用 - 简书](https://www.jianshu.com/p/2543c71a8e45)