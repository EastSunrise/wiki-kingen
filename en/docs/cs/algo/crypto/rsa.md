## Overview

Generally, data transforming from senders to receivers need to be encrypted. A common way is as follows:

-   Senders encrypt plain text with a key **K**.
-   Receivers decrypt the cipher text with the same key **K**.

It's called **Symmetric Cryptography Algorithm**. The question is, however, how to store and pass the key in safety.

Then comes another algorithm called **Asymmetric Cryptography Algorithm**, without key transformation.

-   Receivers generate two keys: one is public and another is private.
-   Senders get the public one to encrypt the information.
-   Receivers use the private key to decrypt the data.

**RSA Algorithm** is one of asymmetric cryptography algorithms. Below is the basic principle of RSA.

## Preparation

### Coprime

First to know is a concept called **coprime**. It's easy to draw conclusions as follows:

-   Any two prime numbers are coprime.
-   If the smaller one is prime, the two numbers are coprime as long as the greater ones isn't a multiple of the smaller one.
-   If the greater one is prime, the two numbers are coprime.
-   Any number and 1 are coprime.
-   Any number $p$ and $p-1$ are coprime.
-   If $p$ is odd, $p$ and $p-2$ are coprime.

#### Euler's totient function

Then comes a question: given any positive integer $n$, how many integers $k$ in the range $1\le{k}\lt{n}$ are relatively prime to $n$?

The counting is called **Euler's totient function**, expressed as $\varphi(n)$. Steps below are to calculate it.

-   If $n=1$, $\varphi(n)=1$.
-   If $n$ is prime, $\varphi(n)=n-1$.
-   If $n=p^k$ and $p$ is prime, then

    $$
    \begin{equation}
        \varphi(n)=\varphi(p^k)=p^k-p^{k-1}=p^k(1-\frac{1}{p})
    \end{equation}
    $$

-   $\varphi(n)$ is a multiplicative function. That's to say If $n=p_1·p_2$ and $p_1$ is coprime to $p_2$, then

    $$
    \begin{equation}
        \varphi(n)=\varphi(p_1·p_2)=\varphi(p_1)·\varphi(p_2)
    \end{equation}
    $$

-   The [fundamental theorem of arithmetic](https://en.wikipedia.org/wiki/Fundamental_theorem_of_arithmetic) states that if $n>1$ there is a unique expression, $n=p_1^{k_1}·p_2^{k_2}···p_r^{k_r}$, combined with the two formulas above, then

    $$
    \begin{equation}
        \varphi(n)=n(1-\frac{1}{p_1})(1-\frac{1}{p_2})(1-\frac{1}{p_r})
    \end{equation}
    $$

### Carmichael function

Given a positive integer $n$, Carmichael function $\lambda(n)$ is defined as the smallest positive integer $m$ such that

$$
\begin{equation}
    a^m\equiv1\pmod{n}, \quad1\le{a}\le{n}\text{ and }a\text{ is coprime to }n
\end{equation}
$$

Besides, $n$ can by written in a unique way as

$$
\begin{equation}
    n=p_1^{k_1}·p_2^{k_2}···p_r^{k_r},\quad p_1, p_2, \ldots, p_r\text{ are primes}
\end{equation}
$$

Then $\lambda (n)$ is the least common multiple of the Carmichael function of each of its prime power factors, proved by [Chinese Remainder Theorem](https://en.wikipedia.org/wiki/Chinese_remainder_theorem):

$$
\begin{equation}
    \lambda (n)=\operatorname {lcm} (\lambda (p_1^{k_1}), \lambda (p_2^{k_2}), \ldots, \lambda (p_r^{k_r}))
\end{equation}
$$

By [Carmichael's theorem](https://en.wikipedia.org/wiki/Carmichael%27s_theorem),

$$
\begin{equation}
    \lambda (p^k) =
        \begin{cases}
            \varphi (p^k) &\text {if } p^k \text{ is 2, 4 or a power of an odd prime} \\
            \frac{1}{2} \varphi (p^k) &\text{if } p^k \text{ is powers of 2 greater than 4}
        \end{cases}
\end{equation}
$$

and as given above,

$$
\begin{equation}
    \varphi (p^k) = p^k(1-\frac{1}{p})
\end{equation}
$$

## RSA

### Key Generation

Assume Zoe wants to communicate with EZ, then how do Zoe generate the public and private keys?

1. Choose two distinct prime numbers $p$ and $q$.

    - For security purposes, the integers $p$ and $q$ should be chosen at random, and should be similar in magnitude but differ in length by a few digits to make factoring harder. Prime integers can be efficiently found using a primality test.
    - $p$ and $q$ are kept secret.
    - Assume that Zoe chooses 61 and 53.

2. Compute $n = pq$.

    - $n$ is used as the modulus for both the public and private keys. Its length, usually expressed in bits, is the key length.
    - $n$ is released as part of the public key.
    - Zoe computes that $n=61 \times 53=3233$.

3. Compute $\lambda(n)$.

    $$
    \begin{equation}
        \lambda (n) = \operatorname {lcm} (\lambda (p), \lambda (q)) = \operatorname {lcm} (p-1, q-1)
    \end{equation}
    $$

    Zoe computes that $\lambda (n)=\operatorname{lcm}(60, 52)=780$.

4. Choose an integer $e$ such that $1<e<\lambda (n)$ and $e$ is coprime to $\lambda (n)$.

    - Shorter bit-length and smaller Hamming weight $e$ has, more efficient encryption is.
    - The most commonly chosen value is $2^{16}+1=65537$.
    - $e$ is released as part of the public key.
    - Let $e = 17$.

5. Determine $d$, the modular multiplicative inverse of $e$ modulo $\lambda (n)$.

    - That means $e·d \equiv1\pmod{\lambda (n)}$. It's computed efficiently by [Extended Euclidean algorithm](https://en.wikipedia.org/wiki/Extended_Euclidean_algorithm).
    - $d$ is kept secret as the private key exponent.
    - By solving the equation $e·d+k\lambda(n)=1$, Zoe gets $d=413$.

Now, we get a **public key** $(n, e)$ and a **private key** $(n, d)$. For Zoe, they are $(3233, 17)$ and $(3233, 413)$.

### Encryption and Decryption

For a plaintext message $m$, the encryption function is

$$
\begin{equation}
    c(m) = m^e \pmod{n}
\end{equation}
$$

For an encrypted criphertext $c$, the decryption function is

$$
\begin{equation}
    m(c) = c^d \pmod{n}
\end{equation}
$$

Assume that Zoe wants to encrypt $m = 65$, then

$$
\begin{equation}
    c=65^{17}\pmod{3233}=2790
\end{equation}
$$

EZ gets _c_ and decrypts it to calculate

$$
\begin{equation}
    m=2790^{413}\pmod{3233}=65
\end{equation}
$$

These calculations can be computed efficiently by [Exponentiation by squaring](https://en.wikipedia.org/wiki/Exponentiation_by_squaring).

## References

-   [RSA - Wikipedia](https://en.wikipedia.org/wiki/RSA)
-   [Carmichael function - Wikipedia](https://en.wikipedia.org/wiki/Carmichael_function)
-   [Euler's totient function - Wikipedia](https://en.wikipedia.org/wiki/Euler%27s_totient_function)
-   [Fundamental theorem of arithmetic - Wikipedia](https://en.wikipedia.org/wiki/Fundamental_theorem_of_arithmetic)
-   [Hamming weight - Wikipedia](https://en.wikipedia.org/wiki/Hamming_weight)
