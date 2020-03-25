#### Overview

[Apache Tomcat](http://tomcat.apache.org/) is an open source implementation of the Java Servlet, JavaServer Pages, Java Expression Language and Java WebSocket technologies.

#### Configuration

Run *bin/service.bat* to add Tomcat to Windows service.

#### Publish Static Pages

Create a xml file under *conf/Catalina/localhost* with:

```xml
<!--'path' is optional-->
<!--'dir_to_deploy' is directory to deploy-->
<Context path="{path}" docBase="{dir_to_deploy}" debug="0" reloadable="true" crossContext="true"/>
```

Access the website from <ip:port/path/>

#### FAQ

##### Accessed from LAN

Just access the server from <{LAN_ip}:{port}>. If failed, open advanced settings of firewall and then add a *Inbound Rule* for the port of Tomcat, *8080* as usual.

#### References

1. [Apache Tomcat® - Welcome!](http://tomcat.apache.org/)