# JavaScript

## JavaScript 模块

模块化，指的是将复杂项目下 JavaScript 程序拆分为可按需导入的单独模块的机制。

```js title="custom.js"
export const name = "Custom"; // named export

export const greet = () => {
  // named export
  return "Hello World";
};

export class Person {
  // named export
  constructor() {
    // ...
  }
}

const add = (a, b) => a + b;

export default add; // default export, only one per module
```

```js title="main.js"
// import as needed, renaming is optional
import { name, greet as greeting } from "./custom.js";
import add from "./custom.js";
// import { default as add } from "./custom.js"

console.log(name);
console.log(greeting());
console.log(add(1, 2));

// dynamic import
import("./custom.js").then((module) => {
  // do something with module
});
```

在 HTML 中，使用 `<script type="module">` 标签来加载模块。

```html title="index.html"
<script type="module" src="main.js"></script>
```

## 参考

- [JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
