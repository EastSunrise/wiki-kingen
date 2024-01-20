#### Overview

Learn [MySQL](https://www.mysql.com/). Here are the [documentations](https://dev.mysql.com/doc/) and [Chinese version](https://www.mysqlzh.com/) .

#### Installation

See more details [here](https://dev.mysql.com/doc/refman/5.7/en/installing.html).

##### Linux

Select and download the repository package from [the Download Yum Repository page](https://dev.mysql.com/downloads/repo/yum/) and then install the repository.

```shell
$ wget https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm

$ yum install mysql80-community-release-el7-3.noarch.rpm
```

List all subrepositories of different series and their status. Enable the specific series instead of default one.

```shell
$ yum repolist all | grep mysql

$ yum-config-manager --disable mysql80-community
$ yum-config-manager --enable mysql57-community
```

If `yum-config-manager` is not found, install the command from *yum-utils* with `yum install yum-utils`. Or edit manually the */etc/yum.repos.d/mysql-community.repo* file to change the release series. Just find the entry of the subrepository and then modify the value of property *enabled*.

Now, install MySQL and then start the MySQL server.

```shell
$ yum install mysql-community-server

$ /bin/systemctl start mysqld
```

At the initial start up of the server,

- The server is initialized.
- SSL certificate and key files are generated in the data directory.
- Plugin [validate_password](https://dev.mysql.com/doc/refman/5.7/en/validate-password.html) is installed and enabled by default which requires that passwords contain at least one uppercase letter, one lowercase letter, one digit, and one special character, and that the total password length is at least 8 characters.
- A superuser account 'root'@'localhost is created. A password for the superuser is set and stored in the error log file. Reveal it with `grep 'temporary password' /var/log/mysqld.log`.

Change the root password as soon as possible.

```shell
$ mysql -u root -p # login
mysql> alter user 'root'@'localhost' identified by '<new password>'; # change the password
```

##### Verification

Check the version information of installed MySQL server and global variables. Append `-uroot -p` to connect as *root* if necessary.

```shell
$ mysqladmin version
$ mysqladmin variables
```

##### Remote Connection

*SSH* is recommended. To connect not through *SSH*, update the table *mysql.user* to add hosts to a specific user. Open the port of firewall if needed.

```sql
grant <priv1，priv2...> on <database>.<table> to <user>@'<host/ip>' identified by '<password>';

eg:
grant all privileges on *.* to '<user>'@'<host>' identified by '<password>';

flush privileges; -- flush tables related to privileges
```

#### Configuration

Edit the configuration file */etc/my.cnf* or */etc/mysql/my.cnf*.
