#### Overview

Use standard module [logging](https://docs.python.org/zh-cn/3.7/library/logging.html) to print logs. It defines five levels of logs: *DEBUG < INFO < WARNING < ERROR < CRITICAL* and contains four basic classes: **Logger**, **Handler**, **Filter** and **Formatter**.

#### Get Started

Print simple logs by calling **module-level** functions. Following calls will print logs onto the console.

```python
import logging

logging.debug('This is a debug log.')
logging.info('This is a info log.')
logging.warning('This is a warning log.')
logging.error('This is a error log.')
logging.critical('This is a critical log.')

logging.log(logging.DEBUG, 'This is a debug log.')
```

By default, only *WARNING* or above logs will be printed onto console. To modify basic configurations, we need to call [**logging.basicConfig()**](https://docs.python.org/3/library/logging.html#logging.basicConfig) with following optional arguments.

- **filename**: target file that logs are output to.
- **filemode**: mode to open target file, 'a' by default.
- **format**: format to output logs. Refer to [LogRecord attributes](https://docs.python.org/3/library/logging.html#logrecord-attributes).
- **datefmt**: format of date/time, taking effect when **format** contains time field. Refer to [time.strftime()](https://docs.python.org/3/library/time.html#time.strftime).
- **level**
- **stream**: stream logs are output to, such as *sys.stdout* and *sys.stderr*.
- **style**: style of **format** string. Optional values includes '%'(default), '{' and '$'. It's since Python 3.2.
- **handlers**: Handlers to handle logs. It's since Python 3.3.

**Notes**: **filename**, **stream** and **handlers** are incompatible. If both are present, a *ValueError* is raised.

```python
import logging

logging.basicConfig(filename='example.log', level=logging.INFO, format='%(asctime)s | %(levelname)s | %		(message)s', datefmt='%Y-%m-%d %I:%M:%S')
logging.info('Hi, %s', 'Jack')
```

It will print the following log.

```log
2020-03-09 22:38:00 | INFO | Hi, Jack
```

#### Advanced

Create an instance of **Logger** to record logs by calling *logging.getLogger(__name__)*. Its procedure shows as follows.

![Logging Flow](\img\logging_flow.png)

##### Loggers

The most common used methods of *Logger* fall into two categories:
- **configuration**
	- `Logger.setLevel()`
	- `Logger.addHandler()` and `Logger.removeHandler()`
	- `Logger.addFilter()` and `Logger.removeFilter()`
- **message sending**
	- `Logger.debug()`, `Logger.info()`, `Logger.warning()`, `Logger.error()` and `Logger.critical()`
	- `Logger.exception()`
	- `Logger.log()`

##### Handlers

##### Formatters

##### Configuration

There are three ways to configure logging:

- Creating loggers, handlers, and formatters explicitly using Python code.
- Creating a logging configuration file and reading it using the **fileConfig()** function.
- Creating a dictionary of configuration information and passing it to the **dictConfig()** function. 

#### References

1. [Python之日志处理（logging模块） - 空吾道雪 - 博客园](https://www.cnblogs.com/xuzijie/p/9679707.html)
2. [logging — Logging facility for Python — Python 3 documentation](https://docs.python.org/3/library/logging.html)
3. [Logging HOWTO — Python 3 documentation](https://docs.python.org/3/howto/logging.html)
4. [Logging Cookbook — Python 3 documentation](https://docs.python.org/3/howto/logging-cookbook.html)