#### Question

Given an array $A[0,n-1]$, count how many inversion pairs there are. $A_i$ and $A_j$ are inversion pairs if $i<j$ and $A_i>A_j$. An example is as follows:

```
Input: [3, 1, 2]
Output: 2
```

#### Simple

Use a nested loop. Its time complexity is $O(n^2)$.

```python
def inversion_pairs(arr):
    if not isinstance(arr, list) or len(arr) <= 1:
        return 0

    result = 0
    for j in range(1, len(arr)):
        for i in range(j):
            if arr[i] > arr[j]:
                result += 1
    return result
```

#### Enhanced Merge Sort

Like [Merge Sort](../algorithms/sorting/merge-sort.md), the algorithm divides the array into two halves, counts and sorts the halves, then merges the two halves. Its time complexity is $O(n\log{}n)$.

```python
def inversion_pairs(arr):
    temp = arr[:]
    return _inversion_pairs(temp)


def _inversion_pairs(arr):
    if len(arr) <= 1:
        return 0

    m = len(arr) // 2
    left = arr[:m]
    right = arr[m:]
    count = _inversion_pairs(left) + _inversion_pairs(right)

    # merge the two sorted halves
    i = j = k = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            arr[k] = left[i]
            i += 1
        else:
            arr[k] = right[j]
            count += (m - i)
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
    return count
```