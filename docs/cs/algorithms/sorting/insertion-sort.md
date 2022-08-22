### 算法

```title="INSERTION-SORT(A)"
for j = 1 to A.length
    key = A[j]
    i = j - 1
    while i > 0 and A[i] > key
        A[i+1] = A[i]
        i--
    A[i + 1] = key
```

其时间复杂度为 $O(n^2)$.