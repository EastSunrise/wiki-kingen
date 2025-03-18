# 二叉搜索树

对二叉搜索树上的任一结点，其左子树上的所有结点值均不大于该结点值，其右子树的所有结点值均不小于该结点值。使用链表表示如下：

```java
class BinarySearchTree {

    TreeNode root;

    class TreeNode {

        int val;
        TreeNode left;
        TreeNode right;
        TreeNode parent;

        TreeNode(int val, TreeNode parent) {
            this.val = val;
            this.parent = parent;
        }
    }
}
```

## 查找

```java
class BinarySearchTree {

    TreeNode search(int key) {
        TreeNode t = root;
        while (t != null && t.val != key) {
            if (key < t.val) {
                t = t.left;
            } else {
                t = t.right;
            }
        }
        return t;
    }

    static TreeNode minimum(TreeNode t) {
        if (t == null) {
            return null;
        }
        while (t.left != null) {
            t = t.left;
        }
        return t;
    }

    static TreeNode maximum(TreeNode t) {
        if (t == null) {
            return null;
        }
        while (t.right != null) {
            t = t.right;
        }
        return t;
    }

    static TreeNode successor(TreeNode t) {
        if (t == null) {
            return null;
        } else if (t.right != null) {
            TreeNode p = t.right;
            while (p.left != null) {
                p = p.left;
            }
            return p;
        } else {
            TreeNode p = t.parent, ch = t;
            while (p != null && ch == p.right) {
                ch = p;
                p = p.parent;
            }
            return p;
        }
    }

    static TreeNode predecessor(TreeNode t) {
        if (t == null) {
            return null;
        } else if (t.left != null) {
            TreeNode p = t.left;
            while (p.right != null) {
                p = p.right;
            }
            return p;
        } else {
            TreeNode p = t.parent, ch = t;
            while (p != null && ch == p.left) {
                ch = p;
                p = p.parent;
            }
            return p;
        }
    }
}
```

## 插入

```java
class BinarySearchTree {

    boolean insert(int key) {
        TreeNode t = root;
        if (t == null) {
            root = new TreeNode(key, null);
            return true;
        }

        TreeNode p;
        int cmp;
        do {
            p = t;
            cmp = Integer.compare(key, t.val);
            if (cmp < 0) {
                t = t.left;
            } else if (cmp > 0) {
                t = t.right;
            } else { // return false if the key exists
                return false;
            }
        } while (t != null);

        TreeNode x = new TreeNode(key, p);
        if (cmp < 0) {
            p.left = x;
        } else {
            p.right = x;
        }
        return true;
    }
}
```

## 删除

找到指定元素 $x$，分情况讨论：

1. 如果 $x$ 是叶子结点，直接删除；
2. 如果 $x$ 有且仅有一个子结点，则用子结点替换 $x$；
3. 如果 $x$ 有两个子结点，则用其后继结点 $s$ 的值替换 $x$ 的值，转而删除 $s$，因为 $s$ 至多有一个子结点，分为以上两种情况。

```java
class BinarySearchTree {

    boolean delete(int key) {
        TreeNode x = search(key);
        if (x == null) { // if not found
            return false;
        }

        if (x.left != null && x.right != null) {
            // if the node has two children, swap the node with its successor
            TreeNode s = successor(x);
            x.val = s.val;
            x = s;
        }

        TreeNode replacement = x.left != null ? x.left : x.right;
        if (replacement != null) {
            // if the node has exactly one child, link its parent with its child
            replacement.parent = x.parent;
            if (x.parent == null) {
                root = replacement;
            } else if (x.parent.left == x) {
                x.parent.left = replacement;
            } else {
                x.parent.right = replacement;
            }
            x.left = x.right = x.parent = null;
        } else if (x.parent == null) {
            root = null;
        } else { // if no children, delete itself
            if (x.parent.left == x) {
                x.parent.left = null;
            } else {
                x.parent.right = null;
            }
            x.parent = null;
        }
        return true;
    }
}
```

## 参考

- Cormeo T H, et al. 算法导论. 原书第 3 版. 第 12 章.
