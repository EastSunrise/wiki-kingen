#### Overview

[SQLite](https://sqlite.org/index.html) is a C-language and small SQL database engine.

#### Get Started

Almost every distribution of [Linux](linux.md) preinstalls SQLite. Use `sqlite3` to check and enter the prompt.

#### Commands

Commands of SQLite start with a dot `.` which doesn't end with `;`. Refer to details of all commands by `.help`.

```sqlite
-- instructions
.help
-- values of settings
.show
-- display of headers of tables
.header on
-- Left-aligned column for output
.mode column
-- schema of table 'sqlite-master'
.schema sqlite_master
```

#### Datatypes

SQLite uses a more general **dynamic** type system. In SQLite, the datatype of a value is associated with the value itself, not with its container \- the particular column in which the value is stored.

Each value stored in an SQLite database (or manipulated by the database engine) has one of the following storage classes:

- **NULL**. The value is a NULL value.
- **INTEGER**. The value is a signed integer, stored in 1, 2, 3, 4, 6, or 8 bytes depending on the magnitude of the value.
- **REAL**. The value is a floating point value, stored as an 8-byte IEEE floating point number.
- **TEXT**. The value is a text string, stored using the database encoding (UTF-8, UTF-16BE or UTF-16LE).
- **BLOB**. The value is a blob of data, stored exactly as it was input.

Any column in an SQLite version 3 database, except an [INTEGER PRIMARY KEY](https://www.sqlite.org/lang_createtable.html#rowid) column, may be used to store a value of any storage class.

##### Boolean and Datetime

SQLite does not have a separate Boolean storage class. Instead, Boolean values are stored as integers 0 (false) and 1 (true).

SQLite does not have a storage class set aside for storing dates and/or times. Instead, the built-in [Date And Time Functions](https://www.sqlite.org/lang_datefunc.html) of SQLite are capable of storing dates and times as TEXT, REAL, or INTEGER values:

- **TEXT** as ISO8601 strings ("YYYY-MM-DD HH:MM:SS.SSS").
- **REAL** as Julian day numbers, the number of days since noon in Greenwich on November 24, 4714 B.C. according to the proleptic Gregorian calendar.
- **INTEGER** as Unix Time, the number of seconds since 1970-01-01 00:00:00 UTC.

Applications can chose to store dates and times in any of these formats and freely convert between formats using the built-in [date and time functions](https://www.sqlite.org/lang_datefunc.html).

##### Type Affinity



#### Syntax

A SQLite statement ends with `;`.

##### Database

```shell
$ sqlite3 test.db # create a new db or connect to a database which points to a file named test.db
$ sqlite3 test.db .dump > test.sql # backup
$ sqlite3 test.db < test.sql # recover
```

When connecting to a database which is generally named after **main**, use ATTACH command to get connection of annother database. Names **main** and **temp**, reserved for main database and that for temporary tables and other data, are not recommended to attached as.

```sqlite
.databases 
-- output: 0 main /home/user_name/my.db

ATTACH DATABASE 'test.db' as test;
.databases
-- output: 0 main /home/user_name/my.db
-- output: 2 test /home/user_name/test.db

DETACH DATABASE test;
```

##### Tables

