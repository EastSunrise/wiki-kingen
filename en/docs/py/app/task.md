#### Overview

This note will introduce ways to execute scheduled tasks in Python. Mainly include four ways: function `sleep`, class `Timer`, module `sched` and frame `APScheduler`.

#### Loop and sleep

```python
import time

# Run every other n seconds.
def task(n):         
    while True:
        print('Hello World!')
        time.sleep(n)

task(5)
```

**Notes**: The program will be **BLOCKED** in the time.

#### Timer

It's in the module `threading`, passing the interval of time (unit: seconds), the function to execute and arguments of the function as three arguments.

```python
from threading import Timer

def f(s):
    print(s)

# Execute only once after 5 seconds.
t = Timer(5, f, ('Hello World!',))
t.start()

# Execute the task and then define next one.
def task(s, interval):
    print(s)
    Timer(interval, task, (s, interval)).start()
```

**Notes**:

1. The program won't be blocked in this way.
2. `Timer` **won't loop**. It's over after executed.

#### sched

```python
import sched
import time

# initialize scheduler
# pass the time and delay functions
scheduler = sched.scheduler(time.time, time.sleep)

def task(s, interval):
    print(s)
    # pass the interval, priority, function to execute and arguments of the function
    scheduler.enter(interval, 0, task, (s, interval))

# the first one
scheduler.enter(0, 0, task, (5, 'Hello World!'))
scheduler.run()
```

**Notes**: Same as `Timer`, `sched` won't loop either.

#### APScheduler

Install with `pip install APScheduler`.

##### Four Components

**Trigger** defines which task to run next. There are three built-in triggers:

1. date: specified time
2. interval: fixed time intervals
3. cron: cron expression

**Job Store**, as the name suggests, stores jobs to be scheduled. `MemoryJobStore` is used by default. Database is also available if necessary.

**Executor** execute jobs in the thread or thread pool. It will notify `Scheduler` when jobs are finished. Two common ones are `ProcessPoolExecutor` and `ThreadPoolExecutor`.

**Schedulers** configures the above components, such as adding a job. As follow are all the schedulers: 

1. **BlockingScheduler**: use when the scheduler is the only thing running in your process
2. **BackgroundScheduler**: use when you’re not using any of the frameworks below, and want the scheduler to run in the background inside your application
3. AsyncIOScheduler: use if your application uses the asyncio module
4. GeventScheduler: use if your application uses gevent
5. TornadoScheduler: use if you’re building a Tornado application
6. TwistedScheduler: use if you’re building a Twisted application
7. QtScheduler: use if you’re building a Qt application

##### Configuration

To be continued...

#### References

1. [Python 定时任务的实现方式 - 枫飞飞 - 博客园](https://www.cnblogs.com/fengff/p/11011000.html)