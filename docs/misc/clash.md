# Clash

## Mixin

从 0.9.5 版本开始，CFW 支持向所有配置文件中注入公共属性设置。

首先，在 _General_ 中启用 _Mixin_ 选项，然后编辑 _Mixin_ 配置文件（以 JavaScript 为例）：

```javascript
module.exports.parse = ({ content, name, url }, { yaml, axios, notify }) => {
  const extra = {
    rules: [...(content.rules || [])],
  };
  return { ...content, ...extra };
};
```

## 配置文件预处理

从 0.10.1 版本开始，CFW 支持在加载前对下载的配置文件进行预处理。

在 _Profiles_ 中选择配置文件，编辑 _Parsers_ 选项，在配置文件刷新时生效：

```yaml
parsers:
  - url: https://example.com/profile.yaml
    file: "path/to/parser.js"
```

```js title=parser.js
module.exports.parse = async (
  raw,
  { axios, yaml, notify, console },
  { name, url, interval, selected }
) => {
  const obj = yaml.parse(raw);
  return yaml.stringify(obj);
};
```

## 参考

- [快速上手-Clash for Windows 文档](https://doc.clashforwindows.app/quickstart/)
