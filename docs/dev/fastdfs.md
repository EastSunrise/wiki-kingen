#### 概述

[FastFDS](https://github.com/happyfish100/fastdfs) 是一个由C语言实现的开源的轻量级分布式文件系统。

FastDFS有两个角色：Tracker，Storage：

1. Tracker 主要做调度作用，起到负载均衡的作用；负责管理所有的Storage和Group，每一个Storage再启动后会连接Tracker，告知自己所属的Group，并保持周期心跳；

2. Storage 存储节点，主要提供容量和备份服务；以Group为单位，每个Group内可以有多台Storage，数据互相备份。

#### 安装

如果 Tracker 和 Storage 在不同的机器上，则每台服务器都需要安装。

###### libfastcommon

```shell
$ wget https://github.com/happyfish100/libfastcommon/archive/V1.0.7.tar.gz
$ tar -zxvf V1.0.7.tar.gz

$ cd libfastcommon-1.0.7
$ ./make.sh
$ ./make.sh install
```

###### FastDFS

```shell
$ wget https://github.com/happyfish100/fastdfs/archive/V5.05.tar.gz
$ tar -zxvf V5.05.tar.gz

$ cd fastdfs-5.05
$ ./make.sh
$ ./make.sh install
```

安装成功后，会生成 `/etc/fdfs` 目录，包含三个配置的示例文件。

###### 配置 Tracker 和 Storage

在 `/etc/fdfs` 目录下，复制并修改配置：

```shell
$ cp tracker.conf.sample tracker.conf
$ vim tracker.conf
```

关键配置：

1. **base_path** 设置数据存储目录，例如：`/data/fastdfs/tracker`
2. **port** Tracker 服务端口，默认 22122

Tracker 服务命令

```shell
$ fdfs_trackerd /etc/fdfs/tracker.conf start
$ fdfs_trackerd /etc/fdfs/tracker.conf stop
```

启动完成后，**base_path** 对应目录下会生成 `data` 和 `log` 两个目录。

对于 Storage 配置相似，在 `/etc/fdfs` 目录下：

```shell
$ cp storage.conf.sample storage.conf
$ vim storage.conf
```

关键配置：

1. **base_path** 设置数据存储目录，例如：`/data/fastdfs/storage`
2. **port** Tracker 服务端口，默认 23000
3. **tracker_server** 对应 Tracker 的地址，即 <tracker-ip>:<tracker-port>

Storage 服务命令

```shell
$ fdfs_storaged /etc/fdfs/storage.conf start
$ fdfs_storaged /etc/fdfs/storage.conf stop
```

启动完成后，**base_path** 对应目录下也会生成 `data` 和 `log` 两个目录，其中 `data` 即是上传文件的存储目录。

###### 测试

任意机器，在 `etc/fdfs` 目录下，复制修改 client 配置：

```shell
$ cp /etc/fdfs/client.conf.sample /etc/fdfs/client.conf
$ vim /etc/fdfs/client.conf
```

关键配置：

1. **base_path** 设置日志存储目录，例如：`/data/fastdfs/client`
3. **tracker_server** 对应 Tracker 的地址，即 <tracker-ip>:<tracker-port>

上传任意文件：

```shell
$ fdfs_test /etc/fdfs/client.conf upload <文件路径>
```

返回 'example file url' 即成功，同时 Storage 存储目录下可以发现上传的文件。

###### HTTP 访问

在 Nginx 的配置中添加 `location`

```
location /group1/M00 {
    alias /data/fastdfs/storage/data;
}
```

###### 开机启动

编辑 `vim /etc/rc.d/rc.local` 添加启动命令：

```
/usr/bin/fdfs_trackerd /etc/fdfs/tracker.conf restart
/usr/bin/fdfs_storaged /etc/fdfs/storage.conf restart
```

如果失败，为该文件添加权限：

```shell
$ chmod +x /etc/rc.d/rc.local
```