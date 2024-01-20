#### Flask

[Flask](https://palletsprojects.com/p/flask/) is a lightweight WSGI web application framework. Here is [Chinese documentations](https://dormousehole.readthedocs.io/en/latest/index.html).

#### Deploy

Assume that there is a simple application of Flask as follows:

```python
from flask import Flask
 
app = Flask(__name__)
 
@app.route('/hello')
def index():
    return 'hello flask'
```

##### Windows

On Windows, Tornado is a choice as the WSGI server. Install packages of Tornado first.

Create a `server.py` under the project directory.

```python
# server.py

from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from tornado.wsgi import WSGIContainer

from app import app

s = HTTPServer(WSGIContainer(app))
s.listen(9900)  # listen to port: 9900
IOLoop.current().start()
```

Run `server.py`. And then open the following address: <http://localhost:9900/hello>.