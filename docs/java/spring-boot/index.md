#### Overview

Learn [Spring Boot](https://spring.io/projects/spring-boot). Here are the [documentations](https://docs.spring.io/spring-boot/docs/current/reference/html/), the [Chinese version](https://www.docs4dev.com/docs/zh/spring-boot/2.1.1.RELEASE/reference/boot-documentation.html), and the [source code](https://github.com/spring-projects/spring-boot).

#### Installation

Spring Boot 2.1.1.RELEASE requires [Java](../index.md) 8 and is compatible up to Java 11. [Spring Framework](../spring/index.md) 5.1.3.RELEASE is also required.

It supports build tools: [Maven](../maven.md) 3.3+ or [Grandle](https://gradle.org/) 4.4+. For servlet containers, it supports [Tomcat](../tomcat.md) 9.0, [Jetty](http://www.eclipse.org/jetty/) 9.4, [Undertow](http://undertow.io/) 2.0 or any Servlet 3.1+ compatible container.

With Maven, inherit from **parent: org.springframework.boot: spring-boot-starter-parent: x.x.x.RELEASE**. There is also a Maven plug-in, adding **plugin: org.springframework.boot: spring-boot-maven-plugin: x.x.x.RELEASE** in the *plugins* section.
