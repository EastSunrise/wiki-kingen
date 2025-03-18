# 线段树

线段树是一种[二叉搜索树](./binary-search-tree.md)，常用来维护**区间信息**，可以在 $O(\log{n})$ 的时间复杂度内实现单点更新、区间更新、区间查询（区间求和，求区间最大值，求区间最小值）等操作。

线段树是通过[分治](../divide-and-conquer.md)的方式构造的。下面以求解给定数组 $a$ 任意区间的和与最大值为例。

## 建树

```java
public class SegmentTree {

    private final int n;
    private final Node[] tree;

    public SegmentTree(int[] a) {
        this.n = a.length;
        this.tree = new Node[4 * n];
        build(a, 0, 0, n - 1);
    }

    private void build(int[] a, int p, int l, int r) {
        if (l == r) {
            tree[p] = new Node(a[l], a[l]);
            return;
        }

        int mid = (l + r) >> 1;
        build(a, 2 * p + 1, l, mid);
        build(a, 2 * p + 2, mid + 1, r);
        Node left = tree[2 * p + 1], right = tree[2 * p + 2];
        tree[p] = new Node(left.sum + right.sum, Math.max(left.max, right.max));
    }

    static class Node {
        int sum;
        int max;

        Node(int sum, int max) {
            this.sum = sum;
            this.max = max;
        }
    }
}
```

采用堆式存储区间节点（$p$ 的左右子节点下标分别是 $2p+1$ 和 $2p+2$）。

## 区间查询

```java
public class SegmentTree {

    /**
     * Returns the sum of the range [from, to].
     *
     * @param from the left index (inclusive)
     * @param to   the right index (inclusive)
     */
    public int getSum(int from, int to) {
        if (from < 0 || to >= n || from > to) {
            throw new IndexOutOfBoundsException();
        }
        return getSum(from, to, 0, 0, n - 1);
    }

    private int getSum(int from, int to, int p, int l, int r) {
        if (from <= l && r <= to) {
            return tree[p].sum;
        }
        int mid = (l + r) >> 1;
        int sum = 0;
        if (from <= mid) {
            sum += getSum(from, to, p * 2 + 1, l, mid);
        }
        if (to > mid) {
            sum += getSum(from, to, p * 2 + 2, mid + 1, r);
        }
        return sum;
    }

    /**
     * Returns the maximum of the range [from, to].
     *
     * @param from the left index (inclusive)
     * @param to   the right index (inclusive)
     */
    public int getMax(int from, int to) {
        if (from < 0 || to >= n || from > to) {
            throw new IndexOutOfBoundsException();
        }
        return getMax(from, to, 0, 0, n - 1);
    }

    private int getMax(int from, int to, int p, int l, int r) {
        if (from <= l && r <= to) {
            return tree[p].max;
        }
        int mid = (l + r) >> 1;
        if (from <= mid && to > mid) {
            int left = getMax(from, to, p * 2 + 1, l, mid);
            int right = getMax(from, to, p * 2 + 2, mid + 1, r);
            return Math.max(left, right);
        } else if (from <= mid) {
            return getMax(from, to, p * 2 + 1, l, mid);
        } else {
            return getMax(from, to, p * 2 + 2, mid + 1, r);
        }
    }
}
```

查询的时间复杂度为 $O(\log{n})$。

## 单点更新

```java
public class SegmentTree {

    /**
     * Updates the value at the given index.
     *
     * @param index the index
     * @param value the new value
     */
    public void update(int index, int value) {
        if (index < 0 || index >= n) {
            throw new IndexOutOfBoundsException(index);
        }
        update(index, value, 0, 0, n - 1);
    }

    private void update(int index, int value, int p, int l, int r) {
        if (l == r) {
            tree[p].sum = value;
            tree[p].max = value;
            return;
        }
        int mid = (l + r) >> 1;
        if (index <= mid) {
            update(index, value, 2 * p + 1, l, mid);
        } else {
            update(index, value, 2 * p + 2, mid + 1, r);
        }
        Node left = tree[2 * p + 1], right = tree[2 * p + 2];
        tree[p] = new Node(left.sum + right.sum, Math.max(left.max, right.max));
    }
}
```

单点更新的时间复杂度为 $O(\log{n})$。

## 参考

- [线段树 - OI Wiki (oi-wiki.org)](https://oi-wiki.org/ds/seg/)
- [Segment Tree - GeeksforGeeks](https://www.geeksforgeeks.org/segment-tree-data-structure/)
