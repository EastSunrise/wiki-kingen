## Windows 命令

### 语法规范

- `<required>`：必选的参数
- `[option]`：可选的参数
- `{option1|option2}`：必选的枚举类型参数，`|`为分隔符
- `...`：可重复使用多次的项
- `/?`：获取帮助
- `|`：分隔命令时表示前者的输出是后者的输入

### 命令

- 重命名：`ren [<Drive>:][<Path>]<FileName1> <FileName2>`，等价于`rename`
- 网络状态：`netstat`
- 字符串查找：`findstr`
- 进程列表：`tasklist`
- 结束进程：`taskkill`

### 其他命令

- `net`：管理网络，用户，帐户等

## Windows 程序

1. 用户账户：`netplwiz`
2. 启动菜单：`shell:startup`，添加exe快捷方式，exe添加到自启动
3. 计算器：`calc`
4. 系统配置：`msconfig`
5. 文件资源管理器：`explorer`
6. 注册表：`regedt32`
7. 任务管理器：`taskmgr`
8. 资源监视器：`resmon`
9.  性能监视器：`perfmon`
10. Internet选项：`inetcpl.cpl`
11. 控制面板：`control`
12. 程序与功能：`appwiz.cpl`
13. 事件查看器：`eventvwr`
14. 系统信息：`msinfo32`
15. 计算机管理：`compmgmt.msc`
16. Windows版本：`winver`

### 任务计划程序

打开 `taskschd.msc`，创建基本任务。

## FAQ

### 彻底格式化（不可恢复）

1. 执行格式化，取消勾选*快速格式化*；
2. 将简单文件写满磁盘，即写入数据覆盖；
3. 重复上述两个步骤三次以上（格式化时选择不同的**分配单元大小**）。

## 参考

- [Windows 命令](https://docs.microsoft.com/zh-cn/windows-server/administration/windows-commands/windows-commands)