# PyMySQL

Connect to [MySQL](../../dev/db/mysql/index.md) with [Python](../index.md).

## Installation

```sh
pip install pymysql
```

## Usage

To access to MySQL, get connection to the database first and then execute relative SQLs with **cursor**. Following is an example.

```python
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

## References

- [PyMySQL documentation](https://pymysql.readthedocs.io/en/latest/)
