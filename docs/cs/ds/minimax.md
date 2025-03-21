# 极小化极大化算法

极小化极大化算法（Minimax Algorithm）是一种在零和博弈中常用的[回溯算法](../dsa/backtracking.md)，主要应用于棋类等策略游戏中。其核心思想是在每一步决策中，最大化己方的优势，同时最小化对手的优势。

算法构建一个状态树来模拟游戏过程。每个节点代表一个游戏状态，子结点代表下一步可能的游戏状态。算法从根节点开始，递归地向下搜索所有可能的分支状态，直到找到一个最终状态（游戏结束）。在搜索过程中，算法会评估所有可能的分支状态的价值，并选择最大化收益的分支。

## Alpha-Beta 剪枝

Alpha-Beta 剪枝（Alpha-Beta Pruning）是一种用于优化极小化极大化算法的对抗性搜索算法，核心目标是通过剪除无效搜索分支降低计算复杂度，同时保持与极小化极大化算法相同的决策结果‌。

在搜索过程中，算法使用 alpha 记录当前节点已遍历的子节点的最大价值，初始为 $-\infty$，在最大化轮次更新，使用 beta 记录当前节点已遍历的子节点的最小价值，初始为 $+\infty$，在最小化轮次更新。

## 参考

- [Minimax - Wikipedia](https://en.wikipedia.org/wiki/Minimax)
- [Alpha–beta pruning - Wikipedia](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning)
- [Minimax Algorithm in Game Theory | Set 1 (Introduction) - GeeksforGeeks](https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-1-introduction/)
