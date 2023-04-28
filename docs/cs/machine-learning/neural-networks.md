## 参数和变量

- $x_i$：输入层（input layer）第$i$个神经单元的输入值，与输出值相同；
- $w^l_{ji}$：从第$l-1$层第$i$个神经单元指向第$l$层的第$j$个神经单元的权重（weight）；
- $b^l_j$：第$l$层第$j$个神经单元的偏置（bias）；
- $z^l_j$：第$l$层第$j$个神经单元的加权输入；
- $a^l_j$：第$l$层第$j$个神经单元的输出值，当$l=1$时，有$a^1_j=x_j$；
- $y_j$：输出层（output layer）第$j$个神经单元的输出值（最终的预测值），有$y_j=a^L_j$；
- $t_j$：输出层第$j$个神经单元对应的正解；
- $x_i[k],z^l_j[k],a^l_j[k]$：第$k$个训练实例的变量值。

每层（除输入层外）神经单元的加权输入，与上一层的神经单元的输出以及之间的权重和偏置有关，设第$l-1$层有$m$个神经单元，则其正向传播（forward propagation）如下，

$$
\begin{equation}
    z^l_j=\sum_{i=1}^{m} w^l_{ji}a^{l-1}_i+b^l_j
\end{equation}
$$

设第$l$层的神经单元的个数为$n$，则两层之间的矩阵表示如下，

$$
\begin{equation}
    \begin{bmatrix}
        z^l_1 \\ \mathellipsis \\ z^l_n
    \end{bmatrix}
    =
    \begin{bmatrix}
        w^l_{11} & w^l_{12} & \mathellipsis & w^l_{1m} \\
        &&\mathellipsis \\
        w^l_{n1} & w^l_{n2} & \mathellipsis & w^l_{nm} \\
    \end{bmatrix}
    \begin{bmatrix}
        a^{l-1}_1 \\ a^{l-1}_2 \\ \mathellipsis \\ a^{l-1}_m
    \end{bmatrix}
    +
    \begin{bmatrix}
        b^l_1 \\ \mathellipsis \\ b^l_n
    \end{bmatrix}
\end{equation}
$$

> 可以把偏置设为 $w_0$，其对应输入为 $x_0=1$.

## 激活函数

每一个神经单元输出值和输入值之间的关系称为激活函数（activation function），设$f$为激活函数，则有，

$$
\begin{equation}
    \quad a^l_j=f(z^l_j)
\end{equation}
$$

以下是几种常用的激活函数。

### Sigmoid 函数

$$
\begin{equation}
    \sigma(z)=\frac{1}{1+e^{-z}}
\end{equation}
$$

### ReLU 函数

$$
\begin{equation}
    f(z)=\begin{cases}
        z\quad (z>0) \\
        0 \quad (z\le0)
    \end{cases}
\end{equation}
$$

### softmax 函数

神经网络在处理分类问题时，常使用 softmax 函数作为输出层的激活函数。设输出层有$n$个神经单元，则 softmax 函数如下，

$$
\begin{equation}
    y_j=\frac{\exp(z^L_j)}{\sum_{i=1}^{n}\exp(z^L_j)}
\end{equation}
$$

由上式易知，softmax 函数的输出总和为$1$，因此可以将其输出解释为每种输出类别的概率。

在实际计算时，为了防止溢出，通常在指数运算前，加上一个常数$C$（一般取输入值的最大值的负值），即等价于，

$$
\begin{equation}
    y_j=\frac{\exp(z^L_j+C)}{\sum_{i=1}^{n}\exp(z^L_j+C)}
\end{equation}
$$

## 损失函数

损失函数（cost function）表示神经网络对给定输入的预测值和正解之间的误差程度。

### 均方误差

损失函数的一个例子是均方误差（mean squared error），设输出层有$N$个神经单元，训练实例总数为$K$，则均方误差的计算方式如下，

$$
\begin{equation}
    E=\frac{1}{2}\sum_{k=1}^K\sum_{i=1}^N(t_i-y_i)^2
\end{equation}
$$

### 交叉熵误差

损失函数的另一个常用的例子是交叉熵误差（cross entropy error），其计算方式如下，

$$
\begin{equation}
    E=-\frac{1}{n}\sum_{k=1}^K\sum_{i=1}^N t_i\log y_i
\end{equation}
$$

## 梯度

由多元函数的全部自变量的偏导数汇总而成的向量称为梯度（gradient），设有函数$f(x_1,x_2,\mathellipsis,x_n)$，则其梯度表示如下，

$$
\begin{equation}
    \nabla f=(\frac{\partial f}{\partial x_1},\frac{\partial f}{\partial x_2},\mathellipsis,\frac{\partial f}{x_n})
\end{equation}
$$

### 数值微分

利用微小的差分求偏导数的过程称为数值微分（numerical calculus），计算方式如下，

$$
\begin{equation}
    \frac{\partial f}{\partial x}\approx\frac{f(x+\epsilon)-f(x-\epsilon)}{2\epsilon}
