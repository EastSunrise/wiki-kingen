# 数据库管理语句

## 账号管理

### CREATE USER

```sql
# 创建用户和密码，'%'指定所有host
CREATE USER 'username' @'hostname' IDENTIFIED [WITH auth_plugin] BY 'password';
```

### GRANT

```sql
GRANT ALL ON db_name.table_name TO 'username'@'hostname';
```

## SHOW

### SHOW INDEX

```sql
# 查看索引
SHOW INDEX FROM table_name FROM db_name;
```

## 参考

- [MySQL :: MySQL 8.0 Reference Manual :: 15.7 Database Administration Statements](https://dev.mysql.com/doc/refman/8.0/en/sql-server-administration-statements.html)
