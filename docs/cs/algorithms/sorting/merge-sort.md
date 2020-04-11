#### Overview

Merge Sort is a [Divide and Conquer](../divide-and-conquer.md) algorithm.

#### Algorithm

1. Divide the array in two halves.
2. Sort each part with Merge Sort recursively.
3. Merge the two halves. It's the core of the algorithm. 

#### Implementation

```python
def merge_sort(arr):
    """
    sort the arr
    """
    if len(arr) <= 1:
        return
    m = len(arr) // 2
    left = arr[:m]
    right = arr[m:]
    merge_sort(left)
    merge_sort(right)

    # merge the two sorted halves
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
