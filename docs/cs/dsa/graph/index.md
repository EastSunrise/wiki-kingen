# 图

## 图的表示

图一般有两种表示方法。一种是邻接链表（Adjacency List），适用于稀疏图；另一种是邻接矩阵（Adjacency Matrix），适用于稠密图。

### 邻接链表

对于图 $G=(V,E)$，其邻接链表由一个包含 $|V|$ 条链表的数组 $Adj$ 组成，每个结点对应一条链表，包含所有与该结点有边相连的结点。

如果 $G$ 是有向图，对于有向边 $(u,v)$ 来说，结点 $v$ 在链表 $Adj[u]$ 中。如果 $G$ 是无向图，对于边 $(u,v)$ 来说，结点 $v$ 在链表 $Adj[u]$ 中，结点 $u$ 在链表 $Adj[v]$ 中，此时，所有链表元素个数之和为 $2|E|$。如果 $G$ 是权重图，对于边 $(u,v,w)$ 来说，权重 $w$ 和结点可以同时放在对应的链表中。

### 邻接矩阵

对于图 $G=(V,E)$，其邻接矩阵是一个 $|V|\times|V|$ 的矩阵 $A=(a_{ij})$，将结点编号为 $1,2,\cdots,|V|$，则有

$$
a_{ij}=\begin{cases}
    1 &\text{如果}(i,j)\in E \\
    0
\end{cases}
$$

## 广度优先搜索

给定图 $G=(V,E)$ 和一个源结点 $s$，广度优先搜索对图中的边进行搜索以发现从源结点 $s$ 可以到达的所有结点。该算法始终将已访问的结点和未访问的结点之间的边界，沿其广度方向向外扩展，即依次访问距离源结点 $s$ 为 $1,2,3,\cdots$ 的结点。

执行广度优先搜索的过程中会生成一颗广度优先搜索树，在其中从结点 $s$ 到结点 $u$ 的简单路径就对应了图 $G$ 中从结点 $s$ 到结点 $u$ 的**最短路径**。

```java
void bfs(Map<Integer, List<Integer>> graph, int s) {
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> queue = new ArrayDeque<>();
    queue.offer(s);
    visited.add(s);
    while (!queue.isEmpty()) {
        int n = queue.size();
        while (n-- > 0) {
            int u = queue.remove();
            // do something for vertex u
            for (int v : graph.get(u)) {
                if (visited.add(v)) {
                    queue.offer(v);
                    // do something for edge (u,v)
                }
            }
        }
    }
}
```

广度优先搜索的时间复杂度为 $O(V+E)$.

## 深度优先搜索

深度优先搜索总是对最近才发现的结点的出发边进行搜索，直至该结点的所有出发边都被访问，然后**回溯**到该结点的前驱结点，搜索该前驱结点的剩余出发边。

```java
// 递归实现
void dfs(Map<Integer, List<Integer>> graph, int s) {
    dfs(graph, s, new HashSet<>());
}

void dfs(Map<Integer, List<Integer>> graph, int u, Set<Integer> visited) {
    // do something for vertex u
    for (int v : graph.get(u)) {
        if (visited.add(v)) {
            // do something for edge (u,v)
            dfs(graph, v, visited);
        }
    }
}

// 栈实现
void dfsWithStack(Map<Integer, List<Integer>> graph, int s) {
    Set<Integer> visited = new HashSet<>();
    Deque<Integer> stack = new ArrayDeque<>();
    stack.push(s);
    visited.add(s);
    while (!stack.isEmpty()) {
        int u = stack.pop();
        // do something for vertex u
        for (int v : graph.get(u)) {
            if (visited.add(v)) {
                // do something for edge (u,v)
                stack.push(v);
            }
        }
    }
}
```

深度优先搜索的时间复杂度为 $\Theta(V+E)$.

## 参考

- Cormeo T H, et al. 算法导论. 原书第 3 版. 第 22 章.
