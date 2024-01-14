# Mkdocs

## 安装

### Ubuntu

```shell
sudo apt-get install mkdocs
```

### Windows

```shell
pip install mkdocs
mkdocs --version # 验证版本
```

## 创建

执行命令

```shell
mkdocs new my-wiki
```

目录结构如下：

- _docs_：保存 Markdown 文件
  - _index.md_：默认首页文件
- _mkdocs.yml_：配置文件

## 配置

详见[配置](https://www.mkdocs.org/user-guide/configuration/)

```yaml title="mkdocs.yml"
site_name: Site Name
site_author: author
site_dir: site
docs_dir: docs
remote_branch: gh-deploy
dev_addr: 127.0.0.1:4000 # 调试地址及端口
theme:
  name: material # 主题
  language: zh
  logo: assets/images/logo.png
  favicon: assets/images/favicon.png
markdown_extensions:
  - toc:
      slugify: !!python/object/apply:pymdownx.slugs.slugify
        kwds:
          percent_encode: true # 支持Unicode字符%编码
use_directory_urls: false
nav:
  - Home: index.md
```

## 预览

在根目录下执行命令

```shell
mkdocs serve
```

进入 _mkdocs.yml_ 配置的地址，默认为 [127.0.0.1:4000](http://127.0.0.1:4000).

## 添加页面

添加 _example.md_ 到 _docs_ 目录下，然后在 _mkdocs.yml_ 中添加一个导航栏指向该文件：

```yaml
nav:
  - Example: example.md
```

## 生成站点

```shell
mkdocs build
```

根目录下即会创建 _site_ 目录，包含输出的文件：

- _site_
  - _css_
  - _fonts_
  - _img_
  - _js_
  - _index.html_：_index.md_
  - _example_
    - _index.html_：_example.md_

## 发布

### GitHub

在 GitHub 上创建一个远程仓库 _my-wiki_，并关联本地 _my-wiki_：

```shell
cd my-wiki
git init
git remote add origin git@github.com:%username%/my-wiki.git
```

执行命令，推送 _site_ 目录到 _gh-pages_ 分支下：

```shell
mkdocs gh-deploy
```

打开 _Settings->Pages_ 设置 _GitHub Pages_，文档即会被发布到 https://%username%.github.io/my-wiki/.

## 主题

### Material for MkDocs

```shell
pip install mkdocs-material
```

## 其他 WiKi

- [MediaWiki](https://www.mediawiki.org/wiki/MediaWiki)
- [DokuWiki](https://www.dokuwiki.org/dokuwiki)
- [minDoc](https://github.com/lifei6671/mindoc)
- [Gitbook](https://www.gitbook.com/)
- [Docsify](https://docsify.js.org/)
- [Hexo](https://hexo.io/)

## 参考

- [MkDocs](https://www.mkdocs.org/)
- [MkDocs 中文文档](https://markdown-docs-zh.readthedocs.io/zh_CN/latest/)
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/getting-started/)
