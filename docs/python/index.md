#### Overview

Learn [Python](https://www.python.org/), based on [Python 3.7.6](https://www.python.org/downloads/release/python-376/) and [Python 2.7.17](https://www.python.org/downloads/release/python-2717/).

#### Installation

##### Windows

Download and install [Python2](https://www.python.org/downloads/release/python-2717/) and [Python3](https://www.python.org/downloads/release/python-376/).

Rename `python.exe` under directory of `Python 2` to `python2.exe`，`pythonw.exe` to `pythonw2.exe`

Add the directory of Python 2 and Python 3 to the system environment variables, the directory `Scripts` too.

Key step: Execute the following commands in the command line.

```shell
$ python2 -m pip install --upgrade pip --force-reinstall
$ python3 -m pip install --upgrade pip --force-reinstall
```

Input `pip2 -V` and `pip3 -V` to show the information of version.

##### Linux

Install related compilation tools.

```shell
$ yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel
$ yum install -y libffi-devel zlib1g-dev
$ yum install zlib* -y
```

Download installation package of Python. Unzip, make and install Python.

```shell
$ cd /home
$ wget wget https://www.python.org/ftp/python/3.7.6/Python-3.7.6.tar.xz
$ tar -xvJf  Python-3.7.6.tar.xz

# create installation directory
$ mkdir /usr/local/python3
$ cd Python-3.7.6
$ ./configure --prefix=/usr/local/python3 --enable-optimizations --with-ssl 
# prefix: specify installation directory
# enable-optimizations: improve efficiency
# with-ssl: include ssl to help install pip

$ make && make install
``` 

Create symbolic link  to the path

```shell
$ ln -s /usr/local/python3/bin/python3 /usr/local/bin/python3
$ ln -s /usr/local/python3/bin/pip3 /usr/local/bin/pip3
```

Verify if installed successfully.

```shell
$ python -V
$ pip -V
```

Because of command `yum` is based on built-in Python2, open the following two files to change "#! /usr/bin/python" to "#! /usr/bin/python2" to redirect to Python2.

```shell
$ vi /usr/bin/yum
$ vi /usr/libexec/urlgrabber-ext-down
```

##### Change the Mirror

###### Common Internal Mirrors

  1. 阿里云 <https://mirrors.aliyun.com/pypi/simple/>
  2. 豆瓣 <https://pypi.douban.com/simple/>
  3. 清华大学 <https://pypi.tuna.tsinghua.edu.cn/simple/>
  4. 中国科学技术大学 <https://pypi.mirrors.ustc.edu.cn/simple/>
  5. 华中科技大学 <https://pypi.hustunique.com/>

**Notes**: the newest release of Ubuntu requires mirrors from `https`.

###### Temporary

```shell
$ install -i https://pypi.tuna.tsinghua.edu.cn/simple pandas
```

###### Permanent

1. Under Linux, modify *~/.pip/pip.conf* as follows:

```shell
[global]
index-url = https://mirrors.aliyun.com/pypi/simple/
[install]
trusted-host = https://mirrors.aliyun.com/
```

2. Under Windows, create a new file *%Users%\username\pip\pip.ini* as follows:

```shell
[global]
index-url = https://mirrors.aliyun.com/pypi/simple/
[install]
trusted-host = https://mirrors.aliyun.com/
```

#### Packaging

We can use **py2exe** or PyInstaller to package scripts of Python to a executable file.

##### setuptools

TODO

##### py2exe

[py2exe](http://www.py2exe.org/) is an [Distutils](https://docs.python.org/dev/library/distutils.html) extension which converts Python scripts into executable Windows programs, able to run without requiring a Python installation.

Download py2exe for Python 2 from [SourceForge](https://sourceforge.net/projects/py2exe/files/py2exe/0.6.9/). Use pip to install that for Python 3 or download it from [PyPI](https://pypi.org/project/py2exe/).  

Create a *setup.py* under the destination directory along with *test.py*:

```python
# setup.py
from distutils.core import setup

setup(console=['test.py'])
```

Then run the *setup.py* with *py2exe* from the command line.

```shell
$ python setup.py py2exe
```

It will create two directories named ***dist*** and ***build***, including generated executable file and other files.

##### PyInstaller

PyInstaller can package Python programs to executable file under Windows, Linux, Mac OS X, Solaris and AIX.

Install it using pip or download it from its [website](http://www.pyinstaller.org/). Note that install [PyWin32](http://sourceforge.net/projects/pywin32/files/pywin32/Build%20217/) before install PyInstaller on Windows.

To package *test.py*, just run the following command from the command line:

```shell
$ pyinstaller.exe --onefile --windowed test.py
```

- *--onefile* or *-F* denotes packaging the program into one single executable file. Otherwise, libraries will be distributed as separate file.
- *--windowed* or "-w" denotes to show a window when running the generated application.
- *--name* can be used to name the application.

##### Notes

Use virtual environment to simplify the libraries. First, install *virtualenv* with pip. As follows are commands for example.

```shell
$ virtualenv example_env # create one

$ virtualenv --system-site-packages example_env # inherit global modules

$ activate # activate the environment
```
Or just use *PyCharm*.

#### Deployment

##### Local

Under local development environment, generate list of packages.

```shell
$ pip freeze > requirements.txt
```

Then upload above file and the project to the server.

##### Server

Create virtual environment and install required packages.

#### Style Guide

Refer to [PEP 8](https://www.python.org/dev/peps/pep-0008/) or [Google Python Style Guide](https://google.github.io/styleguide/pyguide.html).

#### References

1. [Python 3 Documentation](https://docs.python.org/3/)
2. [Python 3 文档](https://docs.python.org/zh-cn/3/)
3. [Python学习网](https://www.py.cn/)
4. [FrontPage - py2exe.org](http://www.py2exe.org/)
5. [Python文件如何打包成exe文件-常见问题-PHP中文网](https://m.php.cn/faq/415527.html)
6. [pip2和pip3在windows下共存问题 - 夏莅庄 - CSDN博客](https://blog.csdn.net/qq_36004598/article/details/78984879)
  7. [将pip源更换到国内镜像 - Chaser_LittleBee - CSDN博客](https://blog.csdn.net/sinat_21591675/article/details/82770360)