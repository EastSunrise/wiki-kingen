## Meta annotations

Annotations applied to other annotations

### @Target

Marks another annotation to restrict what kind of Java elements the annotation may be applied to. Values of `ElementType` includes:

-   TYPE: class, interface or enum
-   FIELD: fields, including the constants in the enum
-   METHOD
-   PARAMETER
-   CONSTRUCTOR
-   LOCAL_VARIABLE
-   ANNOTATION_TYPE
-   PACKAGE

### @Retention

Specifies how the marked annotation is stored. Values of `RetentionPolicy` includes:

-   SOURCE: in code only, abandoned once compiled.
-   CLASS(default): compiled into the class, abandoned when running
-   RUNTIME: available at runtime through reflection

### @Documented

Marks another annotation for inclusion in the documentation.

### @Inherited

Marks another annotation to be inherited to subclasses of annotated class. Annotations are not inherited to subclasses by default.

## Example

```java
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Test{

}
```

## References

-   [java.lang.annotation (Java SE 11 & JDK 11 )](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/annotation/package-summary.html)
