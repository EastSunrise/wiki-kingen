# Nginx

## 安装

预先安装 yum 工具包：

```sh
yum install yum-utils
```

创建库文件 _/etc/yum.repos.d/nginx.repo_，内容如下：

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

最后执行以下命令即可：

```sh
yum install nginx
```

## 控制

nginx 包含一个主进程和若干工作进程，通过不同的信号 `signal` 来控制：

```shell
nginx [-c nginx.conf] # 启动nginx，配置文件可选
nginx -s stop # 快速退出
nginx -s quit # 等待工作进程执行完当前请求后退出
nginx -s reload # 热加载配置文件，启动新的工作进程执行新的配置，旧的工作进程等待当前请求执行完成后退出
nginx -s reopen # 重新打开日志文件
```

访问 [http://localhost/index.html](http://127.0.0.1/index.html) 查看 nginx 是否启动成功。

## 配置

nginx 的默认主配置文件为 _nginx.conf_，目录为 _/usr/local/nginx/conf_，_/etc/nginx_ 或 _/usr/local/etc/nginx_.

```conf
user nginx; # 运行用户
worker_processes 1; # 工作进程数
pid /var/run/nginx.pid; # pid 文件

include /etc/nginx/modules-enabled/*.conf; # 模块配置文件

events { # 事件模块
}

http { # http 模块

    access_log /var/log/nginx/access.log; # 访问日志
    error_log /var/log/nginx/error.log; # 错误日志

    server {
        listen 80;

        location / {
        }
    }

    include /etc/nginx/conf.d/*.conf; # 配置文件
    include /etc/nginx/sites-enabled/*; # 站点配置文件
}
```

nginx 配置文件指令分为两种，一种是简单指令，一种是块级指令。

简单指令包含名称和参数，以空格分隔，并以一个分号结尾，如：

```conf
listen 80; # 监听端口
```

块级指令也包含名称和参数，以空格分隔，但以花括号结束，其中包括一组子指令，称为上下文，如：

```conf
server {
    listen 80;
    server_name localhost;
}
```

修改配置文件后，可以执行`nginx -t [-c nginx.conf]`验证配置文件是否正确。

## 全局配置

```conf title="main"
env variable[=value]; # 设置环境变量
env TZ; # default

error_log file [level]; # 错误日志，main/http/mail/stream/server/location
error_log logs/error.log error; # default

include file | mask; # 引入配置文件，any
include /etc/nginx/conf.d/*.conf;
include mime.types; # 引入 nginx 预定义的 mime 类型配置文件

pid file; # pid 文件
pid logs/nginx.pid; # default

thread_pool name threads=number [max_queue=number]; # 线程池
thread_pool default threads=32 max_queue=65536; # default

user user [group]; # 运行用户
user nobody nobody; # default

worker_processes number; # 工作进程数
worker_processes 1; # default

events { # 事件模块
    worker_connections number; # 最大连接数
    worker_connections 512; # default
}

http { ... } # http 模块
```

## 通用指令

以下是 `http` 块和 `server` 块的通用指令：

```conf title="http/server"
http/server {
    merge_slashes on | off; # 是否合并连续的斜杠
    merge_slashes on; # default
}
```

以下是 `http` 块、`server` 块和 `location` 块的通用指令：

```conf title="http/server/location"
http/server/location {
    directio size | off; # 开启直接 I/O
    directio off; # default

    error_page code ... [=[response]] uri; # 错误页面

    if_modified_since off | exact | before; # 如何比较响应的修改时间和请求头 If-Modified-Since 中的时间
    if_modified_since exact; # default

    keepalive_requests number; # keep-alive 连接数上限
    keepalive_requests 1000; # default

    keepalive_time time; # keep-alive 连接处理请求的最长时间
    keepalive_time 1h; # default

    keepalive_timeout timeout [header_timeout]; # keep-alive 连接最大空闲时间，第二个参数设置响应头 "Keep-Alive: timeout=time"
    keepalive_timeout 75s; # default

    limit_rate rate; # 限制响应速度，单位为字节/秒
    limit_rate 0; # default，禁用

    log_not_found on | off; # 404 错误时是否记录日志
    log_not_found on; # default

    log_subrequest on | off; # 子请求是否记录日志
    log_subrequest off; # default

    types { ... } # MIME 类型和文件后缀的映射
}
```

### 重定向

```conf
http/server/location {
    absolute_redirect on | off; # 重定向时返回绝对路径还是相对路径
    absolute_redirect on; # default

    server_name_in_redirect on | off; # 绝对路径重定向时，是否替换原请求 hostname 为 server_name 指定的值
    server_name_in_redirect off; # default

    port_in_redirect on | off; # 绝对路径重定向时，是否返回监听的端口
    port_in_redirect off; # default
}
```

### 文件缓存

```conf
http/server/location {
    open_file_cache off; # default
    open_file_cache max=N [inactive=time];

    open_file_cache_errors on | off; # 是否缓存文件读取错误
    open_file_cache_errors off; # default

    open_file_cache_min_uses number; # inactive 周期内缓存文件最小使用次数
    open_file_cache_min_uses 1; # default

    open_file_cache_valid time; # 缓存文件检查周期
    open_file_cache_valid 60s; # default
}
```

是否开启文件缓存，包括文件描述符、文件大小和修改时间，目录存在信息，文件读取错误（比如不存在、权限不足等）。

`max` 参数指定缓存最大数量，基于 LRU 移除缓存。

示例：

```conf
{
    open_file_cache max=1000 inactive=20s;
    open_file_cache_valid 30s;
    open_file_cache_min_uses 2;
    open_file_cache_errors on;
}
```

### root

```conf
location uri {
    root path; # 为请求指定根目录，http/server/location
    root html; # default
}
```

对于以下配置，请求 `/img/example.jpg` 将会映射到 `/data/app/img/example.jpg`：

```conf
location /img/ {
    root /data/app;
}
```

### try_files

```conf
server/location {
    try_files file ... uri;
    try_files file ... =code;
}
```

依次检查文件是否存在，将第一个找到的文件返回给处理程序。文件的路径取决于 `root` 或 `alias` 与 `file` 参数。如果 `file` 参数以 `/` 结尾，则检查对应的目录。如果所有文件都不存在，则重定向到 `uri` 参数指定的路径或者返回指定的 `code` 状态码。例如：

```conf
location /images/ {
    root /data/app;
    try_files $uri $uri/ /images/default.jpg;
}
```

## http

```conf title="http"
http {
    server { # 配置虚拟服务器
    }
}
```

## server

### listen

```conf
server {
    listen address[:port] [default_server] [ssl]; # 监听地址
    listen port [default_server] [ssl]; # 监听端口
    listen *:80 | *:8000; # default
}
```

如果未配置 `listen`，默认监听 `*:80`（拥有超级用户权限），或 `*:8000`.

如果未指定端口，默认监听 80 端口。

`default_server` 参数指定 `address:port` 的默认服务器，未指定则选择第一个。

`ssl` 参数指定是否启用 SSL：

```conf
server {
    listen 80;
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /path/to/example.crt;
    ssl_certificate_key /path/to/example.key;
}
```

### server_name

```conf
server {
    server_name name ...;
    server_name ""; # default
}
```

设置虚拟服务器的名称，第一个是默认名称

## location

```conf title="location"
location [ = | ~ | ~* | ^~ ] uri {...}
location @name {...}
```

`location` 块用于匹配标准化后的请求 URI，并执行相关的指令。`~` 和 `~*` 是正则匹配模式，前者区分大小写，后者不区分；正则表达式可以包含捕获块，以在其他指令中使用。

对于一个请求 URI，nginx 先检查所有前缀模式块，暂存最长的匹配的前缀模式，然后按顺序检查正则模式块，使用第一个匹配的正则 `location` 块执行指令。如果找不到正则匹配，则使用之前暂存的前缀匹配。

如果上述最长的匹配的前缀模式被 `^~` 修饰，则 nginx 会跳过正则匹配，直接执行。

如果被 `=` 修饰，且 URI 与 `location` 块的 URI 相等，nginx 也会跳过检查，直接执行。

`@name` 用于命名 `location` 块，方便重定向。

### alias

```conf
location uri {
    alias path;
}
```

`alias` 指定一个 path，替换请求路径中匹配 `location` 参数的部分。对于以下配置，请求 `/img/example.jpg` 将会映射到 `/data/app/images/example.jpg`：

```conf
location /img/ {
    alias /data/app/images/;
}
```

如果 `location` 使用正则匹配，则应当包含捕获块，且在 `alias` 参数中引用，比如：

```conf
location ~ /img/(.+\.(?:jpg|png)) {
    alias /data/app/images/$1;
}
```

如果 `location` 参数是 `alias` 的后缀部分，即 `path.endsWith(uri)`，使用 [root](#root) 代替更好。

```conf
location /images/ {
    alias /data/app/images/;
}

等价于

location /images/ {
    root /data/app;
}
```

### proxy_pass

```conf
location uri {
    proxy_pass URL; # 代理服务器地址
}
```

- 如果 `proxy_pass` 参数不包含 path，请求路径将以原始格式传递给目标服务器。如果原始请求被改变（比如 `rewrite`），则传递改变后的请求路径。

```conf
location /name/ {
    proxy_pass http://example.com:8080;
}
```

- 如果 `proxy_pass` 参数包含 path，则请求路径匹配 `location` 参数的部分被替换为该 path，然后传递给目标服务器。

```conf
location /name/ {
    proxy_pass http://example.com:80/remote/;
}
```

替换示例如下表，其中代码块代表匹配或替换的部分：

| location | 请求 URI     | proxy_pass     | 转发路径             | 说明                                                                          |
| -------- | ------------ | -------------- | -------------------- | ----------------------------------------------------------------------------- |
| /name/   | `/name/`abc  | ...:80/remote/ | ...:80`/remote/`abc  | 替换                                                                          |
| /name    | `/name`/abc  | ...:80/remote  | ...:80`/remote`/abc  | 替换                                                                          |
| /name/   | `/name/`abc  | ...:80/remote  | ...:80`/remote`abc   | 替换                                                                          |
| /name/   | `/name//`abc | ...:80/remote  | ...:80`/remote`abc   | 如果配置了 `merge_slashes on`，nginx 会先将请求标准化为 `/name/abc`，处理同上 |
| /name    | `/name`/abc  | ...:80/remote/ | ...:80`/remote/`/abc | 取决于目标服务器如何处理 `//`                                                 |
| /name    | `/name`abc   | ...:80/remote/ | ...:80`/remote/`abc  | 替换                                                                          |

- 如果 `location` 使用正则匹配，或者使用 `@name`，则 `proxy_pass` 参数不能包含 path.

- 如果请求路径在 `location` 块内被改写，则传递改变后的请求路径：

```conf
location /name/ {
    rewrite /name/([^/]+) /users?name=$1 break;
    proxy_pass http://example.com:80;
}
```

- 如果 `proxy_pass` 参数包含 path，且使用变量，则替换原始请求路径：

```conf
location /name/ {
    proxy_pass http://example.com:80$request_uri;
}
```

## 参考

- [Beginner’s Guide](https://nginx.org/en/docs/beginners_guide.html)
- [Core functionality](https://nginx.org/en/docs/ngx_core_module.html)
- [Module ngx_http_core_module](https://nginx.org/en/docs/http/ngx_http_core_module.html)
