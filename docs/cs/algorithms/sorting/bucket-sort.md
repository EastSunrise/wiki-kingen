#### Overview

Bucket sort is mainly useful when input is uniformly distributed over a range.

For array $A[0,n-1]$ to be sorted, if there exist a finite number of buckets $B[0,m-1]$ and $B=f(A)$ which means meeting definition of a function, bucket sort is applicable.

#### Algorithm

- Analyze distributions of the source array $A$ to decide the mapping relationship $f$ and values of buckets $B$.
- Iterate through $A$ to move elements into corresponding buckets.
- Sort individual buckets, maybe with different sorting algorithms which decide the complexity of this algorithm.
- Concatenate all sorted buckets.

#### Implementation

Assume that $0\le A_i<12$ and all elements are integers. So we create 4 buckets, each with size of 3.

```python
def bucket_sort(arr): 
    # depend on features of the arr
    bucket_num = 4
    bucket_size = 3

    buckets = [] 
    for i in range(bucket_num): 
        buckets.append([]) 
          
    # put array elements in different buckets  
    for x in arr: 
        bucket_index = int(x / bucket_size)  
        buckets[bucket_index].append(j) 
      
    # sort individual buckets  
    for i in range(bucket_num): 
        buckets[i] = sort(buckets[i]) # sorting algorithm to apply
          
    # concatenate the result 
    k = 0
    for i in range(bucket_num): 
        for j in range(len(buckets[i])): 
            arr[k] = buckets[i][j] 
            arr += 1
    return arr 
```

#### Time Complexity

It depends on sorting algorithm chosen to sort individual buckets.
