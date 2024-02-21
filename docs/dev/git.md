# Git

[Git](https://git-scm.com/) 是一个开源的分布式版本控制系统。

## 配置 SSH

```shell
ssh-keygen -t rsa -C "example@email.com" # 生成公钥id_rsa.pub和私钥id_rsa
ssh-add id_rsa # 将私钥加入到ssh代理中，如果失败需先启动ssh-agent（建议设为自动启动）

# 将公钥添加到 Git 服务器（例如 GitHub）

ssh -T git@github.com # 测试是否成功
```

???+ note
    如果`git clone`失败，尝试执行以下命令，配置 Git 使用系统 SSH 而非自带的 SSH.
    ```shell
    git config --global core.sshCommand "'C:\Windows\System32\OpenSSH\ssh.exe'"
    ```

## 分支和合并

### branch

```sh
# 创建分支
git branch dev

# 查看分支
git branch

# 合并 dev 分支至 master 分支
git checkout master
git merge dev

# 删除分支
git branch -d dev
```

### checkout

```sh
# 切换分支
git checkout <branch_name>
# 不存在时创建
git checkout -b <branch_name>
```

### stash

```sh
# 暂存修改至当前分支
git stash
# 或
git stash save "description"

# 查看所有暂存
git stash list
# 查看指定暂存详情
git stash show stash@{1}

# 恢复最新的暂存
git stash [pop|apply]
# 恢复指定的暂存
git stash [pop|apply] stash@{1}

# 清理所有暂存
git stash clear
# 清理指定暂存
git stash drop stash@{1}
```

### tag

```sh
# 打标签到最新提交的commit
git tag <tag_name>
# 或指定的commit(可以通过 git log 查看)
git tag <tag_name> <commit_id>
# 添加说明
git tag -m <msg> <tag_name>

# 查看所有标签
git tag
# 查看指定标签详情
git show <tag_name>

# 删除指定标签
git tag -d <tag_name>

# 标签默认不会push到远程，除非
git push origin <tag_name>
# 或者推送所有标签
git push origin --tags
```

## .gitignore

### 原则

1. 忽略系统自动生成的文件，例如 `.idea` 目录；
2. 忽略编译生成的文件，例如 `.class` 文件；
3. 忽略包含私有信息的文件，例如包含密码或 `token` 的配置文件。

### 语法

1. `#` 开头为注释行;
2. `!` 把指定文件排除 `.gitignore` 规则之外；
3. `/` 为目录分隔符；
4. 以 `/` 结尾将仅匹配目录；
5. `**` 匹配多级目录；
6. `?` 和 `[]` 用法和正则表达式相同。

> 目录被排除后，无法包含其中单个文件。
>
> 已被 Git 控制的文件不受 `.gitignore` 影响，可以使用命令 `git rm -r --cached target` 移除控制。

例如:

- `/dir` 忽略整个目录
- `*.zip` 忽略所有 `.zip` 文件
- `/dir/main.txt` 忽略指定文件
- `!/dir/main.txt` 不会忽略该文件

## 参考

- [Git - Documentation](https://git-scm.com/doc)
- [Git 教程 - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/896043488029600)
