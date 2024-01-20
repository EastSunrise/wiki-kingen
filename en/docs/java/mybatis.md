# MyBatis

Learn [MyBatis](https://mybatis.org/mybatis-3/) and its integration with [Spring](spring/index.md).

## Get Started

### Installation

Download [mybatis-x.x.x.jar](https://github.com/mybatis/mybatis-3/releases) or add _Maven_ dependency: `org.mybatis: mybatis: x.x.x`.

### Example

1. Configure arguments in an [XML configuration file](#configuration), specially _mappers_ to include [SQL Mapper XML](#mapper-xml-files) files.
2. Load the configuration to build a `SqlSessionFactory` instance.
3. Create [SqlSession](#sqlsessions) instances by `SqlSessionFactory` to execute mapped SQLs.

## Configuration

## Mapper XML Files

```xml
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="${namespace}">
</mapper>
```

**Namespace** isolates statements with longer, full-qualified names and **binds XML files with corresponding interfaces**.

## Dynamic SQL

MyBatis employs powerful [OGNL](./ognl.md) based expressions.

## SqlSessions

`SqlSession` is the primary interface to work with MyBatis. This interface is used to execute commands, get mappers and manage transactions. Refer to [the latest documents](https://mybatis.org/mybatis-3/zh/java-api.html#sqlSessions).

### SqlSessionFactory

`SqlSession` instances are created by `SqlSessionFactory` whose instances can be built by `SqlSessionFactoryBuilder` based on an XML configuration file or a custom prepared instance of `Configuration`.

#### From XML

Use a utility class called `Resources` in MyBatis to load the configuration file from resources directory under classpath. See [Configuration](#configuration) to configure an XML configuration file.

```java
SqlSessionFactory buildFactoryFromXML() {
    String resource = "mybatis-config.xml";
    InputStream inputStream = null;
    try {
        inputStream = Resources.getResourceAsStream(resource);
    } catch (IOException e) {
        e.printStackTrace();
    }
    return new SqlSessionFactoryBuilder().build(inputStream);
}
```

#### Without XML

Use utility classes from `org.apache.ibatis.session`.

```java
SqlSessionFactory buildFactoryWithoutXML() {
    DataSource dataSource = new PooledDataSource("driver", "url", "username", "password");
    TransactionFactory transactionFactory = new JdbcTransactionFactory();
    Environment environment = new Environment("development", transactionFactory, dataSource);
    Configuration configuration = new Configuration(environment);
    return new SqlSessionFactoryBuilder().build(configuration);
}
```

### SqlSession

Now, get instances of `SqlSession` by the method `SqlSessionFactory.openSession()`.

## FAQ

### Batch

#### Loop

```java
int batchInsert(List<User> users) {
    SqlSession sqlSession = MyConfiguration.getSqlSessionFactory().openSession(false);
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);
    int count = 0;
    for (User user : users) {
        count += mapper.insertUser(user);
    }
    sqlSession.commit();
    sqlSession.close();
    return count;
}
```

#### Batch Mode

```java
int batchInsert(List<User> users) {
    SqlSession sqlSession = MyConfiguration.getSqlSessionFactory().openSession(ExecutorType.BATCH, false); // only difference to above way
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);
    int count = 0;
    for (User user : users) {
        count += mapper.insertUser(user);
    }
    sqlSession.commit();
    sqlSession.close();
    return count;
}
```

### Type Cast

#### Foreach in Mapper

```java
int batchInsert(List<User> users) {
    if (users != null && users.size() > 0) {
        SqlSession sqlSession = MyConfiguration.getSqlSessionFactory().openSession();
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        int count = mapper.batchInsert(users);
        sqlSession.commit();
        sqlSession.close();
        return count;
    }

    return 0;
}
```

```xml
<insert id="batchInsert">
    INSERT INTO example.user (username, age)
    VALUES
    <foreach collection="list" item="item" separator=",">
        (#{item.username}, #{item.age})
    </foreach>
</insert>
```

**Notes**: Maximum SQL size that MySQL can accept is configured in _my.ini_ as _max_allowed_packet_, defaults to 1M.

#### Tips

The number of items in the condition `IN ()` shouldn't exceed 1000. Otherwise, split them with `OR` as follows:

```xml
<select id="select">
 SELECT * FROM example.user
 <where>
  username IN
  <foreach collection="list" item="item" open="(" close=")" separator=",">
   <if test="(index % 999) == 998"> NULL ) OR username IN (</if>#{item}
  </foreach>
 </where>
</select>
```

## Generator

[MyBatis Generator](http://mybatis.org/generator/index.html) is a code generator for MyBatis.

## References

- [mybatis – MyBatis 3](https://mybatis.org/mybatis-3/)
- [GitHub - mybatis/mybatis-3: MyBatis SQL mapper framework for Java](https://github.com/mybatis/mybatis-3)
- [mybatis-spring – MyBatis-Spring](http://mybatis.org/spring/)
- [GitHub - mybatis/spring: Spring integration for MyBatis 3](https://github.com/mybatis/spring)
- [mybatis-spring-boot – About](http://mybatis.org/spring-boot-starter/)
