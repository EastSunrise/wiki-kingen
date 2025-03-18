# Gosper's Hack

Gosper's Hack 是一种生成 $n$ 元集合所有 $k$ 元子集的算法 $(0<k\lt n)$，即求组合数 $C_{n}^{k}$ 的所有情形。

=== "Java"
    ```java
    void gospersHack(int k, int n) {
        int cur = (1 << k) - 1;
        int limit = (1 << n);
        while (cur < limit) {
            // do something
            int lb = cur & -cur;
            int r = cur + lb;
            cur = (((r ^ cur) >> 2) / lb) | r;
        }
    }
    ```
