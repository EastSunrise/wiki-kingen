# SQL

MqSQL 支持的 [SQL 语法](https://dev.mysql.com/doc/refman/8.0/en/sql-statements.html)

## 数据定义

### ALTER TABLE

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

## 数据库管理

### 账号管理

#### CREATE USER

```sql
# 创建用户和密码，'%'指定所有host
CREATE USER 'username' @'hostname' IDENTIFIED [WITH auth_plugin] BY 'password';
```

#### GRANT

```sql
GRANT ALL ON db_name.table_name TO 'username'@'hostname';
```

### SHOW

#### SHOW INDEX

```sql
# 查看索引
SHOW INDEX FROM table_name FROM db_name;
```

## 参考目录

- [SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/sql-statements.html)
