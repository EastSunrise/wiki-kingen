# MySQL Programs

## mysqlimport

mysqlimport 命令用于导入数据，实际是执行 [LOAD DATA](./sql/dml.md#load-data) 语句。

```sh
mysqlimport [options] db_name file1 [file2 ...]
```

mysqlimport 根据文件名决定导入的表名，例如，_patient.txt, patient.text, patient_ 都会导入 _patient_ 表。

`--columns=column_list, -c column_list` 指定导入的列，以逗号分隔。

`--lines-terminated-by=..., --fields-terminated-by=..., --fields-enclosed-by=..., --fields-optionally-enclosed-by=..., --fields-escaped-by=...` 分别指定行和字段分隔符，默认值如下：

```sh
--lines-terminated-by='\n'
--fields-terminated-by='\t'
--fields-enclosed-by=''
--fields-optionally-enclosed-by=''
--fields-escaped-by='\\'
```

`--user=username, -u username` 和 `--password[=password], -p[password]` 分别指定用户名和密码。注意，密码选项和参数之间不能有空格。

`--host=hostname, -h hostname` 和 `--port=port_num, -P port_num` 分别指定主机名和端口号，默认为 `localhost:3306`.

`--replace, -r` 和 `--ignore` 可以控制当唯一性索引冲突时，覆盖还是忽略重复数据。如果未指定，重复时抛出异常，并忽略剩余数据。

默认情况下，输入文件通过服务器所在主机读取，如果是相对路径，则相对于数据目录查找目标文件。`--local, -L` 指定输入文件通过本地主机读取，如果是相对路径，则相对于当前目录查找。

`--delete, -D` 在导入前先清空表。

`--force, -f` 忽略错误。

## 参考

- [MySQL :: MySQL 8.0 Reference Manual :: 6 MySQL Programs](https://dev.mysql.com/doc/refman/8.0/en/programs.html)
