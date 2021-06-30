Post from [有哪些算法惊艳到了你？ - 知乎](https://www.zhihu.com/question/26934313/answer/743798587)

#### Question


Design a fair shuffle algorithm.

#### Algorithm

```java
for(int j = n - 1; j >= 0 ; j\--) {
    swap(arr[j], arr[rand(0, j)]) // rand(0, j) generate a random integer in [0, j].
}
```


What does *fair* mean? For generated permutation, every element chooses one of $n$ positions with equal probability. It's to calculate the probability of element $i$ being on position $j$ by the Knuth-Shuffle algorithm.


First，element $i$ isn't selected when the position loops from $n-1$ to $j+1$, so the probabilities are $\frac{n-1}{n}$，$\frac{n-2}{n-1}$，...，$\frac{j}{j+1}$ separately. Then $i$ is selected when comes to position $j$, with the probability $\frac{1}{j}$. Quadrature is $\frac{1}{n}$.

### Another Solution


Throw these elements into a pocket. Then sampling without replacement. The generated permutation is exactly the required shuffle result. Refer to drawing lots.

```java
int[] toArr=new int[n];
for (int i = n - 1; i >= 0; i\--){
    toArray[n-i-1] = fromList.remove(rand(0, i));
}
```

This way occupies $O(n)$ space more than Knuth-Shuffle. The latter apply a certain order to save space.