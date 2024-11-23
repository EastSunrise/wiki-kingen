# 查询执行计划

MySQL 提供 `EXPLAIN` 语句来查看查询语句经过查询优化器优化后的执行计划，支持 `SELECT, DELETE, INSERT, REPLACE, UPDATE` 语句。

## EXPLAIN

| 字段          | 说明                                               |
| :------------ | :------------------------------------------------- |
| id            | 每个 `SELECT` 对应一个 ID，多个记录可能是同一个 ID |
| select_type   | `SELECT` 类型                                      |
| table         | 输出行的表                                         |
| partitions    | 匹配的分区                                         |
| type          | 联表类型                                           |
| possible_keys | 可能用到的索引                                     |
| key           | 实际用到的索引                                     |
| key_len       | 索引长度                                           |
| ref           | 索引列                                             |
| rows          | 扫描行数                                           |
| filtered      | 过滤比例                                           |

### SELECT 类型

`SELECT` 类型的可能值如下：

| 类型               | 说明                                                |
| :----------------- | :-------------------------------------------------- |
| SIMPLE             | 简单查询，不包含 `UNION` 或子查询                   |
| PRIMARY            | 包含 `UNION` 或子查询的查询的第一个 `SELECT`        |
| UNION              | `UNION` 查询中第二个及之后的 `SELECT`               |
| DEPENDENT UNION    | `UNION` 查询中第二个及之后的 `SELECT`，依赖外部查询 |
| UNION RESULT       | `UNION` 查询生成的临时表                            |
| SUBQUERY           | 子查询内的第一个 `SELECT`                           |
| DEPENDENT SUBQUERY | 子查询内的第一个 `SELECT`，依赖外部查询             |
| DERIVED            | 派生表                                              |
| DEPENDENT DERIVED  | 派生表，依赖外部查询                                |
| MATERIALIZED       | 将子查询和外部查询连接                              |

#### SIMPLE

以下连接查询语句，不包含 `UNION` 或子查询，因此三条记录都是 `SIMPLE` 类型：

```sql
EXPLAIN
SELECT * FROM blog b
LEFT JOIN relation r ON b.id = r.blog_id
LEFT JOIN author a ON r.author_id = a.id;
```

| id  | select_type | table | partitions | type   | possible_keys | key     | key_len | ref               | rows | filtered | Extra       |
| :-- | :---------- | :---- | :--------- | :----- | :------------ | :------ | :------ | :---------------- | :--- | :------- | :---------- |
| 1   | SIMPLE      | b     |            | ALL    |               |         |         |                   | 1    | 100.00   |             |
| 1   | SIMPLE      | r     |            | ref    | PRIMARY       | PRIMARY | 4       | study.b.id        | 1    | 100.00   | Using index |
| 1   | SIMPLE      | a     |            | eq_ref | PRIMARY       | PRIMARY | 4       | study.r.author_id | 1    | 100.00   |             |

#### PRIMARY/UNION/UNION RESULT

以下语句使用了 `UNION` 关键字，其中第一个查询是 `PRIMARY` 类型，其余查询是 `UNION` 类型，最后的 `UNION RESULT` 表示进行去重处理生成了临时表：

```sql
EXPLAIN
SELECT * FROM blog b1 WHERE b1.id < 4
UNION
SELECT * FROM blog b2 WHERE b2.id > 3;
```

| id  | select_type  | table      | partitions | type  | possible_keys | key     | key_len | ref | rows | filtered | Extra           |
| :-- | :----------- | :--------- | :--------- | :---- | :------------ | :------ | :------ | :-- | :--- | :------- | :-------------- |
| 1   | PRIMARY      | b1         |            | range | PRIMARY       | PRIMARY | 4       |     | 1    | 100.00   | Using where     |
| 2   | UNION        | b2         |            | range | PRIMARY       | PRIMARY | 4       |     | 1    | 100.00   | Using where     |
| 3   | UNION RESULT | <union1,2> |            | ALL   |               |         |         |     |      |          | Using temporary |

如果使用 `UNION ALL`，则不会进行去重处理，不生成临时表：

```sql
EXPLAIN
SELECT * FROM blog b1 WHERE b1.id < 4
UNION ALL
SELECT * FROM blog b2 WHERE b2.id > 3;
```

| id  | select_type | table | partitions | type  | possible_keys | key     | key_len | ref | rows | filtered | Extra       |
| :-- | :---------- | :---- | :--------- | :---- | :------------ | :------ | :------ | :-- | :--- | :------- | :---------- |
| 1   | PRIMARY     | b1    |            | range | PRIMARY       | PRIMARY | 4       |     | 1    | 100.00   | Using where |
| 2   | UNION       | b2    |            | range | PRIMARY       | PRIMARY | 4       |     | 1    | 100.00   | Using where |

### JOIN 类型

## 参考

- [MySQL :: MySQL 8.0 Reference Manual :: 10.8 Understanding the Query Execution Plan](https://dev.mysql.com/doc/refman/8.0/en/execution-plan-information.html)
