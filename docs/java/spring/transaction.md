#### Propagation

	@see org.springframework.transaction.annotation.Propagation

- **REQUIRED（默认）**：如果当前没有事务，就新建一个事务，如果已存在，则加入到这个事务
- **NESTED**：如果当前没有事务，就新建一个事务，如果存在事务，则在事务内嵌套一个子事务
- **REQUIRED_NEW**：如果当前没有事务，就新建一个事务，如果存在事务，则挂起旧事务，在新事务中执行

**Notes**; 

1. NESTED中子事务回滚不影响外部事务，外部事务回滚子事务也会回滚；
2. REQUIRED_NEW中两个事务互不影响；
3. NESTED基于数据库的SAVEPOINT实现嵌套事务；
4. 事务T1内嵌 `NESTED` 式的事务T2，T2又调用 `REQUIRED` 式的事务T3时，T3和T2是同一个事务

#### Implementation

##### Programmatic

略

##### @Transactional

Spring中可以用 `@Transactional` 注解声明事务，通过AOP的方式调用 `TransactionInterceptor.invoke`，进行事务的处理，`PlatformTransactionManager` 管理事务的提交和回滚。

**Notes**: 因为实现方式是AOP，所以同一个类中的方法调用时，被调用的方法上的 `@Transactional` 注解无效 

#### FAQ

##### `rollback-only` Exception

**E**: `org.springframework.transaction.UnexpectedRollbackException: Transaction rolled back because it has been marked as rollback-only`

**S**: 在嵌套的事务中，如果使用了默认的事务传播方式，内层事务和外层事务其实是一个事务，当内层事务抛出异常时，Spring会将当前事务标记为“rollback-only”，如果外层事务捕获并正常提交时，就会出现rollback-only异常。

- 如果希望内层事务抛出异常时中断程序执行，直接在外层事务抛出异常
- 如果希望程序正常执行结束，并且在结束时全部提交，则在内层事务中进行异常捕获处理
- 如果希望内层事务回滚，不影响外层事务，应设置内层事务传播方式为*NESTED*

#### References

1. [RCA: Spring 事务 rollback-only异常 - 知乎](https://zhuanlan.zhihu.com/p/32720499)
2. [记一次事务的坑 Transaction rolled back because it has been marked as rollback-only - 云扬四海](https://yunlongn.github.io/2019/05/06/%E8%AE%B0%E4%B8%80%E6%AC%A1%E4%BA%8B%E5%8A%A1%E7%9A%84%E5%9D%91Transaction-rolled-back-because-it-has-been-marked-as-rollback-only/)