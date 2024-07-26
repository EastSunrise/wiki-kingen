# 红黑树

红黑树是一颗二叉搜索树，它在每个结点上增加一个存储位表示该结点的颜色，RED 或 BLACK。通过对任意从根到叶子结点（NIL 结点）的简单路径上各结点颜色的约束，红黑树可以确保没有一条路径会比其他路径长出两倍，因而是近似**平衡**的。

```java
class RedBlackTree {

    static final boolean RED = false;
    static final boolean BLACK = true;

    TreeNode root;

    static class TreeNode {

        int val;
        TreeNode left;
        TreeNode right;
        TreeNode parent;
        boolean color = BLACK;

        TreeNode(int val, TreeNode parent) {
            this.val = val;
            this.parent = parent;
        }
    }
}
```

## 性质

红黑树满足以下性质：

1. 每个结点要么是红色的，要么是黑色的；
2. 根节点是黑色的；
3. 每个叶子结点（NIL）是黑色的；
4. 如果一个结点是红色的，则它的两个子结点都是黑色的；因此红色结点的父结点只能是黑色；
5. 对每个结点，从该结点到其所有后代叶子结点的简单路径上，均包含相同数目的黑色结点。

从某个结点 $x$ 出发（不包含该结点）到达一个叶子结点的任意一条简单路径上的黑色结点个数称为该结点的**黑高**，记作 $bh(x)$。红黑树的黑高为其根结点的黑高。

根据数学归纳法，结合性质 4 和 5 可得，以任一结点 $x$ 为根的子树中至少包含 $2^{bh(x)}-1$ 个内部结点（带关键字的结点）。

设 $h$ 为树的高度，$n$ 为树的内部结点的数目，根据性质 4 可知树的黑高至少为 $h/2$，从而

$$
n\ge 2^{bh} - 1 \ge 2^{h/2}-1
$$

取对数可得

$$
h \le 2\lg (n+1)
$$

即，**一棵有 $n$ 个内部结点的红黑树的高度至多为 $2\lg(n+1)$**，那么在红黑树的查找操作的时间复杂度为 $O(\lg n)$.

## 旋转

对红黑树执行常规的插入和删除操作后，结果可能不符合红黑树的性质，为了维护这些性质，需要修改某些结点的颜色和树的结构。通过**旋转**修改树的结构，仍能保持二叉搜索树的性质。

```mermaid
---
config:
  theme: base
  themeVariables:
    fontSize: "24px"
---
flowchart LR
    subgraph A[" "]
        direction TB
        x1((x))
        y1((y))
        a1((a))
        b1((b))
        c1((c))

        y1 --> x1 & c1
        x1 --> a1 & b1
    end

    subgraph B[" "]
        direction TB
        x2((x))
        y2((y))
        a2((a))
        b2((b))
        c2((c))

        x2 --> a2 & y2
        y2 --> b2 & c2
    end

    B -->|左旋 x| A
    A -->|右旋 y| B

classDef no-boarder fill:transparent,stroke-width:0;
classDef grey-node fill:lightgrey,stroke:black,stroke-width:1px,color:black;
classDef no-color fill:transparent,stroke:black,stroke-width:1px;

class A,B no-boarder
class x1,y1,x2,y2 grey-node
class a1,b1,c1,a2,b2,c2 no-color
```

```java
class RedBlackTree {

    // rotate counterclockwise with t as the pivot point
    void rotateLeft(TreeNode t) {
        if (t != null) {
            TreeNode r = t.right;
            t.right = r.left;
            if (r.left != null) {
                r.left.parent = t;
            }
            r.parent = t.parent;
            if (t.parent == null) {
                root = r;
            } else if (t.parent.left == t) {
                t.parent.left = r;
            } else {
                t.parent.right = r;
            }
            r.left = t;
            t.parent = r;
        }
    }

    // rotate clockwise with t as the pivot point
    void rotateRight(TreeNode t) {
        if (t != null) {
            TreeNode l = t.left;
            t.left = l.right;
            if (l.right != null) {
                l.right.parent = t;
            }
            l.parent = t.parent;
            if (t.parent == null) {
                root = l;
            } else if (t.parent.left == t) {
                t.parent.left = l;
            } else {
                t.parent.right = l;
            }
            l.right = t;
            t.parent = l;
        }
    }
}
```

## 插入

