### 安装

预先安装，

```shell
yum install yum-utils
```

创建文件 */etc/yum.repos.d/nginx.repo*，内容如下，

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

### 参考

- [nginx documentation](http://nginx.org/en/docs/)