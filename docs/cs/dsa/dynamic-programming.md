# 动态规划

动态规划（Dynamic Programming）和[分治算法](divide-and-conquer.md)相似，都是将子问题的解组合来求解原问题。但是分治算法在划分子问题时，存在**子问题重复**计算的情况。动态规划算法的处理方式是，对每个子问题只作一次求解，然后将其解保存在一个表中，从而避免了相同子问题的重复计算，即付出额外的内存空间来节省计算时间。

动态规划方法通常用来求解最优化问题（optimization problem），这类问题可以有很多可行解，每个解都有一个值，我们希望寻找具有最优值（最小值或最大值）的解。步骤通常如下：

1. 刻画一个最优解的结构特征；
2. 递归地定义最优解的值；
3. 计算最优解的值，通常采用自底向上的方法；
4. 利用计算出的信息构造一个最优解。（如果仅需要一个最优值，可以忽略这步）

动态规划有两种等价的实现方法。

第一种方法称为**带备忘的自顶向下法**（top-down with memoization），此方法仍按自然的递归形式编写过程，但过程会保存每个子问题的解（通常保存在一个数组或散列表中）。当需要一个子问题的解时，首先检查是否已经保存过此解，如果是，则五接返回保存的值 从而节省了计算时间；否则，按通常方式计算这个子问题。

第二种方法称为**自底向上法**（bottom-up method），这种方法一般需要恰当定义子问题“规模”的概念，使得任何子问题的求解都只依赖于“更小的”子问题的求解。因而我们可以将子问题按规模排序，按由小至大的顺序进行求解。当求解某个子问题时，它所依赖的那些更小的子问题都已求解完毕，结果已经保存。每个子问题只需求解一次，当我们求解它（也是第一次遇到它）时，它的所有前提子问题都已求解完成。

## 斐波那契数列

下面用斐波那契数列求解问题作简单说明。该算法最原始的递归实现如下：

```java
int f(int n) {
    if (n == 0 || n == 1) {
        return 1;
    }
    return f(n - 1) + f(n - 2);
}
```

如果采用带备忘的自顶向下法，则需要创建一个数组来保存已求解的值，

```java
int[] memo = new int[n + 1];
int f_top_down(int n) {
    if (n == 0 || n == 1) {
        return 1;
    }
    if (memo[n] > 0) {
        return memo[n];
    }
    memo[n] = f_top_down(n - 1) + f_top_down(n - 2);
    return memo[n];
}
```

如果采用自底向上法，则需要从小到大的顺序依次计算每一项的值，

```java
int f_bottom_up(int n) {
    if (n == 0 || n == 1) {
        return 1;
    }
    int[] memo = new int[n + 1];
    memo[0] = memo[1] = 1;
    for (int i = 2; i <= n; i++) {
        memo[i] = memo[i - 2] + memo[i - 1];
    }
    return memo[n];
}
```

## 矩阵链乘法问题

给定 $n$ 个矩阵的链：$A_1,A_2,\cdots,A_n$，矩阵 $A_i$ 的大小为 $p_{i-1}\times p_i(1\le i\le n)$，求完全括号化方案，使得计算乘积 $A_1A_2\cdots A_n$ 所需标量乘法次数最少。

设 $f(i,j)$ 表示计算矩阵链 $A_i\cdots A_j$ 所需标量乘法次数的最小值，易得

$$
f(i,j)=\begin{cases}
    0 &\text{若 }i=j \\
    \min\limits_{i\le k\lt j}\{f(i,k)+f(k+1,j)+p_{i-1}p_{k}p_{j}\} &\text{若 }i<j
\end{cases}
$$

那么，按矩阵链的长度从小到大依次求得子问题的最优解，即可得到整个问题的最优解，时间复杂度为 $O(n^3)$。以下是自底向上的 Java 实现。

```java
int[][] matricesMultiply(int[][][] matrices) {
    int n = matrices.length;
    int[] p = new int[n + 1];
    for (int i = 0; i < n; i++) {
        p[i] = matrices[i].length;
    }
    p[n] = matrices[n - 1][0].length;
    // dp[i][j]: the optimal count of matrices[i,j]
    // s[i][j]: the optimal split point of matrices[i,j]
    int[][] dp = new int[n][n], s = new int[n][n];
    for (int l = 2; l <= n; l++) {
        for (int i = 0; i <= n - l; i++) {
            int j = i + l - 1;
            // A_i...A_j
            for (int k = i; k < j; k++) {
                int q = dp[i][k] + dp[k + 1][j] + p[i] * p[k + 1] * p[j + 1];
                if (dp[i][j] == 0 || q < dp[i][j]) {
                    dp[i][j] = q;
                    s[i][j] = k;
                }
            }
        }
    }

    // print optimal solution
    return multiply(matrices, s, 0, n - 1);
}

int[][] multiply(int[][][] matrices, int[][] s, int i, int j) {
    if (i == j) {
        return matrices[i];
    }
    int k = s[i][j];
    int[][] m1 = multiply(matrices, s, i, k);
    int[][] m2 = multiply(matrices, s, k + 1, j);
    // return m1 * m2
    return null;
}
```

## 最长公共子序列

给定两个序列 $X_m=(x_1,x_2,\cdots,x_m)$ 和 $Y_n=(y_1,y_2,\cdots,y_n)$，求 $X$ 和 $Y$ 的最长公共子序列（longest-common-subsequence）。

设 $f(i,j)$ 为表示 $X_i$ 和 $Y_j$ 的最长公共子序列的长度，根据其最优子结构性质，易得

$$
f(i,j)=
\begin{cases}
    0 &\text{若 }i=0 \text{ 或 }j=0 \\
    f(i-1,j-1)+1 &\text{若 }i,j\gt 0 \text{ 且 } x_i=y_j \\
    \max(f(i-1,j), f(i,j-1)) &\text{若 }i,j\gt 0 \text{ 且 } x_i\ne y_j
\end{cases}
$$

对两个序列进行遍历，并保存 $f(i,j)$ 的值，即可得到问题的最优解 $f(m,n)$，时间复杂度为 $O(mn)$。以下是自底向上的 Java 实现。

```java
String lcs(String x, String y) {
    int m = x.length(), n = y.length();
    // dp[i][j]: the length of lcs of x[0,i] and y[0,j]
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (x.charAt(i - 1) == x.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
            }
        }
    }

    // construct optimal solution
    int i = m, j = n;
    StringBuilder builder = new StringBuilder(dp[m][n]);
    while (i > 0 && j > 0) {
        if (dp[i][j] == dp[i - 1][j]) {
            i--;
        } else if (dp[i][j] == dp[i][j - 1]) {
            j--;
        } else {
            builder.append(x.charAt(i - 1));
            i--;
            j--;
        }
    }
    return builder.reverse().toString();
}
```

## 参考

- Cormeo T H, et al. 算法导论. 原书第 3 版. 第 15 章.
