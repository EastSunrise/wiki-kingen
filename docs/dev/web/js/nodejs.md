# Node.js

## Installation

Download and install from [here](https://nodejs.org/en/download/).

## NPM

### Commands

```sh
npm view {module_name} versions # view all version of specified module
npm install {module_name}@{version} # install specified version of a module
```

### Mirrors

```sh
# specify mirror manually
npm --registry https://registry.npm.taobao.org install {module_name}

# configure mirror permanently
npm config set registry https://registry.npm.taobao.org

# verify
npm config get registry
```

## References

1. [Node.js Documentation](https://nodejs.org/dist/latest/docs/api/)
2. [API 文档 | Node.js 中文网](http://nodejs.cn/api/)
3. [Node.js 教程 | 菜鸟教程](https://www.runoob.com/nodejs/nodejs-tutorial.html)
4. [npm 镜像及配置方法 - 放逐、青春 - 博客园](https://www.cnblogs.com/zixuan00/p/11197532.html)
