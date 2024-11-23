# MyBatis

## 分页

```java
/**
 * @param page pagination argument must be the first one
 */
IPage<UserVo> selectUserPage(IPage<?> page, Integer state);

/**
 * @param page pagination argument must be the first one and implement {@link IPage}
 */
MyPage selectUserPage(MyPage page);

/**
 * @return list of objects
 */
List<UserVo> selectUserPage(IPage<UserVo> page, Integer state);
```

!!! note
    分页参数必须是第一个参数，并且必须实现`IPage`接口。

## 参考

- [mybatis – MyBatis 3 | Getting started](https://mybatis.org/mybatis-3/getting-started.html)
- [mybatis-spring](https://mybatis.org/spring/getting-started.html)
- [简介 | MyBatis-Plus](https://baomidou.com/introduce/)
