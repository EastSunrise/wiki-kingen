# 相似度算法

给定两个字符串，如何计算两个字符串之间的相似度。

## 编辑距离

### Levenshtein 距离

Levenshtein 距离是最常用的基于编辑的算法，通过计算将一个字符串转换成另一个字符串所需的最少单字符允许操作（插入、删除或替换）的次数度量字符串相似度。

```java
public class LevenshteinDistance {
    public int minDistance(String s, String t) {
        int m = s.length(), n = t.length();
        // dp[i][j]: the distance of s[0,i) and t[0,j)
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) { // s[0,i) to an empty string
            dp[i][0] = i;
        }
        for (int j = 0; j <= n; j++) { // an empty string to t[0,j)
            dp[0][j] = j;
        }
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                // delete a char or add a char
                dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1);
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    dp[i][j] = Math.min(dp[i][j], dp[i - 1][j - 1]);
                } else { // replace a char
                    dp[i][j] = Math.min(dp[i][j], dp[i - 1][j - 1] + 1);
                }
            }
        }
        return dp[m][n];
    }
}
```

### Damerau-Levenshtein 距离

## LCS
