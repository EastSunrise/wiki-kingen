#### Question

There is a condition that **A&C** are related if **A&B** and **B&C** are both related. Given some relations, infer whether **X&Y** are related.

#### Graph Theory

By building an undirected graph, it turns to judge whether the two specified points are in the same connected subgraph.

**Defects**: the structure is too large, with low efficiency.

#### Union-Find

Build a set for **A** and **A**'s relatives, another for **B** and **B**'s relatives. Merge the set if **A&B** are related. Whether **X&Y** are related is equivalent to whether **X&Y** are in the same set.

There are two key operations as follows:

- **Find**: Determine which subset a particular element is in. This can be used for determining if two elements are in the same subset.
- **Union**: Join two subsets into a single subset.

```java
/**
 * Build each set with tree structure whose root node is the representative element of the set.
 * Union: If two elements are related, merge trees where they are.
 * Find: Two elements are related if they have the same root.
 */
public class MergeFindSet {

    // store parents of all the elements
    private int[] parents;
    
    //store the depths of trees
    private int[] height;

    // initialize every single element as a set
    public MergeFindSet(int capacity) {
        parents = new int[capacity];
        height = new int[capacity];
        for (int i = 0; i < capacity; i++) {
            parents[i] = i;
            height[i] = 1;
        }
    }

	// find root node of the tree where x is in, also known as the representative element of the set.
    private int find(int x) {
        int p = x;
        while (p != parents[p]) {
            p = parents[p];
        }
        return p;
    }

    // join two elements
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

    // if a and b are related
    public boolean isRelated(int a, int b) {
        return find(a) == find(b);
    }

    public static void main(String[] args) {
        MergeFindSet mergeFindSet = new MergeFindSet(23);
        mergeFindSet.join(1, 2);
        mergeFindSet.join(2, 3);
        mergeFindSet.join(3, 4);
        mergeFindSet.join(2, 5);
        mergeFindSet.join(6, 7);
        mergeFindSet.join(7, 8);
        mergeFindSet.join(8, 9);
        mergeFindSet.join(10, 11);
        mergeFindSet.join(12, 13);
        mergeFindSet.join(14, 15);
        mergeFindSet.join(15, 16);
        mergeFindSet.join(17, 18);
        mergeFindSet.join(21, 22);
        mergeFindSet.join(2, 14);
        System.out.println(mergeFindSet.isRelated(3, 16));
    }
}
```

#### References

1. [Disjoint Set (Or Union-Find) | Set 1 (Detect Cycle in an Undirected Graph) - GeeksforGeeks](https://www.geeksforgeeks.org/union-find/)