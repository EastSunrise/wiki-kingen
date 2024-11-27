# Tools

## mongoimport

```sh
mongoimport <options> <connection-string> <file>
```

### 连接选项

`--uri=<connection-string>` 指定连接地址，格式为 `--uri="mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]"`.

!!! note
    如果 `--uri` 指定的参数和其他选项不能有冲突，比如不能同时指定 `--host`.

`--host=<hostname><:port>, -h=<hostname><:port>` 指定主机名及端口号，默认为 `localhost:27017`.

`--port=<port>` 指定端口号，默认为 `27017`.

`--username=<username>, -u=<username>` 指定用户名。

`--password=<password>, -p=<password>` 指定密码。

### 命名空间选项

`--db=<database>, -d=<database>` 指定数据库名。

`--collection=<collection>, -c=<collection>` 指定集合名（必选）。

### 导入选项

`--fields=<field1[,field2]>, -f=<field1,[field2]>, --fieldFile=<filename>` 指定导入字段，以逗号分隔，仅适用 CSV 或 TSV 格式。

`--file=<filename>` 指定导入的文件名。

`--type=<json|csv|tsv>` 指定导入的文件类型，默认为 JSON.

`--headerline` 将导入文件的第一行作为字段名，仅适用 CSV 或 TSV 格式。

`--mode=<insert|upsert|merge|delete>` 指定导入模式，默认为 `insert`。

`--upsertFields=<field1[,field2]>` 指定查询匹配字段，适用于导入模式为 `upsert, merge, delete`，默认为 `_id`.

## mongoexport

mongoexport 可以将 MongoDB 的数据导出为 JSON 或 CSV 格式。

```sh
mongoexport --collection=<coll> <options> <connection-string>
```

以下选项同 mongoimport：

- [连接选项](#连接选项)
- [命名空间选项](#命名空间选项)

### 导出选项

`--fields=<field1[,field2]>, -f=<field1,[field2]>, --fieldFile=<filename>` 指定导出字段，以逗号分隔，默认为所有字段。

对于 CSV 格式，mongoexport 只导出指定的字段和子文档的字段，所以必须指定字段选项。例如：

```sh
mongoexport -d=test -c=test --fields=name,age,address.city --type=csv
```

对于 JSON 格式，mongoexport 会导出目标字段和 `_id`。如果字段在子文档中，则导出该子文档的所有字段，不仅仅是指定的字段。

`--query=<JSON>, -q=<JSON>, --queryFile=<filename>` 指定查询条件，格式为 `'{...}'`，例如：

```sh
mongoexport -d=test -c=test --query='{"name": "John"}'
```

`--type=<json|csv>` 指定导出的文件类型，JSON 或 CSV，默认为 JSON.

`--out=<file>, -o=<file>` 指定导出的文件名，默认输出到 `stdout`.

`--noHeaderLine` 不输出 CSV 文件的标题行。

`--skip=<number>` 指定跳过的记录数。`--limit=<number>` 指定导出的最大记录数。

`--sort=<JSON>` 指定排序规则，格式为 `'{...}'`。如果索引不支持该排序规则，则导出结果必须小于 32MB。

## 参考

- [The MongoDB Database Tools Documentation - MongoDB Database Tools](https://www.mongodb.com/docs/database-tools/)
