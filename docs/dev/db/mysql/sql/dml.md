# DML

## DELETE

!!! Note
    清空表时，[TRUNCATE TABLE](./ddl.md#truncate-table) 比 DELETE 更快，但是其不能加锁或者在事务内执行。

```sql
# 单表删除
DELETE [LOW_PRIORITY] [QUICK] [IGNORE] FROM tbl_name [[AS] tbl_alias]
    [PARTITION (partition_name [, partition_name] ...)]
    [WHERE where_condition]
    [ORDER BY ...]
    [LIMIT row_count]

# 多表删除
DELETE [LOW_PRIORITY] [QUICK] [IGNORE]
    tbl_name[.*] [, tbl_name[.*]] ...
    FROM table_references
    [WHERE where_condition]

DELETE [LOW_PRIORITY] [QUICK] [IGNORE]
    FROM tbl_name[.*] [, tbl_name[.*]] ...
    USING table_references
    [WHERE where_condition]
```

DELETE 语句支持以下修饰符：

- LOW_PRIORITY：删除操作将会延迟执行，直到没有其他客户端读取该表。只支持表级锁。
- QUICK：对于 MyISAM 表，QUICK 会跳过索引页合并，从而加快删除操作。
- IGNORE：忽略错误，而返回警告。

DELETE 支持多表删除，例如：

```sql
# 删除 t1 和 t2 目标行
DELETE t1, t2 FROM t1 INNER JOIN t2 INNER JOIN t3
WHERE t1.id=t2.id AND t2.id=t3.id;

# 等价于
DELETE FROM t1, t2 USING t1 INNER JOIN t2 INNER JOIN t3
WHERE t1.id=t2.id AND t2.id=t3.id;
```

!!! note
    要删除的表不能在子查询中使用。

## LOAD DATA

!!! TODO

## 参考

- [MySQL :: MySQL 8.0 Reference Manual :: 15.2 Data Manipulation Statements](https://dev.mysql.com/doc/refman/8.0/en/sql-data-manipulation-statements.html)
