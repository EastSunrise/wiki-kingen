概述

二叉树是一种重要的树形结构，其特点是每个结点最多只有两个子树，且有左右之分。

A binary tree is a tree whose elements have at most 2 children.

#### 表示

##### 链表

```java
class TreeNode {

    int val;

    TreeNode left;

    TreeNode right;
}
```

##### 数组

```
// nums[0]为二叉树的根节点，对于任意父节点nums[i]，其左右子节点分别为nums[2*i+1]和nums[2*i+2]
nums[0,1,...,n-1]
```

#### 遍历

给定如图所示二叉树：

![二叉树](\img\二叉树.png)

##### 前序遍历

先访问当前结点，再访问其左子树，最后访问其右子树。图示二叉树的前序遍历结果为[1,2,3,4,5,6,7,8,9].

```java
// 递归实现
List<Integer> preorderTraversal(TreeNode root){
        List<Integer> res=new ArrayList<>();
        preorderTraversal(res,root);
        return res;
        }

        void preorderTraversal(List<Integer> res,TreeNode node){
        if(node!=null){
        // 记录/输出当前节点
        res.add(node.val);
        preorderTraversal(res,node.left);
        preorderTraversal(res,node.right);
        }
        }
```

```java
// 栈实现
List<Integer> preorderTraversal(TreeNode root){
        List<Integer> res=new ArrayList<>();
        Stack<TreeNode> stack=new Stack<>();
        TreeNode current=root;
        while(current!=null||!stack.isEmpty()){
        while(current!=null){
        // 先记录/输出当前节点
        res.add(current.val);
        // 并将当前节点入栈以便之后访问其右子树
        stack.push(current);
        // 再访问其左子树
        current=current.left;
        }
        // 转向右子树
        current=stack.pop().right;
        }
        return res;
        }
```

##### 中序遍历

先访问当前结点的左子树，再访问当前结点，最后访问其右子树。图示二叉树的中序遍历结果为[3,2,,5,4,1,7,8,6,9].

```java
// 递归实现
List<Integer> inorderTraversal(TreeNode root){
        List<Integer> result=new ArrayList<>();
        inorderTraversal(root,result);
        return result;
        }

        void inorderTraversal(TreeNode node,List<Integer> result){
        if(node==null){
        return;
        }
        inorderTraversal(node.left,result);
        // 记录/输出当前节点
        result.add(node.val);
        inorderTraversal(node.right,result);
        }
```

```java
// 栈实现
List<Integer> inorderTraversal2(TreeNode root){
        List<Integer> res=new ArrayList<>();
        Stack<TreeNode> stack=new Stack<>();
        TreeNode current=root;
        while(current!=null||!stack.isEmpty()){
        // 先将当前节点的最左路径上所有结点（包括自身）入栈，即先访问左子树
        while(current!=null){
        stack.push(current);
        current=current.left;
        }
        current=stack.pop();
        // 记录/输出当前结点
        res.add(current.val);
        // 转向右子树
        current=current.right;
        }
        return res;
        }
```

##### 后序遍历

先访问当前结点的左子树，再访问其右子树，最后访问当前结点。图示二叉树的后序遍历结果为[3,5,4,2,8,7,9,6,1].

```java
// 递归实现
List<Integer> postorderTraversal(TreeNode root){
        List<Integer> res=new ArrayList<>();
        postorderTraversal(res,root);
        return res;
        }

        void postorderTraversal(List<Integer> res,TreeNode node){
        if(node!=null){
        postorderTraversal(res,node.left);
        postorderTraversal(res,node.right);
        // 记录/输出当前结点
        res.add(node.val);
        }
        }
```

```java
// 栈实现
List<Integer> postorderTraversal2(TreeNode root){
        List<Integer> res=new ArrayList<>();
        TreeNode current=root;
        // 记录最后一次记录/输出的结点
        TreeNode last=null;
        Stack<TreeNode> stack=new Stack<>();
        while(!stack.isEmpty()||current!=null){
        // 先将当前节点的最左路径上所有结点（包括自身）入栈，即先访问左子树
        while(current!=null){
        stack.push(current);
        current=current.left;
        }
        current=stack.peek();
        // 判断当前结点是否有右子树，或者右子树是否已经访问结束
        if(current.right==null||current.right==last){
        // 如果是，记录/输出当前结点
        res.add(current.val);
        // 将当前结点出栈，
        stack.pop();
        // 记下该结点
        last=current;
        current=null;
        }else{
        // 右子树存在且访问，则转向访问右子树
        current=current.right;
        }
        }
        return res;
        }
```

##### 层序遍历

按层从左至右访问结点。图示二叉树的层序遍历结果为[1,2,6,3,4,7,9,5,6].

```java
// 队列实现
List<List<Integer>>levelOrder(TreeNode root){
        List<List<Integer>>res=new ArrayList<>();
        Queue<TreeNode> queue=new LinkedList<>();
        queue.add(root);
        while(!queue.isEmpty()){
        // 记录/输出一层，并将左右子节点入队
        int size=queue.size();
        List<Integer> level=new ArrayList<>(size);
        for(int i=0;i<size; i++){
        TreeNode node=queue.remove();
        level.add(node.val);
        if(node.left!=null){
        queue.add(node.left);
        }
        if(node.right!=null){
        queue.add(node.right);
        }
        }
        res.add(level);
        }
        return res;
        }
```

#### 参考

1. [二叉树的四种遍历方式 - 林海杜 - 博客园](https://www.cnblogs.com/du001011/p/11229170.html).
