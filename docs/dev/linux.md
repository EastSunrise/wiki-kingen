- [x] TODO

#### 概述

Linux 是一种开源的类 Unix 操作系统，包括许多不同的版本，诸如 [CentOS](https://www.centos.org/)、[Ubuntu](https://ubuntu.com/) 等。

#### 安装

下载 CentOS 的 [ISO](https://www.centos.org/download/)。除了服务器，也可以安装在虚拟机上，比如 [VMware](https://www.vmware.com/cn)。

##### 远程连接

使用 [XShell](https://www.netsarang.com/zh/xshell-download/) 可以通过 **SSH**（Linux 通常自带 SSH）远程连接 Linux 服务器。查看 SSH 状态：`service sshd status`，如果没有，可以按照如下命令安装：

```bash
yum install openssh-server	# 安装 SSH
vim /etc/ssh/ssh_config	 # 编辑配置文件
/bin/systemctl start sshd.service  # 启动 SSH 服务
/bin/systemctl enable sshd.service  # 开机自启动
```

大部分的远程连接（比如 [MySQL](mysql/index.md) 和 [Redis](database/redis.md)）都支持 SSH，此时，SSH 需要配置为允许 TCP 连接：`AllowTcpForwarding yes`。

##### 镜像

国内可以修改软件服务镜像为 aliyun：

```bash
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo # base
wget -O /etc/yum.repos.d/epel-7.repo http://mirrors.aliyun.com/repo/epel-7.repo  # epel
yum clean all  # 更新镜像
yum makecache  # 创建缓存
```

##### 目录结构

**RPM** 结构的目录结构通常设置如下：

- */etc*: 配置文件
- */usr/bin*: 可执行文件
- */usr/lib*: 动态库
- */usr/share/doc*: 用户文档
- */usr/share/man*: 帮助文档

#### Get Started

Linux 是一个权限管理的多用户系统. 使用命令 `su` 从普通用户切换为 *root* 身份，使用命令 `exit` 以退出。

##### 开发工具

安装常见的开发工具

```bash
yum -y groupinstall "Development tools"
yum install -y bash-completion vim lrzsz wget expect net-tools nc nmap tree dos2unix htop iftop iotop unzip telnet sl psmisc nethogs glances bc
```

#### System and Partitions

**Each hardware device in Linux is regarded as a file**. They are almost all under */dev* directory.

##### Service

Relative commands are shown as follows:

```shell
$ /bin/systemctl start <service>
$ service <service> status
$ /bin/systemctl enable <service> # start at startup
```

#### User and Privilege

- `id` show ids
- `useradd` add a new user
- `passwd [username]` change password for users

#### Files and Directories Management

##### Path

Absolute paths start with the **root path** */*, such as */usr/share/doc*. But on the contrary, relative paths don't start with */*, *share/etc* for example.

##### Commands

Use *-help* to list some options of the command or use *man*/*info* commands to show details, such as *man cd*. Following are some common commands.

###### Directory

- `cd` change directory
- `pwd` print working directory
- `mkdir` make a directory by a level. Append *-p* after the command if recursion is required.
- `rmdir` remove an empty directory by a level. Append *-p* if recursion is required.

###### Operator

- `ls` list
- `cp` copy
- `rm` remove
- `mv` move

###### Text Document

- `cat` concatenate content of file
- `tac` concatenate content in reverse direction
- `nl` print with line numbers
- `more` print one page. Click *Space* to next page or *Enter* to next line.
- `less` familiar to `more`
- `head` defaults to the first 10 lines
- `tail` familiar to `head`

##### Upload and Download

Install toolkit *rz* and *sz* by `yum install lrzsz`. Then use commands `rz` to upload or `sz` to download. Target files will be upload to current directory.

#### Vim

#### Misc

##### Firewall

The service name is **firewalld** and the command is **firewall-cmd**.

Open the specific port when remote connections are refused.

```shell
$ firewall-cmd --zone=public --add-port=<port/tcp> [--permanent]
```

#### FAQ

##### Pane is dead

If it occurs to *Pane is dead* when installing, open settings of hardwares and then change *CD/DVD (IDE)* connection to the path of the ISO file.

##### Connect to Internet

If failed, open settings of current network connection of the host and allow *Internet Connection Sharing*.

##### Static IP

Edit the */etc/sysconfig/network-scripts/ifcfg-ens33* file:

```
BOOTPROTO="static"
IPADDR=<ip>
NETMASK=255.255.255.0
GATEWAY=<gateway> # same as that of the host
DNS1=<dns1> # also same as those of the host
DNS2=<dns2>
```

#### References

1. [Linux 教程 | 菜鸟教程](https://www.runoob.com/linux/linux-tutorial.html)
2. 鸟哥的Linux私房菜\i
