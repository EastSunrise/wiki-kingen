# 并查集

规定：如果 a 和 b 是亲戚，b 和 c 是亲戚，则 a 和 c 也是亲戚，即亲戚关系具有传递性。现在给定一组亲戚关系，求其中任意的两人 x 和 y 是否是亲戚？

## 原理

考虑建立集合 A 包括 a 的亲戚，集合 B 包括 b 的亲戚，如果 a 和 b 是亲戚，则将集合 A 和 B 合并，判断 x 和 y 是否是亲戚即判断 x 和 y 是否在同一个集合中。为了完成以上的操作，此时就需要使用并查集了。

并查集的重要思想在于，**选定一个元素代表整个集合**，即集合的根元素。围绕根元素，并查集需要实现两个操作：

- **查找-Find**: 对于给定的元素 x，找出其所在的集合（以集合的根元素表示），然后就可以轻松判断两个元素是否在同一个集合。
- **合并-Union**: 合并两个相关的集合为同一个集合（按秩合并并路径压缩）。

```java
/**
 * Disjoint Set (Union-Find Algorithm).
 **/
class DisjointSet {

    // parents[i]: point to i's ancestor
    private final int[] parents;

    // height of each tree
    private final int[] height;

    public DisjointSet(int size) {
        parents = new int[size];
        height = new int[size];
        Arrays.setAll(parents, i -> i);
        Arrays.fill(parents, 1);
    }

    /**
     * Finds the root of x with compressed path.
     */
    private int find(int x) {
        if (x == parents[x]) {
            return x;
        }
        int root = find(parents[x]);
        parents[x] = root;
        return root;
    }

    /**
     * Unites the set including a and the set including b by rank and compresses path.
     */
    public void join(int a, int b) {
        int ap = find(a);
        int bp = find(b);
        if (ap == bp) {
            return;
        }
        if (height[ap] < height[bp]) {
            parents[ap] = bp;
        } else if (height[bp] < height[ap]) {
            parents[bp] = ap;
        } else {
            parents[ap] = bp;
            height[bp]++;
        }
    }

    /**
     * Whether the two elements are related.
     */
    public boolean isRelated(int a, int b) {
        return find(a) == find(b);
    }
}
```

其中，单次 `find()` 和 `join()` 的时间复杂度均为 $O(\alpha(n))$，$\alpha(n)$ 为反阿克曼函数。

## 参考

- [Disjoint Set (Or Union-Find) | Set 1 (Detect Cycle in an Undirected Graph) - GeeksforGeeks](https://www.geeksforgeeks.org/union-find/).
