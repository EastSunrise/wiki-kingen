### 概述

堆是一种特殊的完全二叉树，用数组表示。设表示堆的数组为 $A[0..n-1]$，其中 $n$ 为该堆的大小，$A[0]$ 为堆的根结点，对于任意一个结点 $i$，容易计算得到它的父结点和左右子结点：

```java title="Heap.java"
int parent(int i) {
	return (i - 1) >> 1;
}

int left(int i) {
	return (i << 1) + 1;
}

int right(int i) {
	return (i + 1) << 1;
}
```

堆可以分为两种形式：

最大堆：除根结点外的任意结点的值总是不大于其父结点，其根结点值最大，即当 $0\lt i\lt n$ 时，有

$$
A[parent(i)] \ge A[i]
$$

最小堆：除根结点外的任意结点的值总是不小于其父结点，其根结点值最小，即当 $0\lt i\lt n$ 时，有

$$
A[parent(i)] \le A[i]
$$

以下以最大堆为例，说明其如何实现。

### 维护堆的性质

`heapify` 用于维护堆的性质。其输入为 `i`，表示以 $A[i]$ 为根的子树，在调用 `heapify` 时，假设其左子树（根结点为 $A[left(i)]$）和右子树（根结点为 $A[right(i)]$）均为最大堆，通过让 $A[i]$ 在堆中逐级下降，使得以 $A[i]$ 为根的子树满足最大堆的性质。

```java
void heapify(int[] array, int size, int i) {
	while (true) {
		int l = left(i), r = right(i), largest = i;
		if (l < size && array[l] > array[largest]) {
			largest = l;
		}
		if (r < size && array[r] > array[largest]) {
			largest = r;
		}
		if (largest == i) {
			break;
		}
		swap(array, largest, i);
		i = largest;
	}
}
```

易知 `heapify` 的时间复杂度为 $O(h)$，$h$ 为以 $A[i]$ 为根结点的子树的高度。

### 建堆

对于输入的数组 $A$，我们可以用自底向上的方式（归纳法）调用 `heapify` 将 $A$ 转为最大堆。因为叶子结点显然成立，可以忽略。

```java
void buildHeap(int[] array) {
	for (int i = array.length / 2 - 1; i >= 0; i--) {
		heapify(array, array.length, i);
	}
}
```

易知包含 $n$ 个元素的堆的高度为 $\lfloor \lg n\rfloor$，而高度为 $h$ 的子堆最多有 $\frac{n}{2^{h+1}}$ 个，因此 `buildHeap` 的运行时间为

$$
\sum_{h=0}^{\lfloor \lg n\rfloor}\lceil \frac{n}{2^{h+1}}\rceil O(h)
=O(n\sum_{h=0}^{\lfloor \lg n\rfloor}\frac{h}{2^h})
$$

由[求和公式](../math/summation.md)易知

$$
\sum_{h=0}^{\infty}\frac{h}{2^h}=2
$$

从而可得 `buildHeap` 的时间复杂度为

$$
O(n\sum_{h=0}^{\lfloor \lg n\rfloor}\frac{h}{2^h})
=O(n\sum_{h=0}^{\infty}\frac{h}{2^h})
=O(n)
$$

即在线性时间内，把一个无序数组构造为一个最大堆。

### 堆排序

1. 初始时，利用 `buildHeap` 将数组 $A$ 构造为一个最大堆，此时，根结点 $A[0]$ 为最大值；
2. 将 $A[0]$ 和最后一个结点交换，则最大值被放到了正确的位置上；
3. 然后将最后一个结点从堆中去掉，剩余结点中，除根结点 $A[0]$ 外依然是最大堆，调用 `heapify` 将剩余结点重新构造为一个最大堆；
4. 重复上述两步，直至堆中只剩两个元素。

```java
void heapSort(int[] array) {
	buildHeap(array);
	for (int i = array.length - 1; i > 0; i--) {
		swap(array, i, 0);
		heapify(array, i, 0);
	}
}
```

其运行时间为

$$
O(n)+(n-1)O(\lg n)=O(n\lg n)
$$

### 参考

- 算法导论. 原书第3版. 第6章.