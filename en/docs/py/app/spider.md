#### Overview

Web spider is a kind of script to crawl information from the Internet.

#### Architecture

Common process of spider is **Request -> Get responses -> Parse the content -> Save useful data**, including five parts:

- **Scheduler**: schedule to make the following parts work well together.
- **URL Manager**: manage URLs accessed and to access by memory, database or cache.
- **Downloader**: download web pages from the specified URLs. Logging in, proxy and cookies may be required.
- **Parser**: parse the web pages downloaded to obtain useful information by DOM tree or parsing the whole string of the page. Regular expression, `html.parser`, `beautifulsoup`, `lxml` are all optional.
- **Application**: apply the gotten information.

#### References

1. [Python 爬虫_Python_guoqkmiss的博客-CSDN博客](https://blog.csdn.net/guoqiankunmiss/article/details/83929625)
2. [Python爬取IPTV播放源](https://lizhiyong2000.github.io/2019/03/17/python%E7%88%AC%E5%8F%96iptv%E6%92%AD%E6%94%BE%E6%BA%90/)