### 概述

学习世界上最好的编程语言—— [Java](https://www.oracle.com/java/)！本文档基于 [Java 11](https://docs.oracle.com/en/java/javase/11/).

### 安装

下载安装 [Java](https://www.oracle.com/java/technologies/downloads/) 并按如下配置环境变量（其中`dir`为安装目录）：

```ini
JAVA_HOME=%dir%\jdk_version
path=.;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;

# 如果同时安装多个版本
JAVA_HOME=%JAVA_HOME11% # 指定当前版本
JAVA_HOME8=%dir%\jdk1.8
JAVA_HOME11=%dir%\jdk11
```

**注意**: 删除安装时自动添加到系统目录 *C:\Windows\System32* 下的 *java.exe*, *javaw.exe*, *javaws.exe*.

### 参考

- Java
    - Java 核心技术 10. 卷I & 卷II.
	- [The Java™ Tutorials](https://docs.oracle.com/javase/tutorial/index.html)
	- [Java SE & JDK 11 API Specification](https://docs.oracle.com/en/java/javase/11/docs/api/index.html)
	- [Java Virtual Machine Guide](https://docs.oracle.com/en/java/javase/11/vm/index.html)
	- [The Java® Language Specification](https://docs.oracle.com/javase/specs/jls/se11/html/index.html)
	- [The Java® Virtual Machine Specification](https://docs.oracle.com/javase/specs/jvms/se11/html/index.html)
	- [The Java EE Tutorial](https://docs.oracle.com/javaee/7/tutorial/index.html)
	- [Java SE 8 API Specification](https://docs.oracle.com/javase/8/docs/api/)
- 库
	- [Apache Commons – Apache Commons](https://commons.apache.org/)
		- [OGNL - Apache Commons OGNL - Object Graph Navigation Library](https://commons.apache.org/proper/commons-ognl/)
	- [Apache POI - the Java API for Microsoft Documents](https://poi.apache.org/index.html)
	- [Apache HttpComponents – Apache HttpComponents](https://hc.apache.org/index.html)
	- [FasterXML/jackson-docs: Documentation for the Jackson JSON processor](https://github.com/FasterXML/jackson-docs)
	- [Home · alibaba/fastjson Wiki](https://github.com/alibaba/fastjson/wiki)
	- [jsoup: Java HTML parser, built for HTML editing, cleaning, scraping, and XSS safety](https://jsoup.org/)
- [Maven – Welcome to Apache Maven](https://maven.apache.org/index.html)
- [FreeMarker 中文官方参考手册](http://freemarker.foofun.cn/)
