# DDL

## ALTER TABLE

```sql
# 添加字段
ALTER TABLE table_name ADD column_name VARCHAR(32) NOT NULL;
# 修改字段
ALTER TABLE table_name MODIFY column_name VARCHAR(64) NOT NULL;

# 添加普通索引和唯一性索引
ALTER TABLE table_name ADD INDEX idx_name ( `column_name` );
ALTER TABLE table_name ADD UNIQUE KEY ui_name ( `column_name` );
# 删除索引
ALTER TABLE table_name DROP INDEX idx_name, DROP INDEX ui_name;
```

## CREATE TABLE

### 生成列

生成列（generated columns）的值是由其他列计算得出的。

```sql
col_name data_type [GENERATED ALWAYS] AS (expr)
[VIRTUAL | STORED] [NOT NULL | NULL]
[UNIQUE [KEY]] [[PRIMARY] KEY]
[COMMENT 'string']
```

其中，`expr` 是计算生成列值的表达式，如果返回值和声明的类型不同，则会执行类型转换。`VIRTUAL` 或 `STORED` 指定生成列的存储方式：

1. `VIRTUAL`（默认）：不存储列值，在每次读取时计算得出，可以建立[二级索引](#二级索引和生成列)；
2. `STORED`：列值在插入或更新时计算并存储，占用磁盘空间，可以建立索引。

例如，定义三角形的斜边为生成列：

```sql
CREATE TABLE triangle (
    side_a DOUBLE,
    side_b DOUBLE,
    side_c DOUBLE AS (sqrt(pow(side_a, 2) + pow(side_b, 2)))
);

INSERT INTO triangle (side_a, side_b) VALUES (3, 4);

SELECT * FROM triangle;
+--------+--------+--------+
| side_a | side_b | side_c |
+--------+--------+--------+
|      3 |      4 |      5 |
```

### 二级索引和生成列

InnoDB 支持在虚拟生成列上创建二级索引（secondary indexes），此时生成列的值存储在索引中。如果该索引是一个覆盖索引（covering index），生成列的值将会从索引取，而不是动态计算。

例如，通过生成列对 JSON 字段进行间接的索引：

```sql
CREATE TABLE person (
    id INT PRIMARY KEY,
    info JSON,
    person_name VARCHAR(64) AS (info->'$.name'),
    INDEX idx_name (person_name)
)
```

## 参考

- [MySQL :: MySQL 8.0 Reference Manual :: 15.1 Data Definition Statements](https://dev.mysql.com/doc/refman/8.0/en/sql-data-definition-statements.html)
