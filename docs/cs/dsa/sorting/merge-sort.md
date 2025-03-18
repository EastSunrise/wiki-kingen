# 归并排序

归并排序是一个[分治算法](../divide-and-conquer.md)：

1. 将数组分为两个子数组；
2. 递归调用 _归并排序_ 排序两个子数组；
3. 合并两个排好序的子数组（这是算法的核心）。

=== "Python"
    ```python
    def merge_sort(arr):
        if len(arr) <= 1:
            return

        mid_idx = len(arr) // 2
        left = arr[:mid_idx]
        right = arr[mid_idx:]
        merge_sort(left)
        merge_sort(right)

        # 合并两个子数组
        i = j = k = 0
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                arr[k] = left[i]
                i += 1
            else:
                arr[k] = right[j]
                j += 1
            k += 1
        while i < len(left):
            arr[k] = left[i]
            i += 1
            k += 1
        while j < len(right):
            arr[k] = right[j]
            j += 1
            k += 1
    ```

算法的复杂度如下：

$$
\begin{array}{rl}
    T(n)=2·T(\frac{n}{2})+O(n)=O(n\lg n)
\end{array}
$$

## 参考

- [Merge Sort - GeeksforGeeks](https://www.geeksforgeeks.org/merge-sort/)
