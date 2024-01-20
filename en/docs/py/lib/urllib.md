#### Overview

[urllib](https://docs.python.org/zh-cn/3/library/urllib.html) is a package to deal with URLs, including 4 modules: urllib.request, urllib.error, [urllib.parse](#parse), and [urllib.robotparser](#robotparser). The main part is about module request.

#### Get Started

Module request is for opening and reading URLs. An example is presented as follows. The response is an instance of `http.client.HTTPResponse`.

```python
from urllib import request

# build a request object
req = request.Request('https://www.baidu.com', headers={
    'Host': 'www.baidu.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
}, method='GET')

# issue the request and print the result
with request.urlopen(req, timeout=30) as response:
    print(response.read().decode('utf-8'))
```

To handle the result further, commonly a html page, use [BeautifulSoup](bs4.md).

##### HTTP Header

See more details [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers).

###### Request

| Header          | Description                                            | Example                                                      |
| --------------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| Accept          | Content types that clients accept                      | text/html,application/xml                                    |
| Accept-Charset  |                                                        |                                                              |
| Accept-Encoding |                                                        | gzip, deflate                                                |
| Accept-Language |                                                        | zh-CN,zh;q=0.9,zh-TW;q=0.8                                   |
| Host            | netloc                                                 | www.douban.com                                               |
| Origin          | scheme://netloc. Used for POST request or CORS request |                                                              |
| Referer         | Previous URL                                           |                                                              |
| User-Agent      |                                                        | Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36 |

###### Response

| Header           | Description    | Example |
| ---------------- | -------------- | ------- |
| Content-Encoding |                |         |
| Content-Language |                |         |
| Content-Length   |                |         |
| Content-Location | Backup address |         |
| Content-MD5      |                |         |
| Content-Type     | MIME type      |         |

#### Download

Under the package, there are two ways to download files from the Internet.

##### [urllib.request.urlretrieve](https://docs.python.org/zh-cn/3.7/library/urllib.request.html#urllib.request.urlretrieve)

```python
from urllib import request


def reporthook(block_count, block_size, total_size):
    print('\rDownloading: %.2f%%' % (100 * block_count * block_size / total_size), end='')


url = 'https://www.baidu.com/'
filename, headers = request.urlretrieve(url, filename='baidu.html', reporthook=reporthook, data=None)
```

`filename` denotes target path of downloaded file. If absent, the location will be a tempfile with a generated name under the temp directory of operating system.

`reporthook` is a callback function which is called when a block is read. It can help print the process of downloading.

`data` specifies additional data when the method of request is POST.

It will return the file location and headers of response.

##### Multi-Thread

The second way is to request directly with `urllib.request` and speed up with threads.



#### parse

#### robotparser