先执行标准的[二叉搜索树插入算法](binary-search-tree.md#插入)，并将该结点设为红色，然后分情况讨论（设新插入的结点为 $x$）：

1. 如果 $x$ 是根结点，不满足性质 2，将其变为黑色（此时树的黑高增加 1）；
2. 如果 $x$ 的父结点 $p$ 为黑色，仍然满足红黑树的性质，树的黑高不变；
3. 否则 $x$ 不是根结点，且 $p$ 是红色，不满足性质 4，考虑 $x$ 的**叔父结点**，即祖父结点 $g$ 的另一个子结点 $u$ 的颜色。

（情形 3.1）如果 $u$ 是红色，那么将 $p$ 和 $u$ 变为黑色，$g$ 变为红色，然后对 $g$ 重复上述步骤。

```mermaid
---
title: "叔父结点为红色"
config:
  theme: base
  themeVariables:
    fontSize: "24px"
---
flowchart LR
    subgraph A[" "]
        direction TB
        g1((g))
        p1((p))
        u1((u))
        x1((x))
        c1((c))
        d1((d))
        e1((e))
        a1((N))
        b1((N))

        g1 --> p1 & u1
        p1 --> x1 & c1
        u1 --> d1 & e1
        x1 --> a1 & b1
        d1 ~~~ xa1 & xb1
    end

    subgraph B[" "]
        direction TB
        g2((g))
        p2((p))
        u2((u))
        x2((x))
        c2((c))
        d2((d))
        e2((e))
        a2((N))
        b2((N))

        g2 --> p2 & u2
        p2 --> x2 & c2
        u2 --> d2 & e2
        x2 --> a2 & b2
        d2 ~~~ xa2 & xb2
    end

    A --> B

classDef no-boarder fill:transparent,stroke-width:0px;
classDef hidden display:none;
classDef black-node fill:lightgrey,stroke:black,stroke-width:1px,color:black;
classDef red-node fill:#ff8080,stroke:black,stroke-width:1px,color:black;
classDef no-color fill:transparent,stroke:black,stroke-width:1px;

class A,B no-boarder
class xa1,xb1,xa2,xb2 hidden
class g1,a1,b1,c1,d1,e1,p2,u2,a2,b2,c2,d2,e2 black-node
class p1,u1,x1,g2,x2 red-node
```

（情形 3.2）如果 $u$ 是黑色，考虑 $p$ 和 $g$、$x$ 和 $p$ 的位置关系，根据不同情况进行旋转和变色：

- LL 型：$p$ 和 $x$ 分别是 $g$ 和 $p$ 的左子结点；
- LR 型：$p$ 是 $g$ 的左子结点，$x$ 是 $p$ 的右子结点；
- RR 型：LL 型的镜像；
- RL 型：LR 型的镜像。

如果为 LL 型，将 $p$ 变为黑色，$g$ 变为红色，然后以祖父结点 $g$ 为支点进行右旋，树的黑高不变。

```mermaid
---
title: "LL 型变换"
config:
  theme: base
  themeVariables:
    fontSize: "24px"
---
flowchart LR
    subgraph A[" "]
        direction TB
        g1((g))
        p1((p))
        u1((u))
        x1((x))
        c1((c))
        d1((d))
        e1((e))
        a1((N))
        b1((N))

        g1 --> p1 & u1
        p1 --> x1 & c1
        u1 --> d1 & e1
        x1 --> a1 & b1
        d1 ~~~ xa1 & xb1
    end

    subgraph B[" "]
        direction TB
        g2((g))
        p2((p))
        u2((u))
        x2((x))
        c2((c))
        d2((d))
        e2((e))
        a2((N))
        b2((N))

        g2 --> p2 & u2
        p2 --> x2 & c2
        u2 --> d2 & e2
        x2 --> a2 & b2
        d2 ~~~ xa2 & xb2
    end

    subgraph C[" "]
        direction TB
        p3((p))
        x3((x))
        g3((g))
        a3((N))
        b3((N))
        c3((c))
        u3((u))
        d3((d))
        e3((e))

        p3 --> x3 & g3
        x3 --> a3 & b3
        g3 --> c3 & u3
        b3 ~~~ xa3 & xb3
        u3 --> d3 & e3
    end

    A --> B
    B --> C

classDef no-boarder fill:transparent,stroke-width:0px;
classDef hidden display:none;
classDef black-node fill:lightgrey,stroke:black,stroke-width:1px,color:black;
classDef red-node fill:#ff8080,stroke:black,stroke-width:1px,color:black;
classDef no-color fill:transparent,stroke:black,stroke-width:1px;

class A,B,C no-boarder
class xa1,xb1,xa2,xb2,xa3,xb3 hidden
class g1,u1,a1,b1,c1,p2,u2,a2,b2,c2,p3,a3,b3,c3,u3 black-node
class p1,x1,g2,x2,x3,g3 red-node
class d1,e1,d2,e2,d3,e3 no-color
```

如果为 LR 型，交换 $x$ 和 $p$ 的指针，以结点 $x$ 为支点进行左旋后，变为 LL 型。

```mermaid
---
title: "LR 型变换"
config:
  theme: base
  themeVariables:
    fontSize: "24px"
---
flowchart LR
    subgraph A[" "]
        direction TB
        g1((g))
        p1((p))
        u1((u))
        a1((a))
        x1((x))
        d1((d))
        e1((e))
        b1((N))
        c1((N))

        g1 --> p1 & u1
        p1 --> a1 & x1
        u1 --> d1 & e1
        x1 --> b1 & c1
        e1 ~~~ xa1 & xb1
    end

    subgraph B[" "]
        direction TB
        g2((g))
        x2((x))
        u2((u))
        a2((a))
        p2((p))
        d2((d))
        e2((e))
        b2((N))
        c2((N))

        g2 --> x2 & u2
        x2 --> a2 & p2
        u2 --> d2 & e2
        p2 --> b2 & c2
        e2 ~~~ xa2 & xb2
    end

    subgraph C[" "]
        direction TB
        g3((g))
        p3((p))
        u3((u))
        x3((x))
        c3((N))
        d3((d))
        e3((e))
        a3((a))
        b3((N))

        g3 --> p3 & u3
        p3 --> x3 & c3
        u3 --> d3 & e3
        x3 --> a3 & b3
        d3 ~~~ xa3 & xb3
    end

    A --> B
    B --> C

classDef no-boarder fill:transparent,stroke-width:0px;
classDef hidden display:none;
classDef black-node fill:lightgrey,stroke:black,stroke-width:1px,color:black;
classDef red-node fill:#ff8080,stroke:black,stroke-width:1px,color:black;
classDef no-color fill:transparent,stroke:black,stroke-width:1px;

class A,B,C no-boarder
class xa1,xb1,xa2,xb2,xa3,xb3 hidden
class g1,u1,a1,b1,c1,g2,u2,a2,b2,c2,g3,u3,c3,a3,b3 black-node
class p1,x1,x2,p2,p3,x3 red-node
class d1,e1,d2,e2,d3,e3 no-color
```

```java
class RedBlackTree {

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
            if (key < t.val) {
                t = t.left;
            } else if (key > t.val) {
                t = t.right;
            } else { // if the key exists
                return false;
            }
        } while (t != null);

        t = new TreeNode(key, p);
        if (cmp < 0) {
            p.left = t;
        } else {
            p.right = t;
        }

        fixAfterInsertion(t);
        return true;
    }

    void fixAfterInsertion(TreeNode x) {
        x.color = RED;
        while (x != null && x.parent != null && x.parent.color == RED) {
            if (parentOf(x) == leftOf(parentOf(parentOf(x)))) {
                TreeNode u = rightOf(parentOf(parentOf(x)));
                if (colorOf(u) == RED) { // u is red
                    setColor(x.parent, BLACK);
                    setColor(u, BLACK);
                    setColor(parentOf(x.parent), RED);
                    x = parentOf(parentOf(x));
                } else {
                    if (x == rightOf(parentOf(x))) { // lr to ll
                        x = parentOf(x);
                        rotateLeft(x);
                    }
                    // fix ll
                    setColor(parentOf(x), BLACK);
                    setColor(parentOf(parentOf(x)), RED);
                    rotateRight(parentOf(parentOf(x)));
                }
            } else {
                TreeNode u = leftOf(parentOf(parentOf(x)));
                if (colorOf(u) == RED) { // u is red
                    setColor(parentOf(x), BLACK);
                    setColor(u, BLACK);
                    setColor(parentOf(parentOf(x)), RED);
                    x = parentOf(parentOf(x));
                } else {
                    if (x == leftOf(parentOf(x))) { // rl to rr
                        x = parentOf(x);
                        rotateRight(x);
                    }
                    // fix rr
                    setColor(parentOf(x), BLACK);
                    setColor(parentOf(parentOf(x)), RED);
                    rotateLeft(parentOf(parentOf(x)));
                }
            }
        }
        root.color = BLACK;
    }
}
```

## 删除

先执行标准的[二叉搜索树删除算法](binary-search-tree.md#删除)，设 $t$ 是最后删除的结点（如果目标结点有两个子结点，$t$ 为目标结点的后继结点），$x$ 是替换 $t$ 的子结点（可能为 `null`），分情况讨论：

1. 如果 $t$ 和 $x$ 中一个为红色，一个为黑色（根据性质 4 不可能均为红色），删除 $t$ 后将 $x$ 变为黑色，此时黑高不变；
2. 如果 $t$ 和 $x$ 均为黑色，且 $t$ 为根结点，删除后仍然满足红黑树的性质，此时树的黑高减一；
3. 否则，将 $x$ 标记为**双黑**（double black），考虑其**兄弟结点**，即父结点 $p$ 的另一个子结点 $s$.

```mermaid
---
title: "双黑标记"
config:
  theme: base
  themeVariables:
    fontSize: "24px"
---
flowchart LR
    subgraph A[" "]
        direction TB
        p1((p))
        t1((t))
        s1((s))
        x1((x))
        q1((q))
        r1((r))

        p1 --> t1 & s1
        t1 --> x1
        t1 ~~~ xa1
        s1 --> q1 & r1
    end

    subgraph B[" "]
        direction TB
        p2((p))
        x2(((x)))
        s2((s))
        q2((q))
        r2((r))

        p2 --> x2 & s2
        s2 --> q2 & r2
    end

    A --> B

classDef no-boarder fill:transparent,stroke-width:0px;
classDef hidden display:none;
classDef black-node fill:lightgrey,stroke:black,stroke-width:1px,color:black;
classDef double-node fill:lightgrey,stroke:black,stroke-width:2px,color:black;
classDef no-color fill:transparent,stroke:black,stroke-width:1px;

class A,B no-boarder
class xa1 hidden
class t1,x1 black-node
class x2 double-node
class p1,s1,q1,r1,p2,s2,q2,r2 no-color
```

（情形 3.1）如果 $s$ 是红色，将 $s$ 变为黑色，$p$ 变为红色，并以 $p$ 为支点进行左旋（$s$ 为 $p$ 的右子结点）或右旋（$s$ 为 $p$ 的左子结点），讨论 $x$ 的新的兄弟结点（原 $s$ 的子结点，所以必定是黑色）。

```mermaid
---
title: "兄弟结点为红色"
config:
  theme: base
  themeVariables:
    fontSize: "24px"
---
flowchart LR
    subgraph A[" "]
        direction TB
        p1((p))
        x1(((x)))
        s1((s))
        q1((q))
        r1((r))

        p1 --> x1 & s1
        s1 --> q1 & r1
    end

    subgraph B[" "]
        direction TB
        p2((p))
        x2(((x)))
        s2((s))
        q2((q))
        r2((r))

        p2 --> x2 & s2
        s2 --> q2 & r2
    end

    subgraph C[" "]
        direction TB
        s3((s))
        p3((p))
        r3((r))
        x3(((x)))
        q3((q))

        s3 --> p3 & r3
        p3 --> x3 & q3
    end

    A --> B
    B --> C

classDef no-boarder fill:transparent,stroke-width:0px;
classDef hidden display:none;
classDef black-node fill:lightgrey,stroke:black,stroke-width:1px,color:black;
classDef red-node fill:#ff8080,stroke:black,stroke-width:1px,color:black;
classDef double-node fill:lightgrey,stroke:black,stroke-width:2px,color:black;
classDef no-color fill:transparent,stroke:black,stroke-width:1px;

class A,B,C no-boarder
class p1,q1,r1,s2,q2,r2,s3,r3,q3 black-node
class s1,p2,p3 red-node
class x1,x2,x3 double-node
```

（情形 3.2）如果 $s$ 是黑色，且其子结点均为黑色，考虑 $p$ 的颜色：

- 如果 $p$ 为黑色，将 $s$ 变为红色，双黑标记改为 $p$ 结点，对双黑结点 $p$ 进行处理；
- 如果 $p$ 为红色，将 $s$ 变为红色，将 $p$ 变为黑色，树的黑高不变。

```mermaid
---
title: "兄弟结点及其子结点为黑色"
config:
  theme: base
  themeVariables:
    fontSize: "24px"
---
flowchart LR
    subgraph A[" "]
        direction TB
        p1((p))
        x1(((x)))
        s1((s))
        q1((q))
        r1((r))

        p1 --> x1 & s1
        s1 --> q1 & r1
    end

    subgraph B[" "]
        direction TB
        p2(((p)))
        x2((x))
        s2((s))
        q2((q))
        r2((r))

        p2 --> x2 & s2
        s2 --> q2 & r2
    end

    A --> B

    subgraph C[" "]
        direction TB
        p3((p))
        x3(((x)))
        s3((s))
        q3((q))
        r3((r))

        p3 --> x3 & s3
        s3 --> q3 & r3
    end

    subgraph D[" "]
        direction TB
        p4((p))
        x4((x))
        s4((s))
        q4((q))
        r4((r))

        p4 --> x4 & s4
        s4 --> q4 & r4
    end

    C --> D

classDef no-boarder fill:transparent,stroke-width:0px;
classDef hidden display:none;
classDef black-node fill:lightgrey,stroke:black,stroke-width:1px,color:black;
classDef red-node fill:#ff8080,stroke:black,stroke-width:1px,color:black;
classDef double-node fill:lightgrey,stroke:black,stroke-width:2px,color:black;
classDef no-color fill:transparent,stroke:black,stroke-width:1px;

class BP,RP,A,B,C,D no-boarder
class p1,s1,q1,r1,x2,q2,r2,s3,q3,r3,p4,x4,q4,r4 black-node
class s2,p3,s4 red-node
class x1,p2,x3 double-node
```

（情形 3.3）如果 $s$ 是黑色，且其至少有一个红色子结点，则根据 $s$ 和 $p$、红色子结点 和 $s$ 的位置关系分为四种情况，针对不同情况进行旋转和变色：

- RR 型：$s$ 是 $p$ 的右子结点，$s$ 的右子结点为红色，左子结点颜色任意；
- RL 型：$s$ 是 $p$ 的右子结点，$s$ 的左子结点为红色，右子结点为黑色；
- LL 型：RR 型的镜像；
- LR 型：RL 型的镜像。

如果为 RR 型，交换 $p$ 和 $s$ 的颜色，将 $r$ 变为黑色，然后以 $p$ 为支点进行左旋，移除双黑标记后两个子树黑色结点数恢复平衡。

```mermaid
---
title: "RR 型变换"
config:
  theme: base
  themeVariables:
    fontSize: "24px"
---
flowchart LR
    subgraph A[" "]
        direction TB
        p1((p))
        x1(((x)))
        s1((s))
        q1((q))
        r1((r))

        p1 --> x1 & s1
        s1 --> q1 & r1
    end

    subgraph B[" "]
        direction TB
        p2((p))
        x2(((x)))
        s2((s))
        q2((q))
        r2((r))

        p2 --> x2 & s2
        s2 --> q2 & r2
    end

    subgraph C[" "]
        direction TB
        s3((s))
        p3((p))
        r3((r))
        x3((x))
        q3((q))

        s3 --> p3 & r3
        p3 --> x3 & q3
    end

    A --> B
    B --> C

classDef no-boarder fill:transparent,stroke-width:0px;
classDef hidden display:none;
classDef black-node fill:lightgrey,stroke:black,stroke-width:1px,color:black;
classDef red-node fill:#ff8080,stroke:black,stroke-width:1px,color:black;
classDef double-node fill:lightgrey,stroke:black,stroke-width:2px,color:black;
classDef no-color fill:transparent,stroke:black,stroke-width:1px;

class A,B,C no-boarder
class s1,p2,r2,p3,r3,x3 black-node
class r1 red-node
class x1,x2 double-node
class p1,q1,s2,q2,s3,q3 no-color
```

如果为 RL 型，将 $s$ 变为红色，将其左子结点变为黑色，以 $s$ 为支点进行右旋后，变为 RR 型。

```mermaid
---
title: "RR 型变换"
config:
  theme: base
  themeVariables:
    fontSize: "24px"
---
flowchart LR
    subgraph A[" "]
        direction TB
        p1((p))
        x1(((x)))
        s1((s))
        q1((q))
        r1((r))
        a1((a))
        b1((b))

        p1 --> x1 & s1
        s1 --> q1 & r1
        q1 --> a1 & b1
    end

    subgraph B[" "]
        direction TB
        p2((p))
        x2(((x)))
        s2((s))
        q2((q))
        r2((r))
        a2((a))
        b2((b))

        p2 --> x2 & s2
        s2 --> q2 & r2
        q2 --> a2 & b2
    end

    subgraph C[" "]
        direction TB
        p3((p))
        x3(((x)))
        q3((q))
        a3((a))
        s3((s))
        b3((b))
        r3((r))

        p3 --> x3 & q3
        q3 --> a3 & s3
        s3 --> b3 & r3
    end

    A --> B
    B --> C

classDef no-boarder fill:transparent,stroke-width:0px;
classDef hidden display:none;
classDef black-node fill:lightgrey,stroke:black,stroke-width:1px,color:black;
classDef red-node fill:#ff8080,stroke:black,stroke-width:1px,color:black;
classDef double-node fill:lightgrey,stroke:black,stroke-width:2px,color:black;
classDef no-color fill:transparent,stroke:black,stroke-width:1px;

class A,B,C no-boarder
class s1,r1,a1,b1,q2,r2,a2,b2,q3,a3,b3,r3 black-node
class q1,s2,s3 red-node
class x1,x2,x3 double-node
class p1,p2,p3 no-color
```

```java
class RedBlackTree {
    boolean delete(int key) {
        TreeNode t = search(key);
        if (t == null) {
            return false;
        }

        if (t.left != null && t.right != null) {
            // if the node has two children, swap the node with its successor
            TreeNode s = successor(t);
            t.val = s.val;
            t = s;
        }

        TreeNode replacement = t.left != null ? t.left : t.right;
        if (replacement != null) {
            // if the node has exactly one child, link its parent with its child
            replacement.parent = t.parent;
            if (t.parent == null) {
                root = replacement;
            } else if (t == t.parent.left) {
                t.parent.left = replacement;
            } else {
                t.parent.right = replacement;
            }

            t.left = t.right = t.parent = null;

            // Fix replacement
            if (t.color == BLACK) {
                fixAfterDeletion(replacement);
            }
        } else if (t.parent == null) { // if it's the only node.
            root = null;
        } else {
            // if no children, use self as phantom replacement and unlink
            if (t.color == BLACK) {
                fixAfterDeletion(t);
            }

            if (t.parent != null) {
                if (t == t.parent.left) {
                    t.parent.left = null;
                } else if (t == t.parent.right) {
                    t.parent.right = null;
                }
                t.parent = null;
            }
        }
        return true;
    }

    void fixAfterDeletion(TreeNode x) {
        while (x.color == BLACK && x.parent != null) {
            if (x == leftOf(parentOf(x))) {
                TreeNode s = rightOf(parentOf(x));
                if (colorOf(s) == RED) {
                    setColor(s, BLACK);
                    setColor(parentOf(x), RED);
                    rotateLeft(parentOf(x));
                    s = rightOf(parentOf(x));
                }

                if (colorOf(leftOf(s)) == BLACK && colorOf(rightOf(s)) == BLACK) {
                    setColor(s, RED);
                    x = parentOf(x);
                } else {
                    if (colorOf(rightOf(s)) == BLACK) { // rl to rr
                        setColor(s, RED);
                        setColor(leftOf(s), BLACK);
                        rotateRight(s);
                        s = rightOf(parentOf(x));
                    }

                    setColor(s, colorOf(parentOf(x)));
                    setColor(parentOf(x), BLACK);
                    setColor(rightOf(s), BLACK);
                    rotateLeft(parentOf(x));
                    x = root;
                }
            } else {
                TreeNode s = leftOf(parentOf(x));
                if (colorOf(s) == RED) {
                    setColor(s, BLACK);
                    setColor(parentOf(x), RED);
                    rotateRight(parentOf(x));
                    s = leftOf(parentOf(x));
                }

                if (colorOf(rightOf(s)) == BLACK && colorOf(leftOf(s)) == BLACK) {
                    setColor(s, RED);
                    x = parentOf(x);
                } else {
                    if (colorOf(leftOf(s)) == BLACK) { // lr to ll
                        setColor(s, RED);
                        setColor(rightOf(s), BLACK);
                        rotateLeft(s);
                        s = leftOf(parentOf(x));
                    }

                    setColor(s, colorOf(parentOf(x)));
                    setColor(parentOf(x), BLACK);
                    setColor(leftOf(s), BLACK);
                    rotateRight(parentOf(x));
                    x = root;
                }
            }
        }
        setColor(x, BLACK);
    }
}
```

## 参考

- Cormeo T H, et al. 算法导论. 原书第 3 版. 第 13 章.
- Sedgewick R, Wayne K. 算法. 第 4 版. 第 3.3 节.
- [Introduction to Red-Black Tree - GeeksforGeeks](https://www.geeksforgeeks.org/introduction-to-red-black-tree/)
- [TreeMap (Java SE 17 & JDK 17)](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/TreeMap.html)
