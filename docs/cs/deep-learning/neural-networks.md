### 参数和变量

- $x_i$：输入层（第一层）第$i$个神经单元的输入值，与输出值相同；
- $w^l_{ji}$：从第$l-1$层第$i$个神经单元指向第$l$层的第$j$个神经单元的权重；
- $b^l_j$：第$l$层第$j$个神经单元的偏置；
- $z^l_j$：第$l$层第$j$个神经单元的加权输入；
- $a^l_j$：第$l$层第$j$个神经单元的输出值，当$l=1$时，有$a^1_j=x_j$；
- $y_j$：输出层第$j$个神经单元的输出值（最终的预测值），有$y_j=a^L_j$；
- $t_j$：输出层第$j$个神经单元对应的正解；
- $x_i[k],z^l_j[k],a^l_j[k]$：第$k$个训练实例的变量值。

每层（除输入层外）神经单元的加权输入，与上一层的神经单元的输出以及之间的权重和偏置有关，设第$l-1$层有$m$个神经单元，则其关系（正向传播）如下，

$$
\begin{equation}
    z^l_j=\sum_{i=1}^{m} w^l_{ji}a^{l-1}_i+b^l_j
\end{equation}
$$

设第$l$层的神经单元的个数为$n$，则两层之间的矩阵表示如下，

$$
\begin{equation}
    \begin{pmatrix}
        z^l_1 \\ \mathellipsis \\ z^l_n
    \end{pmatrix}
    =
    \begin{pmatrix}
        w^l_{11} & w^l_{12} & \mathellipsis & w^l_{1m} \\
        &&\mathellipsis \\
        w^l_{n1} & w^l_{n2} & \mathellipsis & w^l_{nm} \\
    \end{pmatrix}
    \begin{pmatrix}
        a^{l-1}_1 \\ a^{l-1}_2 \\ \mathellipsis \\ a^{l-1}_m
    \end{pmatrix}
    +
    \begin{pmatrix}
        b^l_1 \\ \mathellipsis \\ b^l_n
    \end{pmatrix}
\end{equation}
$$

### 激活函数

每一个神经单元输出值和输入值之间的关系称为激活函数，设$f$为激活函数，则有，

$$
\begin{equation}
    \quad a^l_j=f(z^l_j)
\end{equation}
$$

以下是几种常用的激活函数。

#### Sigmoid 函数

$$
\begin{equation}
    \sigma(z)=\frac{1}{1+e^{-z}}
\end{equation}
$$

#### ReLU 函数

$$
\begin{equation}
    f(z)=\begin{cases}
        z\quad (z>0) \\
        0 \quad (z\le0)
    \end{cases}
\end{equation}
$$

#### softmax 函数

神经网络在处理分类问题时，常使用softmax函数作为输出层的激活函数。设输出层有$n$个神经单元，则softmax函数如下，

$$
\begin{equation}
    y_j=\frac{\exp(z^L_j)}{\sum_{i=1}^{n}\exp(z^L_j)}
\end{equation}
$$

由上式易知，softmax函数的输出总和为$1$，因此可以将其输出解释为每种输出类别的概率。

在实际计算时，为了防止溢出，通常在指数运算前，减去一个常数$C$（一般取输入值的最大值），即等价于，

$$
\begin{equation}
    y_j=\frac{\exp(z^L_j+C)}{\sum_{i=1}^{n}\exp(z^L_j+C)}
\end{equation}
$$

### 损失函数

损失函数表示神经网络对给定输入的预测值和正解之间的误差程度。

#### 均方误差

损失函数的一个例子是均方误差（mean squared error），设输出层有$N$个神经单元，训练实例总数为$K$，则均方误差的计算方式如下，

$$
\begin{equation}
    E=\frac{1}{2}\sum_{k=1}^K\sum_{i=1}^N(t_i-y_i)^2
\end{equation}
$$

#### 交叉熵误差

损失函数的另一个常用的例子是交叉熵误差（cross entropy error），其计算方式如下，

$$
\begin{equation}
    E=-\frac{1}{n}\sum_{k=1}^K\sum_{i=1}^N t_i\log y_i
\end{equation}
$$

### 梯度

由多元函数的全部自变量的偏导数汇总而成的向量称为梯度（gradient），设有函数$f(x_1,x_2,\mathellipsis,x_n)$，则其梯度表示如下，

$$
\begin{equation}
    \nabla f=(\frac{\partial f}{\partial x_1},\frac{\partial f}{\partial x_2},\mathellipsis,\frac{\partial f}{x_n})
\end{equation}
$$

#### 数值微分

利用微小的差分求偏导数的过程称为数值微分，计算方式如下，

$$
\begin{equation}
    \frac{\partial f}{\partial x}\approx\frac{f(x+\Delta x)-f(x-\Delta x)}{2\Delta x}
\end{equation}
$$

#### 误差反向传播法

误差反向传播法的特点是将繁杂的导数计算替换为数列的递推关系式，从而简化梯度求解。设第$l$层第$j$个神经单元误差为$\delta^{l}_{j}$，定义如下，

