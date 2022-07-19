- [x] TODO

#### 概述

[Redis](https://redis.io/) 是一个开源的基于内存的数据库，可用作缓存，消息代理等。

#### 安装

##### Linux

执行命令 `yum install redis`，或者：

1. [下载](https://redis.io/download) Redis；
2. [上传](linux.md#upload-and-download)至 Linux 服务器；
3. 解压文件：`tar –zxvf redis-x.x.x.tar.gz`；
4. 打开已解压的目录编译：`make` 
5. Open the unzipped directory and compile Redis with `make`, *.c* files compiled to *.o* files. Install *gcc* with `yum install gcc-c++` if *gcc* is unavailable.
6. Install Redis to target directory with `make install PREFIX=/usr/local/redis`. Several executable files are available now under the target directory, such as *redis-cli*, *redis-server*.
7. Copy *redis.conf* to the installation directory. Modify relative configurations if necessary.
8. Execute *redis-server* directly to start Redis server in the front. Then execute *redis-cli* to connect to the server.
9. Configure `daemonize yes` in the *redis.conf* and start the server with the specified configuration file, so the server can run in the background.

Start Redis at startup with `systemctl enable redis`.

##### Windows

The Microsoft Open Tech group instead of the official offer [Redis for Windows](https://github.com/microsoftarchive/redis/releases). Follow the instructions to install Redis and then set Redis as Windows service.

```shell
$ redis-server --service-install [redis.windows-service.conf] --service-name [redis] --port [6380]
```

##### Notes

Set different configuration files, service names and ports for different instances of Redis if needed.

Modify `bind 127.0.0.1` when connecting remotely, otherwise the server can't be accessed to except localhost. Open the port that may be forbidden by firewall when remote connection is refused.

Connecting through *SSH* is also optional.

#### Configuration

Configure options in the *redis.conf* file.

- bind [host1] [host2]
- requirepass [password]
