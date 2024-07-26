# Floyd 算法

Floyd 算法，使用[动态规划](../dynamic-programming.md)来求解所有点对之间的最短路径。

设给定图的顶点集合 $V=\{1,2,\cdots,n\}$ 和边集合 $E$，定义函数 $f(k,u,v)$，表示只允许经过顶点 $V'=\{1,2,\cdots,k\}$，顶点 $u$ 到顶点 $v$ 的最短路径长度（$u$ 和 $v$ 不一定在 $V'$ 中）。

当 $k=0$ 时，

$$
f(0,u,v) =
\begin{cases}
    0 & \text{如果 } u = v \\
    +\infin & \text{如果 } u \neq v \text{ 且 } (u,v) \notin E \\
    w(u,v) & \text{如果 } u \neq v \text{ 且 } (u,v) \in E
\end{cases}
$$

当 $k>0$ 时，

$$
f(k,u,v) = \min \big(f(k-1,u,v), f(k-1,u,k)+f(k-1,k,v)\big)
$$

当 $k=n$ 时，$f(n,u,v)$ 就是顶点 $u$ 到顶点 $v$ 的最短路径长度。

## 实现

```java
/**
 * Floyd's algorithm.
 *
 * @param graph graph[u][v] is the length of the edge from u to v or {@code -1} if there is no edge.
 */
int[][] floyd(int[][] graph) {
    int n = graph.length;
    int[][] dp = new int[n][n];
    for (int u = 0; u < n; u++) {
        for (int v = 0; v < n; v++) {
            dp[u][v] = graph[u][v];
        }
    }

    for (int k = 1; k < n; k++) {
        for (int u = 0; u < n; u++) {
            for (int v = 0; v < n; v++) {
                if (dp[u][k] == -1 || dp[k][v] == -1) {
                    continue;
                }
                if (dp[u][v] == -1) {
                    dp[u][v] = dp[u][k] + dp[k][v];
                } else {
                    dp[u][v] = Math.min(dp[u][v], dp[u][k] + dp[k][v]);
                }
            }
        }
    }
    return dp;
}
```

算法的时间复杂度为 $O(n^3)$。

## 参考

- [Floyd–Warshall algorithm - Wikipedia](https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm)
- [最短路 - OI Wiki](https://oi-wiki.org/graph/shortest-path/)
