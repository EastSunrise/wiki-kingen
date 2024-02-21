# 二叉搜索树

对二叉搜索树上的任一结点，其左子树上的所有结点值均不大于该结点值，其右子树的所有结点值均不小于该结点值。使用链表表示如下：

```java
class TreeNode {

    int val;
    TreeNode left;
    TreeNode right;
    TreeNode parent;

    TreeNode(int val) {
        this.val = val;
    }
}
```

## 查询

```java
class BinarySearchTree {

    // 递归查找指定元素
    TreeNode searchRecursively(TreeNode node, int key) {
        if (node == null || node.val == key) {
            return node;
        }
        if (key < node.val) {
            return searchRecursively(node.left, key);
        }
        return searchRecursively(node.right, key);
    }

    // 迭代查找指定元素
    TreeNode searchIteratively(TreeNode node, int key) {
        while (node != null && node.val != key) {
            if (key < node.val) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
        return node;
    }

    // 查找树的最小值
    TreeNode minimum(TreeNode node) {
        while (node.left != null) {
            node = node.left;
        }
        return node;
    }

    // 查找树的最大值
    TreeNode maximum(TreeNode node) {
        while (node.right != null) {
            node = node.right;
        }
        return node;
    }

    // 查找后继结点
    TreeNode successor(TreeNode node) {
        if (node.right != null) {
            return minimum(node.right);
        }
        TreeNode parent = node.parent;
        while (parent != null && node == parent.right) {
            node = parent;
            parent = node.parent;
        }
        return parent;
    }

    // 查找前驱结点
    TreeNode predecessor(TreeNode node) {
        if (node.left != null) {
            return maximum(node.left);
        }
        TreeNode parent = node.parent;
        while (parent != null && node == parent.left) {
            node = parent;
            parent = node.parent;
        }
        return parent;
    }
}
```

## 插入

```java
class BinarySearchTree {

    // 插入新元素
    TreeNode insert(TreeNode root, int key) {
        TreeNode node = new TreeNode(key);
        if (root == null) {
            return node;
        }
        TreeNode cur = root, parent = null;
        while (cur != null) {
            parent = cur;
            if (key < cur.val) {
                cur = cur.left;
            } else {
                cur = cur.right;
            }
        }
        node.parent = parent;
        if (key < parent.val) {
            parent.left = node;
        } else {
            parent.right = node;
        }
        return root;
    }
}
```

## 删除

```java
class BinarySearchTree {

    // 删除指定元素
    TreeNode delete(TreeNode root, int key) {
        TreeNode node = root;
        while (node != null && key != node.val) {
            if (key < node.val) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
        if (node == null) {
            // if not found
            return root;
        }

        if (node.left == null || node.right == null) {
            // if the node has at most one child, replace it with its child
            TreeNode child = node.left != null ? node.left : node.right;
            if (node.parent == null) {
                return child;
            }
            if (node.parent.left == node) {
                node.parent.left = child;
            } else {
                node.parent.right = child;
            }
            return root;
        }

        // if the node has two children, replace it with its successor
        TreeNode successor = node.right;
        while (successor.left != null) {
            successor = successor.left;
        }
        if (successor.parent.left == successor) {
            successor.parent.left = successor.right;
        } else {
            successor.parent.right = successor.right;
        }
        successor.left = node.left;
        successor.right = node.right;
        if (node.parent == null) {
            return successor;
        }
        if (node.parent.left == node) {
            node.parent.left = successor;
        } else {
            node.parent.right = successor;
        }
        return root;
    }
}
```

## 参考

- Cormeo T H, et al. 算法导论. 原书第 3 版. 第 12 章.
