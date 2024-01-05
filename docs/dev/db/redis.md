## 概述

[Redis](https://redis.io/) 是一个开源的基于内存的数据库，可用作缓存，消息代理等。

## 安装

### Linux

执行命令 `yum install redis`，或者：

1. [下载](https://redis.io/download) Redis；
2. [上传](../linux.md#upload-and-download)至 Linux 服务器；
3. 解压文件：`tar –zxvf redis-x.x.x.tar.gz`；
4. 打开已解压的目录编译：`make`（如果非 _gcc_ 环境，执行 `yum install gcc-c++` 安装 _gcc_）；
5. 安装 Redis 到指定目录：`make install PREFIX=/usr/local/redis`；
6. 复制 _redis.conf_ 到安装目录，并修改相关参数；
7. 执行 _redis-server_ 启动 Redis 服务器，执行 _redis-cli_ 连接服务器；
8. 修改 _redis.conf_ 配置 `daemonize yes` 可以让服务器在后台运行；
9. 开机启动：`systemctl enable redis`.

### Windows

下载 [Redis for Windows](https://github.com/microsoftarchive/redis/releases)，执行以下命令将 Redis 设为 Windows 服务：

```shell
redis-server --service-install [redis.windows-service.conf] --service-name [redis] --port [6380]
```

## 配置

_redis.conf_ 配置项：

- bind [host1] [host2]
- requirepass [password]

## 命令

参考 [Commands | Redis](https://redis.io/commands/).

## FAQ

必要时创建不同的配置文件，配置不同的服务名和端口，以创建多个 Redis 服务器实例。

远程连接时，修改参数 `bind 127.0.0.1`。如果仍然无法连接，检查端口访问是否被防火墙禁止。
