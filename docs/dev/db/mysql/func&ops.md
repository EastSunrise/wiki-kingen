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

## Window

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
