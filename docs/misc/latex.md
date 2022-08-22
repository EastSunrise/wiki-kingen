### 参考

- [LaTeX - WikiBooks](https://zh.wikibooks.org/wiki/LaTeX)
- [The TeX/LaTeX Extension List - MathJax](http://docs.mathjax.org/en/latest/input/tex/extensions/index.html)
- [Supported Functions · KaTeX](https://katex.org/docs/supported.html)

### 内联公式

`$f(x)=x$` 渲染为 $f(x)=x$，或者 `\(f(x)=x\)` 渲染为 \(f(x)=x\)

### 块级公式

`$$f(x)=x$$` （前后各空一行）

$$f(x)=x$$

`\[f(x)=x\]` （前后各空一行）

\[f(x)=x\]

带自动序号，

$$
\begin{equation}
f(x)=x
\end{equation}
$$

多行单独的序号，默认右对齐，

$$
\begin{align}
a&=b+c \\
d+e&=f
\end{align}
$$

多行对齐时，对齐参数个数为 `&` 个数加一，

$$
\begin{array}{rl}
a+b+c&=1 \\
b+c&=2
\end{array}
$$