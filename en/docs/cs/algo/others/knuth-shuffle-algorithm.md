## Question

Design a fair shuffle algorithm.

## Algorithm

```
for i from n to 1:
	j = random(1,i)
	swap(a[i], a[j])
```

What does _fair_ mean? For generated permutation, every element chooses one of $n$ positions with **equal probability**. It's to calculate the probability of element $i$ being on position $j$ by the Knuth-Shuffle algorithm.

First，element $i$ isn't selected when the position loops from $n-1$ to $j+1$, so the probabilities are $\frac{n-1}{n}$，$\frac{n-2}{n-1}$，...，$\frac{j}{j+1}$ separately.

Then $i$ is selected when comes to position $j$, with the probability $\frac{1}{j}$. The product is exact $\frac{1}{n}$.

## Another Solution

Throw these elements into a pocket. Then sampling without replacement. The generated permutation is exactly the required shuffle result. Refer to drawing lots.

```
b[1,...,n] // where to store the result
k=1
for i from n to 1:
	j = random(1,i)
	b[k++]=a[j]
	remove(a[j])
```

This way occupies $O(n)$ space more than Knuth-Shuffle. The latter apply a certain order to save space.
