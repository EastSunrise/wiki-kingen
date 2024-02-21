# 求和公式

## 求和公式及其性质

给定有限数列 $a_1,a_2,\cdots,a_n$，其中 $n\ge 0$，记有限和

$$
\begin{equation}
    \sum_{k=1}^{n}a_k=a_1+a_2+···+a_n
\end{equation}
$$

若 $n=0$，定义该和式值为 $0$。

给定无限数列 $a_1,a_2,\cdots$，将其无限和 $a_1+a_2+···$ 记作

$$
\begin{equation}
    \sum_{k=1}^{\infty}a_k=\lim_{n\to \infty}\sum_{k=1}^{n}a_k
\end{equation}
$$

### 等差级数

$$
\begin{equation}
    \displaystyle\sum_{k=1}^{n}k=\frac{1}{2}n(n+1) =\Theta(n^2)
\end{equation}
$$

### 平方和与立方和

$$
\begin{equation}
    \sum_{k=1}^{n}k^2=\frac{n(n+1)(2n+1)}{6}
\end{equation}
$$

$$
\begin{equation}
    \sum_{k=1}^{n}k^3=\frac{n^2(n+1)^2}{4}
\end{equation}
$$

### 几何级数

对实数 $x\ne 1$，和式

$$
\begin{equation}
    \sum_{k=0}^{n}x^k=1+x+x^2+···+x^n
\end{equation}
$$

称作几何级数（或指数级数），其值为

$$
\begin{equation}
    \sum_{k=0}^{n}x^k=\frac{x^{n+1}-1}{x-1}
\end{equation}
$$

当 $n$ 趋于无穷且 $|x|\lt 1$ 时，有

$$
\begin{equation}
    \sum_{k=0}^{\infty}x^k=\frac{1}{1-x}
\end{equation}
$$

### 级数积分与微分

对式 $(8)$ 积分可得

$$
\begin{equation}
    \sum_{k=0}^{\infty}kx^k=\frac{x}{(1-x)^2}
\end{equation}
$$

## 参考

- Cormeo T H, et al. 算法导论. 原书第 3 版. 附录 A.
