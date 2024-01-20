#### Overview

Markdown in Evernote supports *CommonMark* and *GFM (GitHub Flavored Markdown)* and that for *mkdocs* is [Python-Markdown](https://python-markdown.github.io/) which inherited from [John Gruber’s Markdown](https://daringfireball.net/projects/markdown/).

#### Markdown

##### Images

Evernote only supports ".png", ".jpg" and ".gif".

```markdown
![alt](../img/favicon.ico "optional title")
<!--
alt: show if the image can't display and be used for Search Engine.
optional title: show when mouse is over the image.
-->

<!-- if a title is required, following is an optional way. -->
<center>
	![alt](url)
	title
</center>
```

<center>
	![Baidu](https://www.baidu.com/img/baidu_jgylogo3.gif "Baidu")
	百度
</center>
##### Code Block

Supported languages are as follows:

| NAME     | KEY         | mkdocs | Typora |
| -------- | ----------- | ------ | ------ |
| Java     | java        |        |        |
| Markdown | markdown    |        |        |
| Shell    | bash, shell | N      |        |

#### References

1. [印象笔记 Markdown 入门指南](https://list.yinxiang.com/markdown/eef42447-db3f-48ee-827b-1bb34c03eb83.php)