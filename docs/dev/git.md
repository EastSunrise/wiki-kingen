- [x] TODO

#### 概述

[Git](https://git-scm.com/) 是一个开源的分布式版本控制系统。

#### .gitignore

**Notes: **

##### 原则

1. 忽略系统自动生成的文件，例如 `.idea` 目录；
2. 忽略编译生成的文件，例如 `.class` 文件；
3. 忽略包含私有信息的文件，例如包含密码或 `token` 的配置文件。

##### Rules

1. `#` 开头为注释行;
3. An optional prefix `!` which negates the pattern. **It is not possible to re-include a file if a parent directory of that file is excluded.**
4. The slash `/` is used as the directory separator.
5. If there is a separator `/` at the end of the pattern then the pattern will only match directories.
6. `**` matches multi-directories.
7. `?` and `[]` are the same as those in regular expression.

For example:

1. `/dir` to ignore the whole directory
2. `*.zip` to ignore all the files ending with '.zip'
3. `/dir/main.txt` to ignore the specified file
4. `!/dir/main.txt` not to ignore the file

##### Notes

**Files already tracked by Git are not affected.** To stop tracking a file that is currently tracked, use `git rm --cached`.

```shell
$ git rm -r --cached target
$ git commit -m '.gitignore'
```

#### 配置SSH公钥

打开目录 `~/.ssh`, 执行 `ssh-keygen -o` 生成私钥文件 `id_dsa` 和对应的公钥文件 `id_dsa.pub`, 然后将公钥提交到 Git 服务器（例如 GitHub）。

#### 参考

1. [官方文档](https://git-scm.com/doc).
2. [Git教程 - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/896043488029600).
