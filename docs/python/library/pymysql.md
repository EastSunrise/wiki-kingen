#### Overview

Connect to [MySQL](../../dev/mysql/index.md) with [Python](../index.md).

#### PyMySQL

Install it with `pip install PyMySQL`.

To access to MySQL, get connection to the database first and then execute relative SQLs with **cursor**. Following is an example.

```Python
import pymysql.cursors

connection = pymysql.connect(host='localhost', port=3306, user='root', password='1234', database='example')
cursor = connection.cursor()
sql = 'select * from example.user'
cursor.execute(sql)
results = cursor.fetchall()
for result in results:
    print(result)

cursor.close()
connection.close()
```

#### References

1. [python 如何连接mysql-Python学习网](https://www.py.cn/jishu/jichu/13155.html)