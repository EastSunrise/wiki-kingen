# Dijkstra 算法

Dijkstra 算法，使用类似[广度优先搜索](index.md#广度优先搜索)的方法解决加权图的单源最短路径问题，其原始版本仅适用于找到两个顶点之间的最短路径，后来更常见的变体固定了一个顶点作为源结点然后找到该顶点到图中所有其它结点的最短路径，产生一个最短路径树。

## 问题

给定加权有向图 $G=\{V,E,W\}$，其顶点集合 $V=\{v_1,v_2,\cdots,v_n\}$，每条边 $e_{i,j}(i\ne j)$ 对应一个权重 $w_{i,j}(w_{i,j}\ge0)$，表示从顶点 $v_i$ 到 $v_{j}$ 的距离。设一源点 $v_s\in V$，求：从 $v_s$ 出发，到其它顶点的最短路径 $d_{s,i}(1\le i\le n)$。记 $m=|E|$。

## 定义

- 集合 $S$ 和 $S'$，包括已经确定最短路径的顶点，初始时，$S=\{v_s\}$，当且仅当 $S=V$ 时，算法结束，

$$
\begin{equation}
   S=\{v_i\in V \ |\ d_{s,i}\text{ 已经确定}\},\quad S'=V-S
\end{equation}
$$

- 数组 $F=\{f_{s,i}\ |\ v_i\in S'\}$，其中 $f_{s,i}$ 表示从顶点 $v_s$ 到 $v_i$ 的最短路径，且该路径上的所有顶点必须在 $S$ 中。显然，$f_{s,i}\ge d_{s,i}$.

## 设计

Dijkstra 算法的思路是，**每次从 $S'$ 中选择到 $v_s$ 相对最近的顶点加入 $S$ 中，直至 $f_{s,i}=d_{s,i},\ S=V$**，具体步骤如下：

初始化，$S=\{v_s\}$，

$$
\begin{equation}
   f_{s,i}=
      \begin{cases}
         w_{s,i} &i\ne s \text{ 且 } e_{s,i}\text{ 存在} \\
         \infty &i\ne s \text{ 且 } e_{s,i}\text{ 不存在}
      \end{cases}
\end{equation}
$$

从 $S'$ 中选择 $v_k$，使得 $f_{s,k}$ 最小，即：

$$
\begin{equation}
   f_{s,k}=\min\{f_{s,i}\ |\ v_i\in S'\}
\end{equation}
$$

此时 $d_{s,k}=f_{s,k}$，即为最短路径（稍后证明），将 $v_k$ 加入 $S$，并更新 $F$：

$$
\begin{gather}
   S=S\cup \{v_k\} \\
   f_{s,i} = \min\{f_{s,i},\ f_{s,k}+w_{k,i}\}
\end{gather}
$$

重复第 2 步和第 3 步直至 $S=V$.

以下证明 $d_{s,k}=f_{s,k}$.

设任意从 $v_s$ 到 $v_k$ 的路径 $p_{s,k}=v_s\to v_{s_{1}}\to v_{s_{2}}\to···\to v_{s_{j}}\to v_k$，

- 若 $\{v_{s_{1}},v_{s_{2}},\cdots,v_{s_{j}}\}\subset S$，$p_{s,k}\ge f_{s,k}$；

- 否则 $\exists\ v_{s_{i}}\in S'\text{ 且 }\{v_{s_{1}},v_{s_{2}},\cdots,v_{s_{i-1}}\}\subset S,\ 1\le i\le j$，同时，根据式 $(3)$ 有 $f_{s,k}\le f_{s,s_{i}}$，那么

$$
\begin{equation}
   \begin{aligned}
      p_{s,k}&=v_s\to v_{s_{1}}\to ···\to v_{s_{i}}\to···\to v_{s_{j}}\to v_k \\
      &\ge f_{s,s_{i}}+(v_{s_{i+1}}\to···\to v_{s_{j}}) \\
      &\ge f_{s,k}+(v_{s_{i+1}}\to···\to v_{s_{j}})
   \end{aligned}
\end{equation}
$$

因此 $f_{s,k}$ 为最短路径，即 $d_{s,k}=f_{s,k}$.

## 示例

给定如图有向图：

<img src="../../img/dijkstra-ex-1.jpg" alt="例图" style="zoom:50%;" />

初始化 $S$ 和 $F$，有：

$$
\begin{equation}
   \begin{aligned}
      &S=\{v_1\},\quad S'=\{v_2,v_3,v_4,v_5,v_6\} \\
      &d_{1,1}=0 \\
      &f_{1,2}=10,\ f_{1,3}=\infty,\ f_{1,4}=\infty,\ f_{1,5}=\infty,\ f_{1,6}=3
   \end{aligned}
\end{equation}
$$

其中 $f_{1,6}=3$ 最小，选择 $v_6$，加入 $S$ 并更新 $F$：

<img src="../../img/dijkstra-ex-2.jpg" alt="例图" style="zoom:75%;" />

$$
\begin{equation}
   \begin{aligned}
      &S=\{v_1,v_6\},\quad S‘=\{v_2,v_3,v_4,v_5\} \\
      &d_{1,1}=0,\ d_{1,6}=3 \\
      &f_{1,2}=5,\ f_{1,3}=\infty,\ f_{1,4}=9,\ f_{1,5}=4
   \end{aligned}
\end{equation}
$$

其中 $f_{1,5}=4$ 最小，选择 $v_5$，加入 $S$ 并更新 $F$：

<img src="../../img/dijkstra-ex-3.jpg" alt="例图" style="zoom:75%;" />

$$
\begin{equation}
   \begin{aligned}
      &S=\{v_1,v_5,v_6\},\quad S‘=\{v_2,v_3,v_4\} \\
      &d_{1,1}=0,\ d_{1,5}=4,\ d_{1,6}=3 \\
      &f_{1,2}=5,\ f_{1,3}=\infty,\ f_{1,4}=9
   \end{aligned}
\end{equation}
$$

其中 $f_{1,2}=5$ 最小，选择 $v_2$，加入 $S$ 并更新 $F$：

<img src="../../img/dijkstra-ex-4.jpg" alt="例图" style="zoom:75%;" />

$$
\begin{equation}
   \begin{aligned}
      &S=\{v_1,v_2,v_5,v_6\},\quad S‘=\{v_3,v_4\} \\
      &d_{1,1}=0,\ d_{1,2}=5,\ d_{1,5}=4,\ d_{1,6}=3 \\
      &f_{1,3}=12,\ f_{1,4}=9
   \end{aligned}
\end{equation}
$$

其中 $f_{1,4}=9$ 最小，选择 $v_4$，加入 $S$ 并更新 $F$：

<img src="../../img/dijkstra-ex-5.jpg" alt="例图" style="zoom:75%;" />

$$
\begin{equation}
   \begin{aligned}
      &S=\{v_1,v_2,v_4,v_5,v_6\},\quad S‘=\{v_3\} \\
      &d_{1,1}=0,\ d_{1,2}=5,\ d_{1,4}=9,\ d_{1,5}=4,\ d_{1,6}=3 \\
      &f_{1,3}=12
   \end{aligned}
\end{equation}
$$

最后选择 $v_3$，加入 $S$ 并更新 $F$：

$$
\begin{equation}
   \begin{aligned}
      &S=\{v_1,v_2,v_3,v_4,v_5,v_6\},\quad S‘=\{v_3\} \\
      &d_{1,1}=0,\ d_{1,2}=5,\ d_{1,3}=12,\ d_{1,4}=9,\ d_{1,5}=4,\ d_{1,6}=3 \\
   \end{aligned}
\end{equation}
$$

## 实现

```java title="暴力实现"
int[] minDistance(int[][] graph, int n, int s) {
   // dist[v]: the distance from s to v
   int[] dist = new int[n];
   boolean[] visited = new boolean[n];
   Arrays.fill(dist, -1);

   dist[s] = 0;
   for (int i = 1; i < n; i++) {
      int min = -1;
      for (int v = 0; v < n; v++) {
            // choose the nearest vertex from reachable but not visited vertices
            if (!visited[v] && dist[v] != -1 && (min == -1 || dist[v] < dist[min])) {
               min = v;
            }
      }
      if (min == -1) {
            return dist;
      }
      visited[min] = true;
      for (int v = 0; v < n; v++) {
            // vertex v is reachable, update its distance to s
            if (!visited[v] && graph[min][v] > 0) {
               if (dist[v] == -1 || dist[min] + graph[min][v] < dist[v]) {
                  // a shorter path: s → min → v
                  dist[v] = dist[min] + graph[min][v];
               }
            }
      }
   }
   return dist;
}
```

每次暴力搜索下一个最短路径，时间复杂度为 $O(n^2)$.

```java
int[] minDistance(List<List<int[]>> graph, int n, int s) {
   int[] dist = new int[n];
   Arrays.fill(dist, -1);

   PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
   pq.offer(new int[]{0, s});
   dist[s] = 0;
   boolean[] visited = new boolean[n];
   while (!pq.isEmpty()) {
      int[] cur = pq.poll();
      int u = cur[1];
      if (visited[u]) {
            continue;
      }
      visited[u] = true;
      for (int[] edge : graph.get(u)) {
            int v = edge[0], w = edge[1];
            int d = dist[u] + w;
            if (dist[v] == -1 || dist[v] > d) {
               dist[v] = d;
               pq.offer(new int[]{d, v});
            }
      }
   }
   return dist;
}
```

每次更新路径后，将其放入优先队列中，时间复杂度为 $O(m\log m)$.

## 参考

- [Dijsktra's algorithm (geeksforgeeks.org)](https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/)
- [最短路 - OI Wiki](https://oi-wiki.org/graph/shortest-path/#dijkstra-%E7%AE%97%E6%B3%95)
- [最短路径问题—Dijkstra 算法最详解 - 知乎](https://zhuanlan.zhihu.com/p/129373740)
