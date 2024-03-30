# 二叉树

二叉树是一种重要的树形结构，其特点是每个结点最多只有两个子树，且有左右之分。

## 表示

### 链表

```java
class BinaryTree {

    TreeNode root;

    class TreeNode {

        int val;
        TreeNode left;
        TreeNode right;

        TreeNode(int val) {
            this.val = val;
        }
    }
}
```

### 数组

用数组 `num[0,1,...,n-1]` 来表示一颗二叉树，其中，`nums[0]` 为二叉树的根结点，对于任意父结点 `nums[i]`，其左右子结点分别为 `nums[2*i+1]`和`nums[2*i+2]`.

## 遍历

### 前序遍历 VLR

先访问当前结点，再访问其左子树，最后访问其右子树。

```java
class BinaryTree {

    // 迭代实现前序遍历
    void preorderIteratively() {
        Stack<TreeNode> stack = new Stack<>();
        if (root != null) {
            stack.push(root);
        }
        while (!stack.isEmpty()) {
            TreeNode current = stack.pop();
            System.out.println(current.val);

            // 先后将右子结点和左子结点入栈
            if (current.right != null) {
                stack.push(current.right);
            }
            if (current.left != null) {
                stack.push(current.left);
            }
        }
    }
}
```

### 中序遍历 LVR

先访问当前结点的左子树，再访问当前结点，最后访问其右子树。

```java
class BinaryTree {

    // 迭代实现中序遍历
    void inorderIteratively() {
        Stack<TreeNode> stack = new Stack<>();
        TreeNode current = root;
        while (!stack.isEmpty() || current != null) {
            // 将当前结点的最左路径（包括自身）入栈，即先进入左子树
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            System.out.println(current.val);

            // 转向右子树
            current = current.right;
        }
    }
}
```

### 后序遍历 LRV

先访问当前结点的左子树，再访问其右子树，最后访问当前结点。

```java
class BinaryTree {

    // 迭代实现后序遍历
    void postorderIteratively() {
        Stack<TreeNode> stack = new Stack<>();
        // 当前结点和最后一次访问的结点
        TreeNode current = root, last = null;
        while (!stack.isEmpty() || current != null) {
            // 将当前结点的最左路径（包括自身）入栈，即先进入左子树
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            current = stack.peek();
            if (current.right == null || current.right == last) {
                // 当前结点没有右子树，或者右子树已经访问结束，则访问当前结点，并出栈
                System.out.println(current.val);

                stack.pop();
                last = current;
                current = null;
            } else {
                // 右子树存在且未访问，则转向访问右子树
                current = current.right;
            }
        }
    }
}
```

### 层序遍历

按层从左至右访问结点。

```java
class BinaryTree {

    // 队列实现（不分层）
    void levelOrder() {
        if (root == null) {
            return;
        }
        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            // 访问队列前端的结点
            TreeNode current = queue.remove();
            System.out.println(current.val);

            // 将该结点左右子结点进队
            if (current.left != null) {
                queue.offer(current.left);
            }
            if (current.right != null) {
                queue.offer(current.right);
            }
        }
    }

    // 队列实现（分层）
    public void traverseLevels() {
        if (root == null) {
            return;
        }
        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            // 访问当前层，并将左右子结点进队
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode current = queue.remove();
                System.out.println(current.val);

                if (current.left != null) {
                    queue.offer(current.left);
                }
                if (current.right != null) {
                    queue.offer(current.right);
                }
            }
        }
    }
}
```

## 参考

- [Binary Tree Data Structure](https://www.geeksforgeeks.org/binary-tree-data-structure/)
