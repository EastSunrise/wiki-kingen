# 分治算法

典型的分治算法步骤如下:

1. **Divide**: 将原问题划分为相同类型的子问题；
2. **Conquer**: 递归求解子问题；
3. **Combine**: 将子问题的解组合得到原问题的解。

## 示例

给定数组 $A[1, n]$，求解其最大连续子序列和 $S(A)$.

设 $m=\frac{n}{2}$，将数组 $A$ 分割为两个部分：$A[1, m]$ 和 $A[m+1,n]$. 分别计算两个子数组的最大连续子序列和，以及同时包含 $A[m]$ 和 $A[m+1]$ 的连续子序列和的最大值 $X$，易知

$$
X = \max\left\{\sum_{i=1}^{m}A_i, \sum_{i=2}^{m}A_i, \cdots, \sum_{i=m}^{m}A_i\right\} + \max\left\{\sum_{i=m+1}^{m+1}A_i, \sum_{i=m+1}^{m+2}A_i, \cdots, \sum_{i=m+1}^{n}A_i\right\}
$$

从而有

$$
S(A) = \max\{S(A[1,m]), S(A[m+1,n]), X \}
$$

其中，求解 $X$ 的时间复杂度为 $O(n)$，则算法的总的时间复杂度为

$$
T(n) = 2T(\frac{n}{2}) + O(n) = O(n\lg{n})
$$

???+ tip
    分治算法并不是这个问题的最优解法。设 $S^{'}(n)$ 为以 $A[n]$ 结尾的连续子序列和的最大值，则有

    $$
    \begin{aligned}
        &S^{'}(n)=A[n]+\max\{0, S^{'}(n-1)\} \\
        &S(A) = \max\{S^{'}(n), S(A[1,n-1])\}
    \end{aligned}
    $$

    这种[动态规划](dynamic-programming.md)方法的时间复杂度为 $T(n) = T(n-1) + C = O(n)$.

## 参考

- Cormeo T H, et al. 算法导论. 原书第 3 版. 第 4 章.
- [Divide and Conquer - GeeksforGeeks](https://www.geeksforgeeks.org/divide-and-conquer/)
