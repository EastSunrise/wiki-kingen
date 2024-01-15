# 计数排序

计数排序只适用于元素值都在一定区间内的数组的排序。

=== "Python"
    ```python
    def counting_sort(arr):
        counts = [0] * (max(arr) + 1)
        for x in arr:
            counts[x] += 1
        # 计算前缀和，即该索引值在结果数组中的右边界
        for i in range(1, len(counts)):
            counts[i] += counts[i - 1]
        output = [0] * len(arr)
        for i in range(len(arr) - 1, -1, -1):
            output[counts[arr[i]] - 1] = arr[i]
            counts[arr[i]] -= 1
        return output
    ```

算法的时间和空间复杂度均为 $O(n+m)$，其中 $m$ 为元素所属区间的大小。

## 参考

- 算法导论. 原书第 3 版. 第 8.2 节.
- [Counting Sort - GeeksforGeeks](https://www.geeksforgeeks.org/counting-sort/)
