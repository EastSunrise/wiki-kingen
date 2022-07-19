#### 安装

##### Ubuntu

```shell
sudo apt-get install mkdocs
```

##### Windows

```shell
pip install mkdocs
mkdocs --version # 验证版本
```

#### 创建

执行命令

```shell
mkdocs new my-wiki
```

目录结构如下：

- *docs*：保存 Markdown 文件
  - *index.md*：默认首页文件
- *mkdocs.yml*：配置文件，详见[配置](https://markdown-docs-zh.readthedocs.io/zh_CN/latest/user-guide/configuration/)

#### 预览

在根目录下执行命令

```shell
mkdocs serve
```


进入 *mkdocs.yml* 配置的地址，默认为 [127.0.0.1:8000](http://127.0.0.1:8000).

#### 添加页面

添加 *example.md* 到 *docs* 目录下，然后在 *mkdocs.yml* 中添加一个导航栏指向该文件：

```yaml
nav:
  - Example: example.md
```

#### 生成站点

```shell
mkdocs build
```

根目录下即会创建 *site* 目录，包含输出的文件：

- *site*
  - *css*
  - *fonts*
  - *img*
  - *js*
  - *index.html*：*index.md*
  - *example*
    - *index.html*：*example.md*

#### 发布

##### GitHub

在 GitHub 上创建一个远程仓库 *my-wiki*，并关联本地 *my-wiki*：

```shell
cd my-wiki
git init
git remote add origin git@github.com:%username%/my-wiki.git
```

执行命令，推送 *site* 目录到 *gh-pages* 分支下：

```shell
mkdocs gh-deploy
```

打开 *Settings->Pages* 设置 *GitHub Pages*，文档即会被发布到 https://%username%.github.io/my-wiki/.

#### 主题

##### mkdocs-material

```shell
pip install mkdocs-material
```

#### 其他 WiKi

- [MediaWiki](https://www.mediawiki.org/wiki/MediaWiki)
- [DokuWiki](https://www.dokuwiki.org/dokuwiki)
- [minDoc](https://github.com/lifei6671/mindoc)
- [Gitbook](https://www.gitbook.com/)
- [Docsify](https://docsify.js.org/)
- [Hexo](https://hexo.io/)

#### 参考

- [MkDocs](https://www.mkdocs.org/)
- [MkDocs 中文文档](https://markdown-docs-zh.readthedocs.io/zh_CN/latest/)