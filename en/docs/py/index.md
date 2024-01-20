## Overview

Learn [Python3](https://docs.python.org/3/) and ~~[Python2](https://docs.python.org/release/2.7.18/)~~.

## Installation

### Windows

Download and install [Python2](https://www.python.org/downloads/release/python-2718/) and [Python3](https://www.python.org/downloads/).

Rename `python.exe` under directory of `Python 2` to `python2.exe`，`pythonw.exe` to `pythonw2.exe`

Add the directory of Python 2 and Python 3 to the system environment variables, the directory `Scripts` too.

Execute the following commands in the command line.

```shell
python2 -m pip install --upgrade pip --force-reinstall
python3 -m pip install --upgrade pip --force-reinstall
```

Input `pip2 -V` and `pip3 -V` to show the information of version.

### Linux

Install related compilation tools.

```shell
yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel
yum install -y libffi-devel zlib1g-dev
yum install zlib* -y
```

Download installation package of Python. Unzip, make and install Python.

```shell
cd /home
wget wget https://www.python.org/ftp/python/3.x.x/Python-3.x.x.tar.xz
tar -xvJf  Python-3.x.x.tar.xz

# create installation directory
mkdir /usr/local/python3
cd Python-3.x.x
./configure --prefix=/usr/local/python3 --enable-optimizations --with-ssl
# prefix: specify installation directory
# enable-optimizations: improve efficiency
# with-ssl: include ssl to help install pip

make && make install
```

Create symbolic link to the path

```shell
ln -s /usr/local/python3/bin/python3 /usr/local/bin/python3
ln -s /usr/local/python3/bin/pip3 /usr/local/bin/pip3
```

Verify if installed successfully.

```shell
python -V
pip -V
```

Because of command `yum` is based on built-in Python2, open the following two files to change "#! /usr/bin/python" to "#! /usr/bin/python2" to redirect to Python2.

```shell
vi /usr/bin/yum
vi /usr/libexec/urlgrabber-ext-down
```

### Change the Mirror

Following are common internal mirrors:

1. Aliyun <https://mirrors.aliyun.com/pypi/simple/>
2. Douban <https://pypi.douban.com/simple/>
3. THU <https://pypi.tuna.tsinghua.edu.cn/simple/>
4. USTC <https://pypi.mirrors.ustc.edu.cn/simple/>
5. HUST <https://pypi.hustunique.com/>

> The newest release of Ubuntu requires mirrors from `https`.

1. Under Linux, modify _~/.pip/pip.conf_ as follows:

```shell
[global]
index-url = https://mirrors.aliyun.com/pypi/simple/
[install]
trusted-host = https://mirrors.aliyun.com/
```

2. Under Windows, create a new file _%Users%\username\pip\pip.ini_ as follows:

```shell
[global]
index-url = https://mirrors.aliyun.com/pypi/simple/
[install]
trusted-host = https://mirrors.aliyun.com/
```

## Packaging

We can use **py2exe** or PyInstaller to package scripts of Python to a executable file.

### py2exe

[py2exe](http://www.py2exe.org/) is an [Distutils](https://docs.python.org/dev/library/distutils.html) extension which converts Python scripts into executable Windows programs, able to run without requiring a Python installation.

Download py2exe for Python 2 from [SourceForge](https://sourceforge.net/projects/py2exe/files/py2exe/0.6.9/). Use pip to install that for Python 3 or download it from [PyPI](https://pypi.org/project/py2exe/).

Create a _setup.py_ under the destination directory along with _test.py_:

```python
# setup.py
from distutils.core import setup

setup(console=['test.py'])
```

Then run the _setup.py_ with _py2exe_ from the command line.

```shell
python setup.py py2exe
```

It will create two directories named **_dist_** and **_build_**, including generated executable file and other files.

### PyInstaller

PyInstaller can package Python programs to executable file under Windows, Linux, Mac OS X, Solaris and AIX.

Install it using pip or download it from its [website](http://www.pyinstaller.org/). Note that install [PyWin32](http://sourceforge.net/projects/pywin32/files/pywin32/Build%20217/) before install PyInstaller on Windows.

To package _test.py_, just run the following command from the command line:

```shell
pyinstaller.exe --onefile --windowed test.py
```

-   _--onefile_ or _-F_ denotes packaging the program into one single executable file. Otherwise, libraries will be distributed as separate file.
-   _--windowed_ or "-w" denotes to show a window when running the generated application.
-   _--name_ can be used to name the application.

## Environment

Use virtual environment to simplify the libraries. First, install _virtualenv_ with pip. As follows are commands for example.

```shell
virtualenv example_env # create one

virtualenv --system-site-packages example_env # inherit global modules

activate # activate the environment
```

Or just use _PyCharm_.

## References

-   [Python 3 Documentation](https://docs.python.org/zh-cn/3/)
-   [PyPI · The Python Package Index](https://pypi.org/)
-   [FrontPage - py2exe.org](http://www.py2exe.org/)
-   [setuptools documentation](https://setuptools.pypa.io/en/latest/)
-   [PyInstaller Manual — PyInstaller documentation](https://pyinstaller.org/en/stable/)
-   [Google Python Style Guide](https://google.github.io/styleguide/pyguide.html)
