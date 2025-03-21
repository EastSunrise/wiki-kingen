# KMP 算法

给定文本字符串 $txt[0,n-1]$（以下称为 $T$） 和模式字符串 $pat[0,m-1]$（以下称为 $P$），在 $T$ 中查找 $P$（假定 $n\ge m\ge 1$）。

## 暴力匹配

```java
class PatternSearching {

    // 暴力匹配
    public int bruteForce(char[] txt, char[] pat) {
        int m = pat.length;
        int imax = (txt.length - m);
        for (int i = 0; i <= imax; i++) {
            // 比较 T[i,i+m-1] 和 P[0,m-1]
            int j = 0;
            while (j < m && txt[i + j] == pat[j]) {
                j++;
            }
            if (j == m) {
                return i;
            }
        }
        return -1;
    }
}
```

## 算法

上述暴力匹配算法中，一旦匹配失败时，$P$ 就会右移一位（即 $i=i+1$），然后从头开始匹配（$j=0$），已经匹配的部分直接被丢弃，而 KMP 算法的关键思想就在于：**利用已经匹配的部分，保持 $i$ 不变，修改 $j$ 使得 $P$ 移动到下一个有效的位置**。

### 找到下一个位置

讨论一般情形，设 $T=t_0,t_1,\cdots,t_{n-1};\ P=p_0,p_1,\cdots,p_{m-1}$，在如图位置时，匹配失败，即 $t_{i+j}\ne p_j$

$$
\begin{matrix}
    t_0 t_1··· t_{i-1} &t_i &t_{i+1} &··· &t_{i+j-1} &t_{i+j} ··· &t_{n-1} \\
    &\| &\| & &\| &\not{||} \\
    &p_0 &p_1 &··· &p_{j-1} &p_j
\end{matrix}
$$

此时有

$$
\begin{equation}
    t_i t_{i+1} ··· t_{i+j-1}=p_0 p_1 ··· p_{j-1}
\end{equation}
$$

如果按照暴力匹配，则下一步应匹配

$$
\begin{equation}
    t_{i+1} t_{i+2}···t_{i+m}\stackrel{?}{=}p_0 p_1 ··· p_{m-1}
\end{equation}
$$

如果在 $P$ 中，有

$$
\begin{equation}
    p_0 p_1 ··· p_{j-2}\ne p_1 p_2 ··· p_{j-1}
\end{equation}
$$

则结合式 $(1)$ 可知这一步必然匹配失败：

$$
\begin{equation}
   p_0 p_1 ··· p_{j-2}\ne p_1 p_2 ··· p_{j-1}=t_{i+1} t_{i+2} ··· t_{i+j-1}
\end{equation}
$$

从而可以忽略这一步。同理如果有

$$
\begin{equation}
    p_0 p_1 ··· p_{j-3} \ne p_2 p_3 ··· p_{j-1}
\end{equation}
$$

结合式 $(1)$ 有

$$
\begin{equation}
    p_0 p_1 ··· p_{j-3} \ne p_2 p_3 ··· p_{j-1} = t_{i+2} t_{i+3} ··· t_{i+j-1}
\end{equation}
$$

以此类推，直到存在值 $k$，使得

$$
\begin{gather}
    p_0 p_1 ··· p_k &\ne p_{j-k-1} p_{j-k} ··· p_{j-1} \\
    p_0 p_1 ··· p_{k-1} &= p_{j-k} p_{j-k+1} ··· p_{j-1}
\end{gather}
$$

结合式 $(1)$ 有

$$
\begin{matrix}
    ··· &t_i &··· &t_{i+j-k} &t_{i+j-k+1} &··· &t_{i+j-1} &t_{i+j} &··· \\
    &\| & &\| &\| & &\| &| \\
    &p_0 &··· &p_{j-k} &p_{j-k+1} &··· &p_{j-1} &?? \\
    & & &\| &\| & &\| &| \\
    \Longrightarrow & & &p_0 &p_1 &··· &p_{k-1} &p_k &···
\end{matrix}
$$

因此当匹配失败（$t_{i+j} \ne p_j$）时，保持 $T$ 不动，将 $P$ 右移 $j-k$，使得 $t_{i+j-k}$ 和 $p_0$ 对齐,，然后从 $t_{i+j}$ 和 $p_k$ 开始匹配即可。

