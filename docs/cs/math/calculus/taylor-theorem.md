# 泰勒定理

## 定理

设 $n$ 是一个正整数，$f$ 是定义在一个包含 $a$ 的区间上的函数，且 $f$ 在邻域内有 $n+1$ 阶导数。那么对于这个区间内的任意 $x$，都有：

$$
f(x) = f(a) + \frac{f'(a)}{1!}(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \cdots + \frac{f^{(n)}(a)}{n!}(x-a)^n + R_n(x)
$$

其中的多项式部分称为函数在 $a$ 处的泰勒多项式，剩余的 $R_n(x)$ 是余项，是 $(x-a)^n$ 的高阶无穷小。

## 常用的泰勒公式

自然指数

$$
e^x = 1 + x + \frac{x^2}{2!} + \cdots + \frac{x^n}{n!} + R_n(x)
$$

三角函数

$$
\begin{align*}
\sin x &= x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots + (-1)^n\frac{x^{2n+1}}{(2n+1)!} + R_n(x) \\
\cos x &= 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots + (-1)^n\frac{x^{2n}}{(2n)!} + R_n(x) \\
\end{align*}
$$

几何级数和自然对数

$$
\begin{align*}
\frac{1}{1-x} &= 1 + x + x^2 + \cdots + x^n + R_n(x) \\
\ln(1+x) &= \int_0^x \frac{1}{1+t} \, dt = x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots + (-1)^{n-1}\frac{x^n}{n} + R_n(x) \\
\end{align*}
$$

## 参考

- [Taylor's theorem - Wikipedia](https://en.wikipedia.org/wiki/Taylor%27s_theorem)
