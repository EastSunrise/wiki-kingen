#### Overview

[Apache Maven](https://maven.apache.org/) is a software project management and comprehension tool.

#### Configuration

Download [Maven](http://maven.apache.org/download.cgi) and add to PATH.

Create a copy of *conf/settings.xml* to add an internal mirror and modify the path of local repository. Following is a mirror of *aliyun*.

```xml
<mirror>
	<id>nexus-aliyun</id>
	<mirrorOf>central</mirrorOf>
	<name>Nexus aliyun</name>
	<url>http://maven.aliyun.com/nexus/content/groups/public</url>
</mirror>
```

#### Nexus

Build a private Maven server with Nexus

#### References

1. [Maven – Maven Documentation](http://maven.apache.org/guides/)
2. [GitHub - apache/maven-sources: Apache Maven Sources](https://github.com/apache/maven-sources)