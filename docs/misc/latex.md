### 参考

-   [LaTeX - WikiBooks](https://zh.wikibooks.org/wiki/LaTeX)
-   [The TeX/LaTeX Extension List - MathJax](http://docs.mathjax.org/en/latest/input/tex/extensions/index.html)
-   [Supported Functions · KaTeX](https://katex.org/docs/supported.html)

### 内联公式

`$f(x)=x$` 渲染为 $f(x)=x$

### 块级公式

`$$f(x)=x$$` （前后各空一行）

$$f(x)=x$$

自动编号，

$$
\begin{equation}
    f(x)=x
\end{equation}
$$

多行对齐，无自动编号，

$$
\begin{aligned}
    a&=b+c \\
    d+e&=f
\end{aligned}
$$

多行对齐，每行自动编号，

$$
\begin{align}
    a&=b+c \\
    d+e&=f
\end{align}
$$

多行对齐，只有一个编号，

$$
\begin{equation}
    \begin{aligned}
        a&=b+c \\
        d+e&=f
    \end{aligned}
\end{equation}
$$

多行自动居中，无自动编号，

$$
\begin{gathered}
    a=b+c \\
    d+e=f
\end{gathered}
$$

多行自动居中，每行自动编号，

$$
\begin{gather}
    a=b+c \\
    d+e=f
\end{gather}
$$

多行自动居中，只有一个编号，

$$
\begin{equation}
    \begin{gathered}
        a=b+c \\
        d+e=f
    \end{gathered}
\end{equation}
$$
