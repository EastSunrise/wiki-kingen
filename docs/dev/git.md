## 概述

[Git](https://git-scm.com/) 是一个开源的分布式版本控制系统。

## .gitignore

### 原则

1. 忽略系统自动生成的文件，例如 `.idea` 目录；
2. 忽略编译生成的文件，例如 `.class` 文件；
3. 忽略包含私有信息的文件，例如包含密码或 `token` 的配置文件。

### 语法

1. `#` 开头为注释行;
2. An optional prefix `!` which negates the pattern. **It is not possible to re-include a file if a parent directory of that file is excluded.**
3. The slash `/` is used as the directory separator.
4. If there is a separator `/` at the end of the pattern then the pattern will only match directories.
5. `**` matches multi-directories.
6. `?` and `[]` are the same as those in regular expression.

For example:

1. `/dir` to ignore the whole directory
2. `*.zip` to ignore all the files ending with '.zip'
3. `/dir/main.txt` to ignore the specified file
4. `!/dir/main.txt` not to ignore the file

### 注意事项

**Files already tracked by Git are not affected.** To stop tracking a file that is currently tracked, use `git rm --cached`.

```shell
$ git rm -r --cached target
$ git commit -m '.gitignore'
```

## 配置 SSH

```shell
ssh-keygen -t rsa -C "example@email.com" # 生成公钥id_rsa.pub和私钥id_rsa
ssh-add id_rsa # 将私钥加入到ssh代理中，如果失败需先启动ssh-agent（建议设为自动启动）

# 将公钥添加到 Git 服务器（例如 GitHub）

ssh -T git@github.com # 测试是否成功
```

如果`git clone`失败，尝试执行以下命令，配置 Git 使用系统 SSH 而非自带的 SSH.

```shell
git config --global core.sshCommand "'C:\Windows\System32\OpenSSH\ssh.exe'"
```

## 参考

-   [官方文档](https://git-scm.com/doc)
-   [Git 教程 - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/896043488029600)