\end{equation}
$$

其中 $\epsilon$ 是个小数，例如 $10^{-4}$.

### 误差反向传播法

误差反向传播法（back propagation）的特点是将繁杂的导数计算替换为数列的递推关系式，从而简化梯度求解。设第$l$层第$j$个神经单元误差为$\delta^{l}_{j}$，定义如下，

$$
\begin{equation}
    \delta^l_j=\frac{\partial E}{\partial z^l_j}\quad (l=2,3,\mathellipsis)
\end{equation}
$$

根据式$(1)$和链式法则，易知误差对权重和偏置的偏导数如下，

$$
\begin{equation}
    \frac{\partial E}{\partial w^l_{ji}}=\delta^l_j a^{l-1}_i \qquad
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

设第$l-1$层有$m$个神经单元，则上述递推关系的矩阵表示如下（其中$\odot$表示 Hadamard 乘积），

$$
\begin{equation}
    \begin{bmatrix}
        \delta^{l-1}_1 \\ \delta^{l-1}_2 \\ \mathellipsis \\ \delta^{l-1}_m
    \end{bmatrix}
    =
    \begin{bmatrix}
        w^l_{11} & \mathellipsis & w^l_{n1} \\
        w^l_{12} & \mathellipsis & w^l_{n2} \\
        & \mathellipsis \\
        w^l_{1m} & \mathellipsis & w^l_{nm} \\
    \end{bmatrix}
    \begin{bmatrix}
        \delta^l_1 \\ \mathellipsis \\ \delta^l_n
    \end{bmatrix}
    \odot
    \begin{bmatrix}
        f'(z^{l-1}_1) \\ f'(z^{l-1}_2) \\ \mathellipsis \\ f'(z^{l-1}_m)
    \end{bmatrix}
\end{equation}
$$

从输出层开始，根据以上递推关系（反向传播）即可依次求得隐藏层的神经单元误差，再代入式$(14)$，从而求得损失函数在当前参数处的梯度。

## 参数优化

神经网络学习的目的是找到使损失函数的值尽可能小的参数。这是寻找最优参数的问题，解决这个问题的过程称为最优化（optimization），以下是几种常见的最优化方法（参数集合记作$W$，梯度记作$g$）。

### 随机梯度下降法

当参数沿着梯度反方向（反向共线）移动时，误差减小得最快，表示如下，

$$
\begin{equation}
    W\larr W-\eta \cdot g
\end{equation}
$$

其中，$\eta$是一个微小的正数，称作学习率。$\eta$是一个超参数（hyper parameter）。

以上参数优化方法称为随机梯度下降法（stochastic gradient descent），简称 SGD。但是在 SGD 中，梯度向量的方向并没有指向最小值的方向，如果函数是各向异性的，则其搜索路径是比较低效的。

### 动量法（Momentum）

$$
\begin{gather}
    v\larr \alpha v-\eta \cdot g \\
    W\larr W+v
\end{gather}
$$

其中，$v$对应物理上的速度，随着参数沿着梯度反方向移动，$v$会逐渐增加。

### AdaGrad

学习率衰减，指的是随着学习的进行，使学习率逐渐减小的方法，这里的学习率减小是针对所有的参数。AdaGrad 进一步发展了这个方法，不同的参数使用不同的学习率，并随着学习而减小。

$$
\begin{gather}
    h\larr h + g\odot g \\
    W\larr W-\frac{\eta}{\epsilon + \sqrt h} \cdot g
\end{gather}
$$

其中，$h$保存了之前所有梯度值的平方和，然后通过系数$\frac{1}{\epsilon + \sqrt{h}}$调整每个参数学习的尺度，如果参数变化较大，其学习率也会衰减地较快。$\epsilon$常取$10^{-7}$，防止分母为零。

### RMSProp

在 AdaGrad 算法中，随着学习的进行，$h$会越来越大，导致学习率太低，即$\frac{1}{\sqrt{h}}\rarr0$。一个解决方案是使用 RMSProp 方法，加权计算梯度值的平方和，以更多地反映新的梯度变化，即“指数移动平均”。

$$
\begin{gather}
    h\larr \rho h+(1-\rho)g\odot g \\
    W\larr W - \frac{\eta}{\sqrt {\epsilon + h}} \cdot g
\end{gather}
$$

其中，$\rho$是指数衰减率，通常取$0.9$.

### Adam

Adam 算法结合了 AdaGrad 和 RMSProp 两个算法的优点，同时考虑了梯度的一阶矩估计（梯度的均值）和二阶矩估计（梯度的方差），

$$
\begin{gather}
    m_t\larr \beta_1 m_{t-1} + (1-\beta_1) g_t \\
    v_t\larr \beta_2 v_{t-1} + (1-\beta_2) g \odot g \\
    \hat{m}_t \larr \frac{m_t}{1-\beta_1^t} \\
    \hat{v}_t \larr \frac{v_t}{1-\beta_2^t} \\
    W_t \larr W_{t-1} - \frac{\alpha \cdot \hat{m}_t}{\sqrt{\hat{v}_t}+\epsilon}
