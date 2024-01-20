# Linux

With the same [Linux Kernel](https://www.kernel.org/), there are different distributions of Linux based on different modes of software management, such as [CentOS](https://www.centos.org/) based on *RPM* and [Ubuntu](https://ubuntu.com/) on *DPKG*.

## Installation

Download and install [CentOS](https://www.centos.org/download/) ISO. Without a server, [VMware](https://www.vmware.com/cn) is an option where to install the system.

### Remote Connection

If the system needs to be connected to remotely, [XShell](https://www.netsarang.com/zh/xshell-download/) is a fine tool and *SSH* which is commonly configured on the Linux is required. Check with `service sshd status`. If not, execute following commands in order:

- `yum install openssh-server` installs *SSH*
- `vim /etc/ssh/ssh_config` edits the configuration file
- `/bin/systemctl start sshd.service` starts *SSH* service
- `/bin/systemctl enable sshd.service` starts the service at startup.

Most remote connections like [MySQL](db/mysql/index.md) and [Redis](db/redis.md) support connection through *SSH*. In this case, `AllowTcpForwarding yes` is required to set in the */etc/ssh/sshd_config*.

### Mirror

Change mirror to aliyun:

- base: `wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo`
- epel: `wget -O /etc/yum.repos.d/epel-7.repo http://mirrors.aliyun.com/repo/epel-7.repo`

Execute `yum clean all` to update mirrors and `yum makecache` to create caches.

### Directory

Directories of **RPM** are commonly set as following by default:

- */etc*: configuration files
- */usr/bin*: executable files
- */usr/lib*: dynamic libraries
- */usr/share/doc*: use documentations
- */usr/share/man*: man page files

## Get Started

Linux is a multi-user system with limits of authority. Use `su` command to access system as *root* when logging in as a common user and `exit` to get back.

### Development Tools

Install common development tools.

```shell
yum -y groupinstall "Development tools"
yum install -y bash-completion vim lrzsz wget expect net-tools nc nmap tree dos2unix htop iftop iotop unzip telnet sl psmisc nethogs glances bc
```

## System and Partitions

**Each hardware device in Linux is regarded as a file**. They are almost all under */dev* directory.

### Service

Relative commands are shown as follows:

```shell
/bin/systemctl start <service>
service <service> status
/bin/systemctl enable <service> # start at startup
```

## User and Privilege

- `id` show ids
- `useradd` add a new user
- `passwd [username]` change password for users

## Files and Directories Management

### Path

Absolute paths start with the **root path** */*, such as */usr/share/doc*. But on the contrary, relative paths don't start with */*, *share/etc* for example.

### Commands

Use *-help* to list some options of the command or use *man*/*info* commands to show details, such as *man cd*. Following are some common commands.

## Directory

- `cd` change directory
- `pwd` print working directory
- `mkdir` make a directory by a level. Append *-p* after the command if recursion is required.
- `rmdir` remove an empty directory by a level. Append *-p* if recursion is required.

## Operator

- `ls` list
- `cp` copy
- `rm` remove
- `mv` move

## Text Document

- `cat` concatenate content of file
- `tac` concatenate content in reverse direction
- `nl` print with line numbers
- `more` print one page. Click *Space* to next page or *Enter* to next line.
- `less` familiar to `more`
- `head` defaults to the first 10 lines
- `tail` familiar to `head`

### Upload and Download

Install toolkit *rz* and *sz* by `yum install lrzsz`. Then use commands `rz` to upload or `sz` to download. Target files will be upload to current directory.

## Vim

## Misc

### Firewall

The service name is **firewalld** and the command is **firewall-cmd**.

Open the specific port when remote connections are refused.

```shell
firewall-cmd --zone=public --add-port=<port/tcp> [--permanent]
```

## FAQ

### Pane is dead

If it occurs to *Pane is dead* when installing, open settings of hardwares and then change *CD/DVD (IDE)* connection to the path of the ISO file.

### Connect to Internet

If failed, open settings of current network connection of the host and allow *Internet Connection Sharing*.

### Static IP

Edit the */etc/sysconfig/network-scripts/ifcfg-ens33* file:

```conf
BOOTPROTO="static"
IPADDR=<ip>
NETMASK=255.255.255.0
GATEWAY=<gateway> # same as that of the host
DNS1=<dns1> # also same as those of the host
DNS2=<dns2>
```

## References

1. [Linux 教程 | 菜鸟教程](https://www.runoob.com/linux/linux-tutorial.html)
2. 鸟哥的Linux私房菜\i
