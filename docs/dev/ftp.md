#### Overview

FTP

#### Get Started

Install a FTP server on Linux and start service:

```shell
$ yum -y install vsftpd
$ systemctl start vsftpd
$ firewall-cmd --zone=public --add-port=21/tcp [--permanent]
```

Add a user for FTP:

```shell
$ useradd <username> -s /sbin/nologin # can't log in system
$ password <username>
```

Customize relative configurations in */etc/vsftpd/vsftpd.conf* like:

```
anonymous_enable=NO

userlist_enable=YES
userlist_deny=NO
userlist_file=/etc/vsftpd/user_list
```

Then edit */etc/vsftpd/user_list*, commenting other users and adding <ftpuser> created above to specify the only user whose can access to FTP. Remember restarting the server.

**Notes**: Users in the file *ftpusers* are always forbidden for security. If `userlist_enable=NO`, all users except those in *ftpusers* are allowed to access to the server. If `userlist_enable=YES`, who can access to the server depends on the file specified by `userlist_file`. It's a blacklist when `userlist_deny=YES`, otherwise, it's a whitelist.

Access to the server (here is from Command Line):

```shell
$ ftp <ip>
$ User(ip:(none)): anonymous # it will fail if anonymous_enable is set NO.
$ password: # no password
Login successful.
ftp> 
```