\end{gather}
$$

其中，$\beta_1$是一阶矩的指数衰减率，默认为$0.9$，$\beta_2$是二阶矩的指数衰减率，默认为$0.999$。训练初期时，$m_t$和$v_t$偏向零，因此计算$\hat{m}_t$和$\hat{v}_t$进行修正。最后根据学习率$\alpha$（默认为$0.001$）更新参数。

后三行公式可以修改如下，提高算法效率。

$$
\begin{gather}
    \alpha_t = \alpha \cdot \frac{\sqrt{1-\beta_2^t}}{1-\beta_1^t} \\
    W_t \larr W_{t-1} -\frac{\alpha_t \cdot m_t}{\sqrt{v_t}+\epsilon}
\end{gather}
$$

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
6. 重复执行第 3~5 步，直至判定误差$E$的值充分小为止。

## 权重初始值

### Xavier 初始值

如果前一层的节点数为$n$，则当前层的权重初始值使用标准差为$\frac{1}{\sqrt{n}}$的[正态分布](../math/normal-distribution.md)，此时，各层的输出值$a^l_j$具有相同广度的分布。

### ReLU 初始值

当选择 ReLU 作为激活函数时，因为其负值区域的值为零，为了使其更有广度，需要 2 倍的系数，即如果前一层的节点数为$n$，则当前层的权重初始值使用标准差为$\sqrt{\frac{2}{n}}$的正态分布。

## BatchNorm

在神经网络中，数据分布对学习的影响很大。假设某个神经单元的输入$z_j=20$，并选择像 Sigmoid 函数这样的非线性的激活函数，则其输出值$a_j\approx 1$，处于激活函数的饱和阶段，即无论$z_j$再怎么扩大，其输出值变化也很小（只能趋近$1$），或者说神经网络对这个范围的加权输入不敏感了。

为了解决这个问题，Batch Normalization 的思路是对各层的加权输入进行正规化处理，从而使输出值拥有适当的广度。

$$
\begin{gather}
    \mu_B \larr \frac{1}{m}\sum_{i=1}^{m}x_i \\
    \sigma_B^2 \larr \frac{1}{m}\sum_{i=1}^{m}(x_i-\mu_B)^2 \\
    \hat{x}_i \larr \frac{x_i-\mu_B}{\sqrt{\sigma_B^2+\epsilon}} \\
    y_i \larr \gamma\hat{x}_i+\beta \equiv BN_{\gamma,\beta}(x_i)
\end{gather}
$$

首先对 mini-batch 的输入的集合$B=\{z_1,z_2,...,z_n\}$求均值$\mu_B$和方差$\sigma_B^2$，然后对输入进行均值为$0$、方差为$1$的正规化，最后对正规化后的数据进行缩放和平移变换。初始时，$\gamma=1,\beta=0$，然后通过学习调整到合适的值。

## 过拟合 Overfit

主要原因有：

- 模型拥有大量参数，表现力强；
- 训练数据少。

### 权值衰减

### Dropout

在每一个批次的学习过程中，让某个神经元以一定概率停止工作，这样不会太依赖某些局部特征，可以使神经网络泛化性更强，也明显地减少过拟合现象。

假设某个神经元的输出为 $a$，其输出期望也为 $a$，在加上 Dropout 后，这个神经元有 $p$ 的概率失活，则其输出期望变为了 $(1-p)*a+p*0=(1-p)a$，为了保证这个神经元在训练阶段（有 Dropout）和测试阶段（无 Dropout）的输出期望一致，有以下两种方式：

- 训练时，将该神经元的输出缩放 $\frac{1}{1-p}$ 倍，即 $\frac{1}{1-p}((1-p)*a+p*0)=a$；
- 测试时，将该神经元的输出缩放 $(1-p)$ 倍，其输出期望变为 $(1-p)a$.

> Dropout 其实等效于集成学习，即让多个模型单独进行学习，推理时再取各个模型输出的平均值。

## 超参数

- 设定超参数的范围（对数尺度），例如 0.01~100；
- 从该范围中随机采样，并进行学习，通过验证数据评估识别精度（epoch 需要设置得很小）；
- 多次重复上一步骤，根据识别的精度，缩小超参数的范围；
- 缩小到一定程度后，从中选择一个超参数的值。

## 参考

- 涌井良幸, 涌井贞美. 深度学习的数学.
- 斋藤康毅. 深度学习入门：基于 Python 的理论与实现.
- [吴恩达机器学习系列课程](https://www.bilibili.com/video/BV164411b7dx/)
- [Adam: A Method for Stochastic Optimization](https://arxiv.org/abs/1412.6980).
- [Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift](https://arxiv.org/abs/1502.03167).
