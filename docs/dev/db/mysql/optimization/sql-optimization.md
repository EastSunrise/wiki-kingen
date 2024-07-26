# SQL 优化

## SELECT 优化

### ICP

索引条件下推（Index Condition Pushdown）优化通过索引的数据查询。当 ICP 关闭时，存储引擎按索引（符合最左前缀原则）获取数据，将其返回给 MySQL 服务层，服务层负责执行其余的 `WHERE` 条件筛选。当 ICP 打开时，除了符合最左前缀原则的索引查询字段，其他索引字段也会被下推至存储引擎，进行条件过滤，然后再返回符合条件的数据给服务层。这样就能减少服务层和引擎之间的 I/O 和服务层执行时间。

ICP 适用于以下条件：

- ICP 仅支持索引字段查询条件，可用于 range、ref、eq_ref、ref_or_null 类型访问；
- 对于 InnoDB 引擎，ICP 仅用于二级索引；
- 包含子查询或存储函数的条件无法下推；

## 参考

- [MySQL :: MySQL 8.0 Reference Manual :: 10.2.1.6 Index Condition Pushdown Optimization](https://dev.mysql.com/doc/refman/8.0/en/index-condition-pushdown-optimization.html)
