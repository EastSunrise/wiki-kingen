# SQL

MqSQL 支持的 [SQL 语法](ttps://dev.mysql.com/doc/refman/8.0/en/sql-statements.html)

## 数据定义

### ALTER TABLE

```sql
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
  - [Data Definition Statements](https://dev.mysql.com/doc/refman/8.0/en/sql-data-definition-statements.html)
  - [Data Manipulation Statements](https://dev.mysql.com/doc/refman/8.0/en/sql-data-manipulation-statements.html)
  - [Database Administration Statements](https://dev.mysql.com/doc/refman/8.0/en/sql-server-administration-statements.html)
    - [Account Management Statements](https://dev.mysql.com/doc/refman/8.0/en/account-management-statements.html)
    - [SHOW Statements](https://dev.mysql.com/doc/refman/8.0/en/show.html)
