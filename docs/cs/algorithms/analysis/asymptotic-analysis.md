#### 复杂度Complexity

##### Space complexity $S(n)$

**Notes**: Make less use of recursion as possible for it occupies much space.

##### Time complexity  $T(n)$

- $T_{worst}(n)$
- $T_{avg}(n)$

**Notes**: When it occurred $O(n^2)$, consider weather $O(n\log{}n)$ is possible.

#### Asymptotic Notation

##### Upper bound

$T(n)=O(f(n))$

There exist constants $C>0$ and $n_0>0$ to make that when $n\ge n_0$, then $T(n)\le C·f(n)$.

##### Lower bound

$T(n)=\Omega(g(n))$

There exist constants $C>0$ and $n_0>0$ to make that when $n\ge n_0$, then $T(n)\ge C·g(n)$.

##### Equivalence

$T(n)=\Theta(g(n))$

Meet the conditions $T(n)=O(f(n))$ and $T(n)=\Omega(g(n))$ together.