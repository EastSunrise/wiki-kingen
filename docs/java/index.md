#### Overview

Learn [Java](https://www.oracle.com/java/), the best programming language in the world. This is based on [Java 11](https://docs.oracle.com/en/java/javase/11/), including [Java tutorials](https://docs.oracle.com/javase/tutorial/index.html) based on JDK 8, [API documentations](https://docs.oracle.com/en/java/javase/11/docs/api/index.html), [Java Virtual Machine](https://docs.oracle.com/en/java/javase/11/vm/index.html), [Java language specifications](https://docs.oracle.com/javase/specs/jls/se11/html/index.html), [JVM specifications](https://docs.oracle.com/javase/specs/jvms/se11/html/index.html), and [tutorials of Java EE 7](https://docs.oracle.com/javaee/7/tutorial/index.html).

Search [here](https://docs.oracle.com/apps/search/search.jsp?category=java&q=) for some help or refer to the [learning route](\img\Java Learning Route.jpg) to learn related technologies.

#### Installation

Download and install JDK. Configure paths as follows, assuming in *dir* folder:

```
JAVA_HOME=%dir%\jdk_version
path=.;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;

# If there are two versions
JAVA_HOME=%JAVA_HOME11% # specify current version
JAVA_HOME8=%dir%\jdk1.8
JAVA_HOME11=%dir%\jdk11
```

**Notes**: delete the path added automatically when installing and *java.exe*, *javaw.exe*, *javaws.exe* under *C:\Windows\System32*.

#### References

1. Java 核心技术 10. 卷I & 卷II. \i
2. [On Java 8. 中文版](https://lingcoder.gitee.io/onjava8/#/sidebar).
3. [Overview (Java Platform SE 8 )](https://docs.oracle.com/javase/8/docs/api/).
4. [Overview (Java SE 11 & JDK 11 )](https://docs.oracle.com/en/java/javase/11/docs/api/index.html).