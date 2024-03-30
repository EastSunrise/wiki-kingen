# 函数和操作符

## 窗口函数

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
