# 冒泡排序

每次遍历剩余元素，依次比较相邻的两个元素，如果是逆序则交换。第 $i$ 次结束后，第 $i$ 大值被交换到了对应的位置上，直至所有元素排序完成。

=== "Java"
    ```java
    void bubbleSort(int[] arr) {
        for (int j = arr.length; j > 0; j--) {
            for (int i = 1; i < j; i++) {
                if (arr[i - 1] > arr[i]) {
                    int tmp = arr[i - 1];
                    arr[i - 1] = arr[i];
                    arr[i] = tmp;
                }
            }
        }
    }
    ```

=== "Python"
    ```python
    def buble_sort(arr):
        for j in range(len(arr), 0, -1):
            for i in range(1, j):
                if arr[i - 1] > arr[i]:
                    tmp = arr[i - 1]
                    arr[i - 1] = arr[i]
                    arr[i] = tmp
    ```

算法的时间复杂度为 $O(n^2)$.

## 参考

- [Bubble Sort - GeeksforGeeks](https://www.geeksforgeeks.org/bubble-sort/)
