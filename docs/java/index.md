#### Overview

Learn [Java](https://www.oracle.com/java/), the best programming language in the world. This is based on [Java 11](https://docs.oracle.com/en/java/javase/11/).

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

#### Language References

1. [Annotation](language/annotation.md)
2. Object-Oriental Program
3. I/O
4. Exception
5. Net
6. [Collection](language/collection.md)
7. Concurrence
8. Java Virtual Machine
10. Misc

#### References

1. Java 核心技术 10. 卷I & 卷II. \i
2. [On Java 8. 中文版](https://lingcoder.gitee.io/onjava8/#/sidebar).
3. [Overview (Java Platform SE 8 )](https://docs.oracle.com/javase/8/docs/api/).
4. [Overview (Java SE 11 & JDK 11 )](https://docs.oracle.com/en/java/javase/11/docs/api/index.html).