# 选择排序

每次遍历剩余的元素，选择其中最小（或最大）的元素，交换到当前位置上，直至没有元素剩余。

=== "Java"
    ```java
    void selectionSort(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            int minIdx = i;
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx != i) {
                int tmp = arr[i];
                arr[i] = arr[minIdx];
                arr[minIdx] = tmp;
            }
        }
    }
    ```

=== "Python"
    ```python
    def selection_sort(arr):
        for i in range(len(arr)):
            min_idx = i
            for j in range(i + 1, len(arr)):
                if arr[j] < arr[min_idx]:
                    min_idx = j
            if min_idx != i:
                arr[i], arr[min_idx] = arr[min_idx], arr[i]
    ```

算法的时间复杂度为 $O(n^2)$.

## 参考

- [Selection Sort - GeeksforGeeks](https://www.geeksforgeeks.org/selection-sort/)