### 最长公共前缀后缀

观察式 $(3)$、式 $(5)$、式 $(7)$ 和式 $(8)$，容易发现，等式左侧均为 $p_0 p_1 ··· p_{j-1}$ 的 **前缀子串** ，等式右侧则是其 **后缀子串**，两者是否匹配决定了 $k$ 的值。换句话说，$k$ 其实就是 $p_j$ 前的字符串的最长公共前缀后缀的长度，称为 $P$ 的 **特征函数**，记作 $next(j)$，定义如下：

$$
\begin{equation}
    next(j)=
    \begin{cases}
        -1, &j=0 \\
        max\{k\ |\ 0\le k<j\ 且\ P[0,k-1]=P[j-k,j-1]\}, &j>0
    \end{cases}
\end{equation}
$$

如何计算出特征函数 $next(j)$，是实现 KMP 算法的关键，下面使用递推计算 $next(j)$ 的值。

设已知 $next(j)=k$，即有

$$
\begin{equation}
    p_0 p_1 ··· p_{k-1} = p_{j-k} p_{j-k+1} ··· p_{j-1}
\end{equation}
$$

（一）如果 $p_k=p_j$，结合式 $(10)$，易知

$$
\begin{equation}
    p_0 p_1 ··· p_{k} = p_{j-k} p_{j-k+1} ··· p_{j}
\end{equation}
$$

即 $next(j+1)=k+1=next(j)+1$;

（二）如果 $p_k \ne p_j$，则在 $p_0 p_1 ··· p_{k-1}$ 中寻找 $h$ 使得

$$
\begin{equation}
    p_0 p_1 ··· p_{h-1} = p_{k-h} p_{k-h+1} ··· p_{k-1}
\end{equation}
$$

即 $next(k)=h$；

（1）如果存在这样的 $h$，结合式 $(10)$ 和式 $(12)$，

$$
\begin{equation}
    p_0 p_1 ··· p_{h-1} = p_{k-h} p_{k-h+1} ··· p_{k-1} = p_{j-h} p_{j-h+1} ··· p_{j-1}
\end{equation}
$$

再分两种情况：

1. 如果 $p_h=p_j$，则 $next(j+1)=h+1=next(k)+1=next(next(j))+1$；
2. 如果 $p_h \ne p_j$，则在 $p_0 p_1 ··· p_{h-1}$ 中继续寻找更小的 $t$，直至 $next(t)=-1$；

（2）如果 $h$ 不存在，此时 $next(k)=-1$.

### 总结

总的来说，在暴力匹配算法中，一旦匹配失败，模式串会向后移动一位，而在 KMP 算法通过预处理模式串，使得匹配失败时，可以将模式串向后移动多位，不用重复比较之前的部分。

整个过程中，预处理时遍历了一遍模式串，匹配时至多遍历一遍文本串，因此算法的时间复杂度为 $T=O(m+n)$，其中 $n$ 和 $m$ 分别为文本串和模式串的长度。预处理后需要保存模式串的特征函数，因此算法的空间复杂度为 $S=O(m)$.

## 实现

```java
class PatternSearching {

    int[] computeNext(char[] pat, int m) {
        int[] next = new int[m];
        for (int i = 1; i < m; i++) {
            int k = next[i - 1];
            while (k > 0 && pat[k] != pat[i]) { // xyz?...xyz?
                k = next[k - 1];
            }
            next[i] = pat[k] == pat[i] ? k + 1 : k;
        }
        return next;
    }

    int kmpSearch(char[] txt, char[] pat) {
        int n = txt.length, m = pat.length;
        int[] next = computeNext(pat, m);
        int i = 0, j = 0;
        while (i < n && j < m) {
            if (txt[i] == pat[j]) { // match next pair
                i++;
                j++;
            } else if (j == 0) { // mismatch at the first
                i++;
            } else { // move j to the next character after the longest common prefix-suffix
                j = next[j - 1];
            }
        }
        return j == m ? i - j : -1;
    }
}
```

## 参考

- [KMP Algorithm for Pattern Searching - GeeksforGeeks](https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/)
- [Knuth–Morris–Pratt algorithm - Wikipedia](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm)
- [（原创）详解 KMP 算法 - 孤~影 - 博客园](https://www.cnblogs.com/yjiyjige/p/3263858.html)
