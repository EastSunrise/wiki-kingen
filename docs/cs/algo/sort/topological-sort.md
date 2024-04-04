# 拓扑排序

拓扑排序主要解决有向无环图的所有节点排序问题，其构造步骤如下：

1. 从图中选择一个入度为零的点；
2. 输出该顶点，从图中删除此顶点及其所有的出边；
3. 重复上面两步，直到所有顶点都输出，拓扑排序完成，或者图中不存在入度为零的点，此时说明图是有环图，拓扑排序无法完成，陷入死锁。

## 参考

- [Topological Sorting - GeeksforGeeks](https://www.geeksforgeeks.org/topological-sorting/)
- [拓扑排序 - OI Wiki](https://oi-wiki.org/graph/topo/)
