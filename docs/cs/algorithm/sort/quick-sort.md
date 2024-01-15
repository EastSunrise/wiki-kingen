# 快速排序

快速排序也是一个[分治算法](../divide-and-conquer.md)：

1. 从数组中选择一个基准数（pivot）；
2. 遍历整个数组，将比基准数小的值移到基准数左侧，比基准数大的值则移到右侧；
3. 对基准数两侧的子数组应用再快速排序，直至子数组仅包括一个元素。

=== "Python"
    ```python
    def quick_sort(arr, low, high):
        if low >= high:
            return

        pivot = arr[high]
        # 基准数的位置
        i = low
        for j in range(low, high):
            if arr[j] <= pivot:
                arr[i], arr[j] = arr[j], arr[i]
                i += 1
        arr[i], arr[high] = arr[high], arr[i]
        quick_sort(arr, low, i - 1)
        quick_sort(arr, i + 1, high)
    ```

算法的平均时间复杂度为 $O(n\log{n})$.

## 参考

- 算法导论. 原书第 3 版. 第 7 章.
- [Quick Sort - GeeksforGeeks](https://www.geeksforgeeks.org/quick-sort/)
