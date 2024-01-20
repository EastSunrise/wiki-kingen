## Algorithm

A typical Divide and Conquer algorithm solves a problem using following three steps:

1. **Divide**: Break the given problem into sub-problems of same type.
2. **Conquer**: Recursively solve these sub-problems.
3. **Combine**: Appropriately combine the answers.

## Example

Given an integer array $A[1, n]$, write a function `calculate(int[] A)` to calculate its sub sequence with max summary, $MS$ for short.

### Divide

Assume $m=\frac{n}{2}$, then divide $A$ into two parts, $A[1, m]$ and $A[m+1,n]$. Compute the $MS$ of $A[1,m]$ and $A[m+1,n]$ separately, as well as $X$, $MS$ of sub sequence crossing over $A[1,m]$ and $A[m+1,n]$.

Easy to get that

$$
X = \max\left\{\sum_{i=1}^{m}A_i, \sum_{i=2}^{m}A_i, ..., \sum_{i=m}^{m}A_i\right\} + \max\left\{\sum_{i=m+1}^{m+1}A_i, \sum_{i=m+1}^{m+2}A_i, ..., \sum_{i=m+1}^{n}A_i\right\}
$$

### Combine

$$
MS(A) = \max\{MS(A[1,m]), MS(A[m+1,n]), X \}
$$

### Time Complexity

Time complexity of $X$ is $O(n)$. So, $T(n) = 2T(\frac{n}{2}) + O(n)$. Then the total time complexity is $O(n\log{n})$.

### Notes

The best algorithm for the problem has $O(n)$ time complexity. Assume $MS(k)$ is $MS$ of the front k elements of $A$ and $MSE(k)$ is $MS$ of the front $k$ elements ending with $A[k]$. Then calculate $MS(k+1)$ as follows.

$$
MS(k+1) =
    \begin{cases}
        A[k+1] + \max\{0, MSE(k)\} &\text{if }A[k+1] \text{ in } MS[k+1] \\
        MS(k) &\text{if not}
    \end{cases}
$$

Then, $MS(k+1)$ is the larger one. In this way, $T(n) = T(n-1) + C = O(n)$.

## References

-   [Divide and Conquer - GeeksforGeeks](https://www.geeksforgeeks.org/divide-and-conquer/)
