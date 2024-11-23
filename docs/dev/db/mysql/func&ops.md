# 函数和操作符

## Flow Control

`IF(expr1, expr2, expr3)`：如果 `expr1` 为真（`expr1 <> 0 and expr1 IS NOT NULL`），则返回 `expr2`，否则返回 `expr3`。

```sql
SELECT IF(1, 1, 0); -- 1
```

`IFNULL(expr1, expr2)`：如果 `expr1` 为 `NULL`，则返回 `expr2`，否则返回 `expr1`。

## JSON

### 检索 JSON

`JSON_CONTAINS` 检查 `target` 是否包含 `candidate`，如果是，返回 1，否则返回 0。如果有参数为 `NULL`，则返回 `NULL`。

```sql
JSON_CONTAINS(target, candidate [, path])

SELECT JSON_CONTAINS('{"a": 1, "b": 2}', '1', '$.a'); -- 1
SELECT JSON_CONTAINS('{"a": 1, "b": 2}', '1', '$.b'); -- 0
SELECT JSON_CONTAINS('{"a": 1, "c": {"d": 4}}', '{"d": 4}', '$.c'); -- 1
```

`JSON_EXTRACT` 提取 `target` 中 `path` 对应的部分。如果有参数为 `NULL`，或者 `path` 不存在，则返回 `NULL`。

```sql
JSON_EXTRACT(target, path [, path ...])

SELECT JSON_EXTRACT('{"a": 1, "b": 2}', '$.a'); -- 1
SELECT JSON_EXTRACT('{"a": 1, "b": 2}', '$.b'); -- 2
SELECT JSON_EXTRACT('[10, 20, [30, 40]]', '$[1]', '$[0]'); -- [10, 20]
```

`column->path` 等价于 `JSON_EXTRACT(column, path)`。

```sql
SELECT c, JSON_EXTRACT(c, '$.a') FROM example;
SELECT c, c->'$.a' FROM example;
```

`column->>path` 等价于 `JSON_UNQUOTE(column->path)`，等价于 `JSON_UNQUOTE(JSON_EXTRACT(column, path))`。

## Aggregate

## Window

Window 函数和[聚合函数](#aggregate)的区别在于，前者对每一个数据行都生成一个计算结果，而后者每个分组只有一个结果。

Window 函数使用 `OVER` 关键字对数据行分组，只用于 `SELECT` 列和 `ORDER BY` 列，在 `WHERE`，`GROUP BY`，`HAVING` 之后，在 `ORDER BY`，`LIMIT`，`SELECT DISTINCT` 之前执行。

```sql
over_clause:
    {OVER (window_spec) | OVER window_name}

window_spec:
    [window_name] [partition_clause] [order_clause] [frame_clause]

partition_clause:
    PARTITION BY expr [, expr] ...

order_clause:
    ORDER BY expr [ASC|DESC] [, expr [ASC|DESC]] ...
```

如果 `OVER()` 不带参数，则使用默认的窗口，即整个数据集。

- `window_name`：窗口名称，用于引用窗口；
- `partition_clause`：`PARTITION BY` 语句，作为分组条件，默认为整个数据集；
- `order_clause`：`ORDER BY` 语句，作为分组的排序条件，升序时 `NULL` 在前，倒序时 `NULL` 在后；

MySQL 支持以下 Window 函数：

| 名称           | 描述                                        |
| -------------- | ------------------------------------------- |
| `RANK()`       | 当前行在分组内的排名，从 1 开始，包含间隔   |
| `DENSE_RANK()` | 当前行在分组内的排名，从 1 开始，不包含间隔 |
| `ROW_NUMBER()` | 当前行在分组内的行号，从 1 开始             |

### RANK()/DENSE_RANK()/ROW_NUMBER()

| id  | score |
| --- | ----- |
| 1   | 20    |
| 2   | 30    |
| 3   | 20    |
| 4   | 10    |

```sql
# 排名，rank() 带间隔，dense_rank() 连续
SELECT id,
       score,
       row_number() over w AS 'row_number',
       rank()       over w AS 'rank',
       dense_rank() over w AS 'dense_rank'
FROM game window w AS ( ORDER BY score DESC );
```

| id  | score | row_number | rank | dense_rank |
| --- | ----- | ---------- | ---- | ---------- |
| 2   | 30    | 1          | 1    | 1          |
| 1   | 20    | 2          | 2    | 2          |
| 3   | 20    | 3          | 2    | 2          |
| 4   | 10    | 4          | 4    | 3          |

## 参考

- [Functions and Operators](https://dev.mysql.com/doc/refman/8.0/en/functions.html)
