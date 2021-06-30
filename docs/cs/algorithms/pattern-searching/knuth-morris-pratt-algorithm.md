#### Question

Given a text $txt[0,n-1]$ and a pattern $pat[0,m-1]$, write a function `search(char[] txt, char[] pat)` that prints all occurrences of *pat[]* within *txt[]*. You may assume that $n > m$.

#### Brute-force

```java
public int search(char[] txt, char[] pat) {
	int i = 0, j = 0;
	while (i < txt.length && j < pat.length) {
		if (txt[i] == pat[j]) {
			i++;
			j++;
		} else {
			i = i - j + 1;
			j = 0;
		}
	}

	if (j == pat.length) {
		return i - j;
	}

	return -1;
}
```

#### KMP

```java
// JAVA program for implementation of KMP pattern searching algorithm`
void KMPSearch(String pat, String txt) {
	int m = pat.length();
	int n = txt.length();

	// create lps[] that will hold the longest prefix suffix values for pattern
	int lps[] = new int[m];
	int j = 0; // index for p[]

	// Preprocess the pattern (calculate lps[] array)
	computeLPSArray(pat, m, lps);

	int i = 0; // index for s[]
	while (i < n) {
		if (pat.charAt(j) == txt.charAt(i)) {
			j++;
			i++;
		}

		if (j == m) {
			System.out.println("Found pattern at index " + (i - j));
			j = lps[j - 1];
		} else if (i < N && pat.charAt(j) != txt.charAt(i)) { // mismatch after j matches
			// Do not match lps[0..lps[j-1]] characters, they will match anyway
			if (j != 0)
				j = lps[j - 1];
			else
				i = i + 1;
		}
	}
}

void computeLPSArray(String pat, int m, int lps[]) {
	// length of the previous longest prefix suffix
	int len = 0;
	int i = 1;
	lps[0] = 0; // lps[0] is always 0

	// the loop calculates lps[i] for i = 1 to m-1
	while (i < m) {
		if (pat.charAt(i) == pat.charAt(len)) {
			len++;
			lps[i] = len;
			i++;
		} else { // (pat[i] != pat[len])
			// This is tricky. Consider the example.
			// AAACAAAA and i = 7. The idea is similar
			// to search step.
			if (len != 0) {
				len = lps[len - 1];

				// Also, note that we do not increment
				// i here
			} else { // if (len == 0)
				lps[i] = len;
				i++;
			}
		}
	}
}

// Driver program to test above function`
public static void main(String args[]) {
	String txt = "ABABDABACDABABCABAB";
	String pat = "ABABCABAB";
	KMPSearch(pat, txt);
}
```

**TODO**

#### References

  1. [KMP Algorithm for Pattern Searching - GeeksforGeeks](https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/)
  2. [Knuth–Morris–Pratt algorithm - Wikipedia](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm)
  3. [（原创）详解KMP算法 - 孤~影 - 博客园](https://www.cnblogs.com/yjiyjige/p/3263858.html)