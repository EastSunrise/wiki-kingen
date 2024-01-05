## 安装

下载并安装 [Python3](https://www.python.org/downloads/release/python-31013/).

更新 _pip_，

```shell
python -m pip install --upgrade pip
```

常用国内镜像：

1. 阿里云 <https://mirrors.aliyun.com/pypi/simple/>
2. 豆瓣 <https://pypi.douban.com/simple/>
3. 清华大学 <https://pypi.tuna.tsinghua.edu.cn/simple/>
4. 中国科学技术大学 <https://pypi.mirrors.ustc.edu.cn/simple/>
5. 华中科技大学 <https://pypi.hustunique.com/>

Linux 下，修改 _~/.pip/pip.conf_

```conf title="pip.conf"
[global]
index-url = https://mirrors.aliyun.com/pypi/simple/
[install]
trusted-host = https://mirrors.aliyun.com/
```

Windows 下，创建文件 _C:/Users/%username%/pip/pip.ini_

```ini title="pip.ini"
[global]
index-url = https://mirrors.aliyun.com/pypi/simple/
[install]
trusted-host = https://mirrors.aliyun.com/
```

## 打包

### py2exe

导入 `py2exe`，创建一个程序，

```python title="hello.py"
print("Hello World!")
```

在同级目录下创建打包程序

```python title="setup.py"
from distutils.core import setup
import py2exe

setup(console=['hello.py'])
```

执行 _setup.py_

```shell
python setup.py py2exe
```

_hello.exe_ 和执行上下文即被打包进 _dist_ 目录下.

### PyInstaller

导入 `pyinstaller`，创建一个程序，

```python title="hello.py"
print("Hello World!")
```

执行命令

```shell
pyinstaller hello.py
```

_hello.exe_ 和执行上下文即被打包进 _dist/hello_ 目录下.

可选项：

-   `--onefile` 或者 `-F`：打包为单个 _.exe_ 文件
-   `--windowed` 或者 `-w`：运行程序时显示窗口
-   `--name`：命名应用

## 参考

-   [Python 3.11.5 文档](https://docs.python.org/zh-cn/3/index.html)
-   [PyPI · The Python Package Index](https://pypi.org/)
-   [FrontPage - py2exe.org](http://www.py2exe.org/)
-   [setuptools documentation](https://setuptools.pypa.io/en/latest/)
-   [PyInstaller Manual — PyInstaller documentation](https://pyinstaller.org/en/stable/)
-   [Google Python Style Guide](https://google.github.io/styleguide/pyguide.html)
