## Overview

[Apache Tomcat](http://tomcat.apache.org/) is an open source implementation of the Java Servlet, JavaServer Pages, Java Expression Language and Java WebSocket technologies.

## Configuration

Run _bin/service.bat_ to add Tomcat to Windows service.

## Publish Static Pages

Create a xml file under _conf/Catalina/localhost_ with:

```xml
<!--'path' is optional-->
<!--'dir_to_deploy' is directory to deploy-->
<Context path="{path}" docBase="{dir_to_deploy}" debug="0" reloadable="true" crossContext="true"/>
```

Access the website from [http://127.0.0.1:8080/index.html](http://127.0.0.1:8080/index.html).

## FAQ

### Accessed from LAN

Just access the server from the address. If failed, open advanced settings of firewall and then add a _Inbound Rule_ for the port of Tomcat, _8080_ as usual.

## References

-   [Apache Tomcat® - Welcome!](http://tomcat.apache.org/)