$$
\begin{equation}
    \delta^l_j=\frac{\partial E}{\partial z^l_j}\quad (l=2,3,\mathellipsis)
\end{equation}
$$

根据式$(1)$和链式法则，易知误差对权重和偏置的偏导数如下，

$$
\begin{equation}
    \frac{\partial E}{\partial w^l_{ji}}=\delta^l_j a^{l-1}_i \quad
    \frac{\partial E}{\partial b^l_j}=\delta^l_j
\end{equation}
$$

因此，只要求出各个神经单元误差$\delta^l_j$，即可得到梯度下降所需的偏导数（梯度）。

设$f$为激活函数，根据链式法则有，

$$
\begin{equation}
    \delta^L_j=\frac{\partial E}{\partial a^L_j}\frac{\partial a^L_j}{\partial z^L_j}
    =\frac{\partial E}{\partial y_j}f'(z^L_j)
\end{equation}
$$

根据选择的损失函数和激活函数即可求得输出层的神经单元误差。

设第$l$层有$n$个神经单元，根据多元函数的链式法则及式$(1)$有，

$$
\begin{equation}
    \delta^{l-1}_i=\frac{\partial a^{l-1}_i}{\partial z^{l-1}_i}\sum_{j=1}^n \frac{\partial E}{\partial z^l_j}\frac{\partial z^l_j}{\partial a^{l-1}_i} \\
    =f'(z^{l-1}_i)\sum_{j=1}^n \delta^l_j w^l_{ji}
\end{equation}
$$

设第$l-1$层有$m$个神经单元，则上述递推关系的矩阵表示如下（其中$\odot$表示Hadamard乘积），

$$
\begin{equation}
    \begin{pmatrix}
        \delta^{l-1}_1 \\ \delta^{l-1}_2 \\ \mathellipsis \\ \delta^{l-1}_m
    \end{pmatrix}
    =
    \begin{bmatrix}
        \begin{pmatrix}
            w^l_{11} & \mathellipsis & w^l_{n1} \\
            w^l_{12} & \mathellipsis & w^l_{n2} \\
            & \mathellipsis \\
            w^l_{1m} & \mathellipsis & w^l_{nm} \\
        \end{pmatrix}
        \begin{pmatrix}
            \delta^l_1 \\ \mathellipsis \\ \delta^l_n
        \end{pmatrix}
    \end{bmatrix}
    \odot
    \begin{pmatrix}
        f'(z^{l-1}_1) \\ f'(z^{l-1}_2) \\ \mathellipsis \\ f'(z^{l-1}_m)
    \end{pmatrix}
\end{equation}
$$

从输出层开始，根据以上递推关系（反向传播）即可依次求得隐藏层的神经单元误差，再代入式$(14)$，从而求得损失函数在当前参数处的梯度。

### 参数优化

神经网络的学习的目的是找到使损失函数的值尽可能小的参数。这是寻找最优参数的问题，解决这个问题的过程称为最优化（optimization），以下是几种常见的最优化方法（参数集合记作$W$）。

#### 随机梯度下降法

当参数沿着梯度反方向（反向共线）移动时，误差减小得最快，表示如下，

$$
\begin{equation}
    W\larr W-\eta\frac{\partial E}{\partial W}
\end{equation}
$$

其中$\eta$是一个微小的正数，称作学习率。$\eta$是一个超参数。

以上参数优化方法称为随机梯度下降法，（stochastic gradient descent），简称SGD。但是在SGD中，梯度向量的方向并没有指向最小值的方向，如果函数是各向异性的，则其搜索路径是比较低效的。

#### 动量法

$$
\begin{gather}
    v\larr \alpha v-\eta\frac{\partial E}{\partial W} \\
    W\larr W+v
\end{gather}
$$

#### AdaGrad

$$
\begin{gather}
    h\larr h+\frac{\partial E}{\partial W}\odot\frac{\partial E}{\partial W} \\
    W\larr W-\eta\frac{1}{\sqrt h}\frac{\partial E}{\partial W}
\end{gather}
$$

#### Adam

## 算法

1. 准备训练数据；
2. 初始设置权重$w$、偏置$b$和学习率$\eta$：
    - 通常使用随机数作为权重和偏置的初始值；
    - 选择适当小的正数作为学习率；
    - 学习率的设置大多需要反复试错。同样地，对于权重和偏置的初始值，为了取得好的结果，也可能需要多次变更设置；
3. 选择小批量的训练实例，计算出所有神经单元的输出值$a$以及误差$E$：
    - 利用式$(2)$和激活函数，正向计算各层神经单元的加权输入$z$、输出值$a$；
    - 根据选择的损失函数，计算出预测值和正解之间的误差；
4. 利用误差反向传播法，反向计算出所有的神经单元误差$\delta$，代入式$(14)$，从而计算出此时的梯度；
5. 根据选择的参数优化算法，更新权重和偏置；
6. 重复执行第3~5步，直至判定误差$E$的值充分小为止。

### 技巧

#### 权重初始值

