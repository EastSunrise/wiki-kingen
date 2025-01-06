# 欧拉定理

## 欧拉函数

欧拉函数（Euler's totient function）$\varphi(n)$ 表示小于等于 $n$ 的正整数中，与 $n$ 互质的数的个数。

其中，$\varphi(1)=1$，当 $n$ 是质数时，$\varphi(n)=n-1$.

欧拉函数是积性函数，即对任意互质的整数 $m,n$，有 $\varphi(mn)=\varphi(m)\varphi(n)$.

!!! note
    在数论中，[积性函数](https://en.wikipedia.org/wiki/Multiplicative_function)指的是一个定义域为正整数的算术函数 $f(n)$，满足以下性质：

    1. $f(1)=1$
    2. 对于任意互质的两个正整数 $m,n$，有 $f(mn)=f(m)f(n)$.

## 定理

如果 $a,n$ 互质，则有 $a^{\varphi(n)}\equiv 1 \bmod n$.

当 $n$ 为质数时，由于 $\varphi(n)=n-1$，可得费马小定理，即 $a^{m-1}\equiv 1 \bmod m$.

## 扩展欧拉定理

$$
a^b \equiv
\begin{cases}
    a^{b \bmod \varphi(n)} \bmod n & a,n\text{ 互质} \\
    a^b \bmod n    & a,n\text{ 不互质且 } b<\varphi(n) \\
    a^{(b \bmod \varphi(n))+\varphi(n)} \bmod n & a,n\text{ 不互质且 } b\ge \varphi(n)
\end{cases}
$$

## 参考

- [Euler's totient function - Wikipedia](https://en.wikipedia.org/wiki/Euler%27s_totient_function)
- [Euler's Theorem](https://en.wikipedia.org/wiki/Euler%27s_theorem)
- [欧拉函数 - OI Wiki](https://oi-wiki.org/math/number-theory/euler-totient/)
- [欧拉定理 & 费马小定理 - OI Wiki](https://oi-wiki.org/math/number-theory/fermat/)
