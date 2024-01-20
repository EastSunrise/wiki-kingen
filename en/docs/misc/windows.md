#### Windows Commands

To find information about a specific command, search [here](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands).

##### Syntax

- `text` means exact input
- `<required>` means the arg is required
- `[option]` means the arg is optional
- `{option1|option2}` means to choose one from the options
- `...` means repeating the former one

##### List of Commands

- `ren [<Drive>:][<Path>]<FileName1> <FileName2>` rename files or directories, same as `rename`. 

##### Program

1. 用户账户 netplwiz
2. 启动菜单 shell:startup：添加exe快捷方式，exe添加到自启动
3. 计算器 calc
4. 任务计划程序 taskschd.msc
5. 系统配置 msconfig
6. 文件资源管理器 explorer
7. 注册表 regedt32
8. 任务管理器 taskmgr
9. 资源监视器 resmon
10. 性能监视器 perfmon
11. Internet选项 inetcpl.cpl
12. 控制面板 control
13. 程序与功能 appwiz.cpl
14. 事件查看器 eventvwr
15. 系统信息 msinfo32
16. 计算机管理 compmgmt.msc
17. Windows版本 winver

##### 命令

1. 查看所有进程 netstat –ano
2. 查询占用了8080端口的进程 netstat -ano|findstr "8080"
3. 查找进程号对应的进程名称 tasklist|findstr 3112
4. 根据进程名称杀死进程 taskkill /f /t /im /javaw.exe

##### NET

NET commands involve management of network, service, user, and so on.

###### Service

```shell
$ net start <service name>  # Administrater is required
$ net stop <service name>
```