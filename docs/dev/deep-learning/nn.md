### 原理

#### 激活函数

$$
\begin{equation}
    z=\sum_{i}{w_{i}x_{i}}+b, \quad a=f(z)
\end{equation}
$$

其中，$x_i$是输入值，$w_{i}$是权重，$b$是偏置，$z$即是加权输入，$f$是激活函数，$a$是输出。

激活函数的代表性例子是 Sigmoid 函数$\sigma(z)$，其定义如下所示，

$$
\begin{equation}
    \sigma(z)=\frac{1}{1+e^{-z}}
\end{equation}
$$

#### 梯度下降法

设$\eta$为正的微小常数，变量$(x_1,x_2,\mathellipsis,x_n)$改变为$(x_1+\Delta x_1,x_2+\Delta x_2,\mathellipsis,x_n+\Delta x_n)$时，当满足以下关系时，函数$f(x_1,x_2,\mathellipsis,x_n)$减小得最快（即反向共线），

$$
\begin{equation}
    \Delta x
    =(\Delta x_1,\Delta x_2,\mathellipsis,\Delta x_n)
    =-\eta(\frac{\partial f}{\partial x_1},\frac{\partial f}{\partial x_2},\mathellipsis,\frac{\partial f}{x_n})
\end{equation}
$$

以下向量称为函数$f$在点$(x_1,x_2,\mathellipsis,x_n)$处的梯度，

$$
\begin{equation}
    \nabla f=(\frac{\partial f}{\partial x_1},\frac{\partial f}{\partial x_2},\mathellipsis,\frac{\partial f}{x_n})
\end{equation}
$$

#### 参数和变量

- $x_i$：输入层（第一层）第$i$个神经单元的输入；
- $w^l_{ji}$：从第$l-1$层第$i$个神经单元指向第$l$层的第$j$个神经单元的权重；
- $z^l_j$：第$l$层第$j$个神经单元的加权输入；
- $b^l_j$：第$l$层第$j$个神经单元的偏置；
- $a^l_j$：第$l$层第$j$个神经单元的输出，当$l=1$时，有$a^1_j=x_j$；
- $x_i[k],z^l_j[k],a^l_j[k]$：第$k$个学习实例的变量值。

根据式$(1)$有，

$$
\begin{equation}
    z^l_j=\sum_{i}w^l_{ji}a^{l-1}_i+b^l_j
\end{equation}
$$

每层之间的矩阵表示如下，

$$
\begin{equation}
    \begin{pmatrix}
        z^l_1 \\ \mathellipsis \\ z^l_m
    \end{pmatrix}
    =
    \begin{pmatrix}
        w^l_{11} & w^l_{12} & \mathellipsis & w^l_{1n} \\
        &&\mathellipsis \\
        w^l_{m1} & w^l_{m2} & \mathellipsis & w^l_{mn} \\
    \end{pmatrix}
    \begin{pmatrix}
        a^{l-1}_1 \\ a^{l-1}_2 \\ \mathellipsis \\ a^{l-1}_n
    \end{pmatrix}
    +
    \begin{pmatrix}
        b^l_1 \\ \mathellipsis \\ b^l_n
    \end{pmatrix}
\end{equation}
$$

其中，$m$和$n$分别为第$l$和第$l-1$层的神经单元的个数。

#### 代价函数

代价函数的一个例子是平方误差的总和$C_T$，利用$C_T$进行最优化的方法称为最小二乘法。设第$L$层为输出层，$t$为正解，$k$为学习实例序号，则，

$$
\begin{equation}
    C_T=\sum_{k}\sum_j(t_j-a^L_j)^2
\end{equation}
$$

#### 神经单元误差

误差反向传播法的特点是将繁杂的导数计算替换为数列的递推关系
式，而提供这些递推关系式的就是名为神经单元误差的变量$\delta^{l}_{j}$，其定义如下，

$$
\begin{equation}
    \delta^l_j=\frac{\partial C}{\partial z^l_j}\quad (l=2,3,\mathellipsis)
\end{equation}
$$

根据链式法则及式$(5)$，有，

$$
\begin{equation}
    \frac{\partial C}{\partial w^l_{ji}}=\delta^l_j a^{l-1}_i,\quad \frac{\partial C}{\partial b^l_j}=\delta^l_j \quad (l=2,3,\mathellipsis)
\end{equation}
$$

#### 误差反向传播法

误差反向传播法的特点是将繁杂的导数计算替换为数列的递推关系
式。

设第$L$层为输出层，根据式$(8)$及链式法则$，输出层的神经单元误差如下，

$$
\begin{equation}
    \delta^L_j=\frac{\partial C}{\partial a^L_j}a'(z^L_j)
\end{equation}
$$

结合式$(9)$，隐藏层的神经单元误差如下，

$$
\begin{equation}
    \delta^l_i=a'(z^l_i)\sum_j\delta^{l+1}_{j} w^{l+1}_{ji}    
\end{equation}
$$

其矩阵表示为，

$$
\begin{equation}
    \begin{pmatrix}
        \delta^l_1 \\ \delta^l_2 \\ \mathellipsis \\ \delta^l_m
    \end{pmatrix}
    =
    \begin{bmatrix}
        \begin{pmatrix}
            w^{l+1}_{11} & \mathellipsis & w^{l+1}_{n1} \\
            w^{l+1}_{12} & \mathellipsis & w^{l+1}_{n2} \\
            & \mathellipsis \\
            w^{l+1}_{1m} & \mathellipsis & w^{l+1}_{nm} \\
        \end{pmatrix}
        \begin{pmatrix}
            \delta^{l+1}_1 \\ \mathellipsis \\ \delta^{l+1}_n
        \end{pmatrix}
    \end{bmatrix}
    \odot
    \begin{pmatrix}
        a'(z^l_1) \\ a'(z^l_2) \\ \mathellipsis \\ a'(z^l_m)
    \end{pmatrix}
\end{equation}
$$

其中，$m$和$n$分别为第$l$和第$l+1$层的神经单元的个数，$\odot$表示Hadamard乘积。

因此，只要求出输出层的神经单元误差，其他的神经单元误差即可递推得出。

#### 算法

1. 准备学习数据；
2. 初始设置权重、偏置和学习率$\eta$：
   - 通常使用随机数作为权重和偏置的初始值；
   - 选择适当小的正数作为学习率；
   - 学习率$\eta$的设置大多需要反复试错。同样地，对于权重和偏置的初始值，为了取得好的结果，也可能需要多次变更设置；
3. 对于一个学习实例，计算出神经单元的输出值$a$以及平方误差$C$：
   - 利用式$(6)$和激活函数，正向计算各层神经单元的加权输入$z$、输出$a$；
   - 利用式$(7)$，计算出平方误差$C$；
4. 根据式$(10)$和式$(12)$，反向计算出各层的神经单元误差$\delta$；
5. 根据式$(9)$，计算出平方误差$C$关于权重和偏置的偏导数；
6. 对所有学习实例执行第3~5步，并将结果相加，计算出代价函数$C_T$和其梯度$\nabla C_T$；
7. 根据式$(3)$，利用梯度下降法更新权重和偏置；
8. 重复执行第3~7步，直至判定代价函数$C_T$的值充分小为止。
