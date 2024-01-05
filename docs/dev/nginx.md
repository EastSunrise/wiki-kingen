## 安装

预先安装，

```shell
yum install yum-utils
```

创建文件 _/etc/yum.repos.d/nginx.repo_，内容如下，

```ini
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true

[nginx-mainline]
name=nginx mainline repo
baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
```

执行安装，

```shell
yum install nginx
```

nginx 包含一个主进程和若干工作进程，可以执行以下命令，

```shell
nginx [-c nginx.conf] # 启动nginx，配置文件可选
nginx -s stop # 快速退出
nginx -s quit # 等待工作进程执行完当前请求后退出
nginx -s reload # 重新加载配置文件，启动新的工作进程，旧的工作进程等待当前请求执行完成后退出
nginx -s reopen # 重新打开日志文件
```

访问[Welcome to nginx](http://127.0.0.1/index.html)查看 nginx 是否启动成功。

## 配置

nginx 的默认主配置文件为 _nginx.conf_，目录为 _/usr/local/nginx/conf_，_/etc/nginx_ 或 _/usr/local/etc/nginx_.

修改配置文件后，可以执行`nginx -t [-c nginx.conf]`验证配置文件是否正确。

## 参考

-   [nginx documentation](http://nginx.org/en/docs/)
