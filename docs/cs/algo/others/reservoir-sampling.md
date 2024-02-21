# 蓄水池抽样

给定一个数据流 $a_1,\cdots,a_N$，其长度 $N$ 很大或者未知，请问如何在 $O(N)$ 情况下，随机取出 $k$ 个数？要求：

1. _N_ 很大，因此无法一次性存储数据流；
2. 随机选出 $k$ 个数，每个数被选到的概率为 $\frac{k}{N}$.

## 简单算法

一个简单的算法步骤如下：

1. 维护一个容量为 $k$ 的蓄水池 $R_1,\cdots,R_k$，将数据流的前 $k$ 个数放入池中；
2. 遍历剩余数据。对于 $a_i$，在 $[1,i]$ 范围内取随机数 $d$，如果 $1\le d\le k$，则替换 $R_d$。

现在证明，对 $a_i$，其被选中的概率 $P(i)=\frac{k}{N}$.

1. 设 $I(i)$ 为该数据进入池中的概率，$O(i)$ 为该数据未被替换的概率，易知，$P(i)=I(i)*O(i)$；
2. 当 $i\le k$，数据直接放入池中，$I(i)=1$；
3. 当 $i>k$，选取的随机数需在 $[1,k]$ 范围内，$I(i)=\frac{k}{i}$；
4. 当 $i\le k$，此时有 $R_i=a_i$，考虑 $a_j\ (j>k)$，其进入池中概率 $I(j)=\frac{k}{j}$，恰好替换 $R_i/a_i$ 的概率为 $\frac{1}{k}$，$a_i$ 不被 $a_j$
   替换的概率为 $1-\frac{k}{j}*\frac{1}{k}=\frac{j-1}{j}$. 因此 $a_i$ 未被替换的概率 $O(i)=\prod_{k<j\le N} \frac{j-1}{j}=\frac{k}{N}$;
5. 当 $i>k$，$O(i)=\prod_{i<j\le N} \frac{j-1}{j}=\frac{i}{N}$；
6. 综上可知，$P(i)=\frac{k}{N}$.

```text
// R数组储存最后的结果
ReservoirSampling(a[1...N], R[1...k])
    for i from 1 to k:
        R[i]=a[i]

    for i from k+1 to n:
        d = random(1, i)
        if j <= k:
            R[d]=a[i]
```

由上可知，算法的时间复杂度为 $O(N)$，空间复杂度为 $O(k)$.

## 参考

- [Reservoir sampling - Wikipedia](https://en.wikipedia.org/wiki/Reservoir_sampling)
