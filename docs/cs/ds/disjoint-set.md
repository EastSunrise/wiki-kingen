# 并查集

规定：如果 a 和 b 是亲戚，b 和 c 是亲戚，则 a 和 c 也是亲戚，即亲戚关系具有传递性。现在给定一组亲戚关系，求其中任意的两人 x 和 y 是否是亲戚？

## 原理

考虑建立集合 A 包括 a 的亲戚，集合 B 包括 b 的亲戚，如果 a 和 b 是亲戚，则将集合 A 和 B 合并，判断 x 和 y 是否是亲戚即判断 x 和 y 是否在同一个集合中。为了完成以上的操作，此时就需要使用并查集了。

并查集的重要思想在于，**选定一个元素代表整个集合**，即集合的根元素。围绕根元素，并查集需要实现两个操作：

- **查找-Find**: 对于给定的元素 x，找出其所在的集合（以集合的根元素表示），然后就可以轻松判断两个元素是否在同一个集合。
- **合并-Union**: 合并两个相关的集合为同一个集合。

```java
/**
 * 使用树结构表示一个集合，树的根结点即集合的根元素。
 */
public class MergeFindSet {

    // 对于元素i，parents[i]指向其父元素
    // 如果是根元素，则指向自身
    private final int[] parents;

    // 记录树的高度，使得在合并时，保持树的高度较低，以提高查询效率
    private final int[] height;

    // initialize every single element as a set
    public MergeFindSet(int capacity) {
        parents = new int[capacity];
        height = new int[capacity];
        for (int i = 0; i < capacity; i++) {
            parents[i] = i;
            height[i] = 1;
        }
    }

    // 查找根元素，即所在树的根结点
    private int find(int x) {
        int p = x;
        while (p != parents[p]) {
            p = parents[p];
        }
        return p;
    }

    // 合并两个集合
    public void join(int a, int b) {
        int ap = find(a);
        int bp = find(b);
        if (height[ap] > height[bp]) {
            parents[bp] = ap;
            height[bp] = 0;
        } else {
            parents[ap] = bp;
            if (height[ap] == height[bp]) {
                height[bp]++;
            }
            height[ap] = 0;
        }
    }

    // 判断两个元素是否相关
    public boolean isRelated(int a, int b) {
        return find(a) == find(b);
    }
}
```

## 参考

- [Disjoint Set (Or Union-Find) | Set 1 (Detect Cycle in an Undirected Graph) - GeeksforGeeks](https://www.geeksforgeeks.org/union-find/)
    .
