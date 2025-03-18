# 插入排序

依次遍历所有元素，将其插入到前面已排好的数组中。

=== "Python"
    ```python
    def insertion_sort(arr):
        for i in range(1, len(arr)):
            key = arr[i]
            j = i - 1
            while j >= 0 and arr[j] > key:
                arr[j + 1] = arr[j]
                j -= 1
            arr[j + 1] = key
    ```

算法的时间复杂度为 $O(n^2)$.

## 参考

- [Insertion Sort - GeeksforGeeks](https://www.geeksforgeeks.org/insertion-sort/)
