- [x] TODO

问题

给定文本字符串 $txt[0,n-1]$（以下称为 $T$） 和模式字符串 $pat[0,m-1]$（以下称为 $P$），在 $T$ 中查找 $P$（假定 $n\ge m\ge 1$）。

#### 暴力匹配

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

#### KMP 算法

上述暴力匹配算法中，一旦匹配失败时，$P$ 就会右移一位（即 $i=i+1$），然后从头开始匹配（$j=0$），已经匹配的部分直接被丢弃，而 KMP 算法的关键思想就在于：**利用已经匹配的部分，保持 $i$ 不变，修改 $j$ 使得
$P$ 移动到下一个有效的位置**。

##### 找到下一个位置

讨论一般情形，设 $T=t_0,t_1,...,t_{n-1};\ P=p_0,p_1,...,p_{m-1}$，在如图位置时，匹配失败，即 $t_{i+j}\ne p_j$： $$ \tag{0} \begin{array} \quad
t_0\quad t_1\quad···\quad t_{i-1} &t_i &t_{i+1}\quad&···\quad &t_{i+j-1} &t_{i+j}\quad···\quad t_{n-1}\\ &\| &\| & &\|
&\not{||}\\ &p_0 &p_1 \quad&···&p_{j-1} &p_j \end{array} $$ 此时有 $$ \tag{1} t_i~t_{i+1}~···~t_{i+j-1}=p_0~p_1~···~p_{j-1}
$$ 如果按照暴力匹配，则下一步应匹配 $$ \notag t_{i+1}~t_{i+2}~···~t_{i+m}\stackrel{?}{=}p_0~p_1~···~p_{m-1} $$ 如果在 $P$ 中，有 $$ \tag{2}
p_0~p_1~···~p_{j-2}\ne p_1~p_2~···~p_{j-1} $$ 则根据 $(1)$ 式和 $(2)$ 式可知这一步必然匹配失败： $$ \notag p_0~p_1~···~p_{j-2}\ne p_1~p_2~
···~p_{j-1}=t_{i+1}~t_{i+2}~···~t_{i+j-1} $$ 从而可以忽略这一步。同理如果有 $$ \tag{3} p_0~p_1~···~p_{j-3}\ne p_2~p_3~···~p_{j-1} $$ 结合
$(1)$ 式和 $(3)$ 式仍然有 $$ \notag p_0~p_1~···~p_{j-3}\ne p_2~p_3~···~p_{j-1}=t_{i+2}~t_{i+3}~···~t_{i+j-1} $$ 以此类推，直到存在值
$k$，使得 $$ \begin{align} \tag{4} p_0~p_1~···~p_k&\ne p_{j-k-1}~p_{j-k}~···~p_{j-1}\\ \tag{5} 且\qquad p_0~p_1~···~p_
{k-1}&= p_{j-k}~p_{j-k+1}~···~p_{j-1} \end{align} $$ 结合 $(0)$ 式有 $$ \tag{6} \begin{array} \quad
···\quad&t_i\quad&···\quad&t_{i+j-k} &t_{i+j-k+1}\quad&···\quad &t_{i+j-1}\quad &t_{i+j}\quad&···\\ &\| & &\| &\| & &\|
&|\\ &p_0 &··· &p_{j-k} &p_{j-k+1} &··· &p_{j-1} &??\\ & & &\| &\| & &\| &|\\ \Longrightarrow && \quad &p_0 &p_1&··· &p_
{k-1} &p_k&··· \end{array} $$ 因此当匹配失败（$t_{i+j}\ne p_j$）时，保持 $T$ 不动，将 $P$ 右移 $j-k$，使得 $t_{i+j-k}$ 和 $p_0$ 对齐,，然后从 $t_
{i+j}$ 和 $p_k$ 开始匹配即可。

##### 最长公共前缀后缀

