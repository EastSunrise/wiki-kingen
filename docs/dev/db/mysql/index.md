# MySQL

[MySQL](https://www.mysql.com/) 是最流行的关系型数据库管理系统之一。

## 安装

### APT

使用 APT 工具安装：

```sh
# 更新 apt 包
sudo apt update
# apt安装
sudo apt install mysql-server
# 使用systemd管理
systemctl status mysql
```

### Yum

从 Yum 包[下载页面](https://dev.mysql.com/downloads/repo/yum/)选择版本下载，然后执行安装：

```sh
# 下载包文件
wget https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm
# yum 安装包
yum install mysql80-community-release-el7-3.noarch.rpm

# 安装 mysql
yum install mysql-community-server
```

查看所有可用的版本，并选择目标版本

```sh
yum repolist all | grep mysql

yum-config-manager --disable mysql80-community
yum-config-manager --enable mysql57-community
```

> 如果找不到 `yum-config-manager` 命令，执行 `yum install yum-utils` 来安装 _yum-utils_ 工具。

最后执行安装即可，

```sh
yum install mysql-community-server
systemctl start mysqld
```

> 安装完成后，默认账号为 `'root'@'localhost'`，其密码打印在日志中，可以通过命令 `grep 'temporary password' /var/log/mysqld.log` 获取。

## FAQ

### 远程连接

修改配置文件 _/etc/my.cnf_ 或 _/etc/mysql/my.cnf_，

```txt
bind-address = 0.0.0.0
```

执行命令 `systemctl restart mysql` 重启 MySQL，并[添加远程连接账号](sql.md#账号管理)。

## 参考

- [MySQL Documentation](https://dev.mysql.com/doc/)
  - [Installing and Upgrading MySQL](https://dev.mysql.com/doc/refman/8.0/en/installing.html)
