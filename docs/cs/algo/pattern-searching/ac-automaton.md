# AC 自动机

AC 自动机是 以 Trie 的结构为基础，结合 [KMP](./kmp-algorithm.md) 的思想 建立的自动机，用于解决多模式匹配等任务。

1. 将所有模式串插入到 Trie 中；
2. 基于 KMP 的思想，对 Trie 上的所有结点构造失配指针。

## 字典树

Trie 中的结点表示的是某个模式串的前缀（状态）。一个结点表示一个状态，Trie 的边就是状态的转移。

## 失配指针

AC 自动机利用一个 fail 指针来辅助多模式串的匹配，类似 KMP 的 next 数组。

状态 $u$ 的 fail 指针指向另一个状态 $v$，其中 $v$ 是 Trie 的一个前缀，又是 $u$ 的最长后缀（即在若干个后缀状态中取最长的一个作为 fail 指针）。

考虑字典树中当前的结点 $u$，其父结点是 $p$，$p$ 通过字符 $c$ 的边指向 $u$，即 $\operatorname{trie}(p, c)=u$。假设深度小于 $u$ 的所有结点的 fail 指针都已求得。

1. 如果 $\operatorname{trie}(\operatorname{fail}(p), c)$ 存在：则让 $u$ 的 fail 指针指向 $\operatorname{trie}(\operatorname{fail}(p), c)$。相当于在 $p$ 和 $\operatorname{fail}(p)$ 后面加一个字符 $c$，分别对应 $u$ 和 $\operatorname{fail}(u)$；
2. 如果 $\operatorname{trie}(\operatorname{fail}(p), c)$ 不存在：那么继续找到 $\operatorname{trie}(\operatorname{fail}(\operatorname{fail}(p)), c)$。重复判断过程，直到根结点；
3. 如果依然不存在，就让 fail 指针指向根结点。

如此即完成了 $\operatorname{fail}(u)$ 的构建。

## 参考

- [AC 自动机 - OI Wiki](https://oi-wiki.org/string/ac-automaton/)
