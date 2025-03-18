# 跳表

跳表是可以实现二分查找的有序链表，它通过对原始链表建立多级索引，能够使得插入和查找的平均时间复杂度达到 $O(\lg{n})$。

## 实现

```java
class SkipList {

    private static final int MAX_LEVEL = 16;

    private Node head;
    private int levelSize;

    public SkipList() {
        this.head = new Node(-1, null);
        this.levelSize = 1;
    }

    public boolean search(int key) {
        Node p = head;
        while (p != null) {
            while (p.next != null && p.next.key < key) {
                p = p.next;
            }

            if (p.next != null && p.next.key == key) { // key is found
                return true;
            }
            p = p.down;
        }
        return false;
    }

    public void insert(int key) {
        int level = randomLevel();
        while (levelSize < level) { // extend levels
            head = new Node(-1, null, head);
            levelSize++;
        }

        Node p = head, up = null;
        for (int i = levelSize - 1; i >= 0; i--) {
            while (p.next != null && p.next.key < key) {
                p = p.next;
            }

            if (i < level) { // insert a node at current level
                p.next = new Node(key, p.next);
                if (up != null) {
                    up.down = p.next;
                }
                up = p.next;
            }
            p = p.down;
        }
    }

    public boolean delete(int key) {
        boolean found = false;
        Node p = head;
        while (p != null) {
            while (p.next != null && p.next.key < key) {
                p = p.next;
            }

            if (p.next != null && p.next.key == key) { // key is found
                p.next = p.next.next;
                found = true;
            }
            p = p.down;
        }
        return found;
    }

    /**
     * Levels are generated randomly.
     */
    private int randomLevel() {
        int level = 1;
        while (level < MAX_LEVEL && Math.random() < 0.5f) {
            level++;
        }
        return level;
    }

    static class Node {

        int key;
        Node next;
        Node down;

        public Node(int key, Node next) {
            this.key = key;
            this.next = next;
        }

        public Node(int key, Node next, Node down) {
            this.key = key;
            this.next = next;
            this.down = down;
        }
    }
}
```

## 参考

- [Pugh, W. 1990. Skip Lists: A Probabilistic Alternative to Balanced Trees](https://15721.courses.cs.cmu.edu/spring2018/papers/08-oltpindexes1/pugh-skiplists-cacm1990.pdf)
- [跳表 - OI Wiki](https://oi-wiki.org/ds/skiplist/)
