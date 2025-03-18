# 回文串

## 最长回文子串

给定一个字符串 $s$，找到其最长的回文子串。

### 动态规划

```python
def longest_palindromic_substring_dp(s: str) -> str:
    if s is None or len(s) == 0:
        return ''
    n = len(s)
    # dp[k][i] is whether s[i:i+k] is a palindromic substring
    dp = [[True] * n, [True] * n] + [[False] * n for _ in range(n - 1)]

    for k in range(2, n + 1):  # length of substring
        for i in range(n - k + 1):  # start index of substring
            dp[k][i] = dp[k - 2][i + 1] and s[i] == s[i + k - 1]

    for k in range(n, 0, -1):
        for i in range(n - k + 1):
            if dp[k][i]:
                return s[i:i + k]
    return ''
```

时间和空间复杂度均为 $O(n^2)$.

### 中心扩展法

```python
def longest_palindromic_substring_center_expansion(s: str) -> str:
    if s is None or len(s) == 0:
        return ''
    n = len(s)

    start, max_len = 0, 0
    for i in range(len(s)):
        for j in range(2):  # odd or even
            low, high = i, i + j
            while low >= 0 and high < n and s[low] == s[high]:
                low -= 1
                high += 1
            if high - low - 1 > max_len:
                start, max_len = low + 1, high - low - 1
    return s[start:start + max_len]
```

### 马拉车算法

马拉车算法（Manacher's Algorithm）是在上述中心扩展法基础上优化的算法。

先考虑奇数长度的情况，如果回文串的长度为 $2*d+1$，定义其半径为 $d$，以 $s[i]$ 为中心的最大回文子串的半径记为 $d_i$.

从左往右遍历时，记录 $l$ 和 $r$，表示已经遍历的、右边界最大（相同时，取半径较大的一个）的回文子串的左右边界，即回文子串 $s[l, r]$，记其中心字符下标为 $c$.

当处理到 $s[i]$ 时，如果 $i\leq r$，即 $s[i]$ 在 $s[l,r]$ 中，找到 $s[i]$ 关于 $s[c]$ 的对称点 $s[j]$，根据回文串的对称性可得，

$$
d_i\geq \min(d_j, r-i)
$$

那么可以直接从这里开始扩展计算。

对于偶数长度子串的情况，可以先将字符串 $s$ 中间插入字符集外的字符，将偶数长度转化为奇数长度，再使用上述方法求解。

因为不会重复计算，易知时间复杂度为 $O(n)$.

=== "Java"
    ```java
    public String longestPalindrome(String s) {
        int n = s.length(), len = n << 1 | 1;
        char[] arr = new char[len];
        for (int i = 0; i < n; i++) {
            arr[i << 1] = '#';
            arr[i << 1 | 1] = s.charAt(i);
        }
        arr[len - 1] = '#';

        int[] radii = new int[len];
        int left = -1, right = -1; // the bound of the rightmost calculated palindrome
        int mxi = 0;
        for (int i = 1; i < len; i++) {
            if (i <= right) { // use the mirror which has been calculated
                radii[i] = Math.min(radii[left + right - i], right - i);
            }

            int low = i - radii[i] - 1, high = i + radii[i] + 1;
            while (low >= 0 && high < len && arr[low] == arr[high]) { // expand
                low--;
                high++;
            }

            radii[i] = high - i - 1;
            if (high - 1 > right) {
                left = low + 1;
                right = high - 1;
            }

            if (radii[i] > radii[mxi]) {
                mxi = i;
            }
        }

        return s.substring((mxi - radii[mxi]) >> 1, (mxi + radii[mxi]) >> 1);
    }
    ```

=== "Python"
    ```python
    def longest_palindromic_substring_manacher(s: str) -> str:
        if s is None or len(s) == 0:
            return ''
        ext = '#' + '#'.join(list(s)) + '#'
        n = len(ext)

        d = [0] * n
        l, r = -1, -1
        mxi = 0
        for i in range(n):
            if i <= r:  # use the mirror which has been calculated
                d[i] = min(d[l + r - i], r - i)

            low, high = i - d[i] - 1, i + d[i] + 1
            while low >= 0 and high < n and ext[low] == ext[high]:  # expand
                low -= 1
                high += 1

            d[i] = high - i - 1
            if high - 1 > r:
                l, r = low + 1, high - 1

            if d[i] > d[mxi]:
                mxi = i

        return s[(mxi - d[mxi]) >> 1:(mxi + d[mxi]) >> 1]
    ```

## 最长回文子序列

给定一个字符串 $s$，找到其最长的回文子序列。

### 动态规划

```python
def longest_palindromic_subsequence_dp(s: str) -> int:
    if s is None or len(s) == 0:
        return 0
    n = len(s)

    # dp[k][i] is the length of the longest palindromic subsequence of s[i:i+k]
    dp = [[0] * n] + [[1] * n] + [[0] * n for _ in range(n - 1)]
    for k in range(2, n + 1):  # length
        for i in range(n - k + 1):  # start index
            if s[i] == s[i + k - 1]:
                dp[k][i] = dp[k - 2][i + 1] + 2
            else:
                dp[k][i] = max(dp[k - 1][i], dp[k - 1][i + 1])
    return dp[n][0]
```

## 参考

- [Longest Palindromic Substring - GeeksforGeeks](https://www.geeksforgeeks.org/longest-palindromic-substring/)
- [最长回文子串 - 力扣（LeetCode）](https://leetcode.cn/problems/longest-palindromic-substring/)