观察 $(2)$ 式、$(3)$ 式、$(4)$ 式和 $(5)$ 式，容易发现，等式左侧均为 $p_0~p_1~···~p_{j-1}$ 的**前缀子串**，等式右侧则是其**后缀子串**，两者是否匹配决定了 $k$
的值。换句话说，$k$ 其实就是 $p_j$ 前的字符串的最长公共前缀后缀的长度，称为 $P$ 的**特征函数**，记作 $next(j)$，定义如下： $$ \notag next(j)=\begin{cases} -1, &j=0\\
max\{k\ |\ 0\le k<j\ 且\ P[0,k-1]=P[j-k,j-1]\}, &j>0 \end{cases} $$ 如何计算出特征函数 $next(j)$，是实现 KMP 算法的关键，下面使用递推计算 $next(j)$
的值。

设已知 $next(j)=k$，即有 $$ \tag{7}p_0~p_1~···~p_{k-1}= p_{j-k}~p_{j-k+1}~···~p_{j-1} $$ （一）如果 $p_k=p_j$，结合 $(7)$ 式，易知 $$
\tag{8}p_0~p_1~···~p_{k}= p_{j-k}~p_{j-k+1}~···~p_{j} $$ 即 $next(j+1)=k+1=next(j)+1$;

（二）如果 $p_k\ne p_j$，则在 $p_0~p_1~···~p_{k-1}$ 中寻找 $h$ 使得 $$ \tag{9}p_0~p_1~···~p_{h-1}= p_{k-h}~p_{k-h+1}~···~p_{k-1} $$ 即
$next(k)=h$；

（1）如果存在这样的 $h$，结合 $(7)$ 式和 $(9)$ 式， $$ \tag{10} p_0~p_1~···~p_{h-1}= p_{k-h}~p_{k-h+1}~···~p_{k-1}=p_{j-h}~p_{j-h+1}~
···~p_{j-1} $$ 再分两种情况：

1. 如果 $p_h=p_j$，则 $next(j+1)=h+1=next(k)+1=next(next(j))+1$；
2. 如果 $p_h\ne p_j$，则在 $p_0~p_1~···~p_{h-1}$ 中继续寻找更小的 $t$，直至 $next(t)=-1$；

（2）如果 $h$ 不存在，此时 $next(k)=-1$.

##### 总结

总的来说，在暴力匹配算法中，一旦匹配失败，模式串会向后移动一位，而在 KMP 算法通过预处理模式串，使得匹配失败时，可以将模式串向后移动多位，不用重复比较之前的部分。

整个过程中，预处理时遍历了一遍模式串，匹配时至多遍历一遍文本串，因此算法的时间复杂度为 $T=O(m+n)$，其中 $n$ 和 $m$ 分别为文本串和模式串的长度。预处理后需要保存模式串的特征函数，因此算法的空间复杂度为 $S=O(m)$.

##### 实现

```java
class PatternSearching {

    // 计算特征函数
    int[] computeNext(char[] pat) {
        int j = 0, k = -1, len = pat.length;
        int[] next = new int[len];
        // 初始化为-1
        next[0] = -1;
        while (j < len - 1) {
            // 已知next[j]=k，比较p[j]和p[k]
            if (k == -1 || pat[j] == pat[k]) {
                // 如果相等，next[j+1]=next[j]+1=k+1
                k++;
                j++;
                next[j] = k;
            } else {
                // 否则，寻找next[k]=h
                k = next[k];
            }
        }
        return next;
    }

    // kmp 算法
    int kmpSearch(char[] txt, char[] pat) {
        // 计算特征函数
        int[] next = computeNext(pat);
        int pLen = pat.length;
        int i = 0, j = 0;
        while (i < txt.length && j < pLen) {
            if (txt[i] == pat[j]) {
                i++;
                j++;
            } else {
                // 匹配失败，移动模式串
                if (next[j] == -1) {
                    i++;
                } else {
                    j = next[j];
                }
            }
        }
        return j == pLen ? i - j : -1;
    }
}
```

#### 参考

1. [KMP Algorithm for Pattern Searching - GeeksforGeeks](https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/)
2. [Knuth–Morris–Pratt algorithm - Wikipedia](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm)
3. [（原创）详解KMP算法 - 孤~影 - 博客园](https://www.cnblogs.com/yjiyjige/p/3263858.html)