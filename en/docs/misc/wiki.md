#### Overview

This page is about how to build a wiki system. The example is [MkDocs](https://www.mkdocs.org/) which is easy to deploy and use. It transforms files of Markdown to static web pages which can be accessed locally and also hosted on the server, such as GitHub. This blogs are exactly based in MkDocs.

#### Installation

##### Ubuntu

```shell
$ sudo apt-get install mkdocs
```

##### Windows

```shell
$ pip install mkdocs

$ mkdocs --version # verify
```

MkDocs supports Python versions 2.7.9+, 3.4+, and pypy.

#### Usage

##### Create

```shell
$ mkdocs new my-wiki
```

The *docs* directory is to save custom files of Markdown. There is an *index.md* file by default.

The *mkdocs.yml* file is to configure the wiki website, including title, content, language and so on.

##### Preview

```shell
$ mkdocs serve #start the service of MkDocs
```


Access the address configured in the *mkdocs.yml* file, <127.0.0.1:8000> by default.

##### Add


Add a markdown file example.md to the directory docs. Then modify the mkdocs.yml to add navigation bar for the file.

```yaml
pages:
  - Home: index.md
  - Example: example.md
```

##### Insert images

```markdown
![title](images/example.png) <!--Absolute paths and relative paths are both useful.-->
```

##### Build

```shell
$ mkdocs build
```

The command builds documents of Markdown to static web pages under directory *site*.

##### Hosted

###### Local

Deploy *site* with [Tomcat](../java/tomcat.md#publish-static-pages). Access wiki from <localhost:8080/wiki-name>.

###### GitHub

```shell
$ cd my-wiki
$ git init
# create a repository on GitHub
$ git remote add origin repository_address

# Update the deployed pages, it will be pushed to gh-pages branch of origin.
$ mkdocs gh-deploy
```

Set *GitHub Pages* in the *Settings*. Then the wiki is available from <https://user_name.github.io/repository_name>.

#### FAQ

##### WinError 10013

That happens because the port is being used. Find and kill the process using the port.

```shell
$ netstat -ano|findstr 8000
$ taskkill /pid process_number /F
```

Or use another free port.

```shell
$ mkdocs serve --dev-addr=127.0.0.1:9999
```

Or modify the configuration file *mkdocs.yml*.

```yaml
dev_addr: 127.0.0.1:9999
```

##### Third Party Extensions

1. Install third party module to *docs* directory.

2. Add related js and css files, and configuration options to `markdown_extensions`.

Refer to various [third party extensions](https://github.com/Python-Markdown/markdown/wiki/Third-Party-Extensions).

#### Other systems

1. [MediaWiki](https://www.mediawiki.org/wiki/MediaWiki)
2. [DokuWiki](https://www.dokuwiki.org/dokuwiki)
3. [minDoc](https://github.com/lifei6671/mindoc)
4. [Gitbook](https://www.gitbook.com/)
5. [Docsify](https://docsify.js.org/)
6. [Hexo](https://hexo.io/)

#### References

  1. [MkDocs 中文文档](https://markdown-docs-zh.readthedocs.io/zh_CN/latest/)

  2. [搭建自己的wiki知识管理系统](https://www.jianshu.com/p/c664000396ea)