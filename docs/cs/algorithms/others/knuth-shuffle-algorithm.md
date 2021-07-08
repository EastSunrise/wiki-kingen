#### 问题

给定一个数组 $a_1,...,a_n$，设计一个公平的洗牌算法。

#### 分析

洗牌即随机生成给定数组所有元素的一个排列，这样的排列一共有 $n!$ 个，因此算法的目标是**等概率**地给出其中的一个。对于任意一个元素都能**独立且等概率**地放置在任意一个位置上。

#### Knuth 洗牌算法

从后向前遍历数组，对于当前元素 $a_i$，从 $a[1,...,i]$ 中随机选取 $a_j$，和 $a_i$ 交换。

```
for i from n to 1:
	j = random(1,i)
	swap(a[i], a[j])
```

现在证明，任意元素 $a$ 出现在位置 $p$ 上的概率 $P(a,p)=\frac{1}{n}$.

1. 首先，当 $i$ 从 $n$ 遍历到 $p+1$ 时，$a$ 均未被选中，其概率为 $\prod_{p+1\le i\le n}\frac{i-1}{i}=\frac{p}{n}$;
2. 当 $i=p$ 时，$a$ 被选中并替换到位置 $p$ 上，概率为 $\frac{1}{p}$;
3. 综上可知，$P(a,p)=\frac{p}{n}*\frac{1}{p}=\frac{1}{n}$.

显然地，算法的时间复杂度为 $O(n)$，空间复杂度为 $O(1)$.

#### 另一种表示

每次从数组中随机不放回地抽取一个元素，生成的排列即是洗牌的一个结果。

```
b[1,...,n] // 存放结果
k=1
for i from n to 1:
	j = random(1,i)
	b[k++]=a[j]
	remove(a[j])
```

算法的时间复杂度和空间复杂度均为 $O(n)$.

#### 参考

1. [Fisher–Yates shuffle - Wikipedia](https://en.wikipedia.org/wiki/Fisher–Yates_shuffle)
2. [有哪些算法惊艳到了你？ - 知乎](https://www.zhihu.com/question/26934313/answer/743798587)

