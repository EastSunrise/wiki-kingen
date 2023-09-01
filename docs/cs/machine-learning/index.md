## 定义

从任务 T 学习经验 E，提高性能度量 P，可以分为

-   监督学习（supervised learning）：给定数据集和正解，预测其他样本正确答案
-   无监督学习（unsupervised learning）：分析给定数据集的结构

给定训练集（training set）$(x,y)$，设共有$n$个特征，则输入值和参数可表示为如下向量

$$
\begin{gather}
    x=\begin{bmatrix}
        x_0 \\
        x_1 \\
        \cdots \\
        x_n
    \end{bmatrix} \in \R^{n+1} \\
    \theta=\begin{bmatrix}
        \theta_0 \\
        \theta_1 \\
        \cdots \\
        \theta_n
    \end{bmatrix} \in \R^{n+1}
\end{gather}
$$

其中 $x_0=1$，代表偏移的输入值。

## 回归问题

回归问题（regression problem）拥有连续的输出值，包括

-   线性回归（linear regression）
-   多项式回归（polynomial regression）

### 假设函数

多元线性回归的假设函数（hypothesis）可以如下表示，

$$
\begin{equation}
    y=h_{\theta}(x)=\theta^{T}x
\end{equation}
$$

### 代价函数

线性回归常使用平方误差作为代价函数（cost function），

$$
\begin{equation}
    J(\theta)=\frac{1}{2m}\sum_{i=1}^{m}(h_{\theta}(x^{(i)})-y^{(i)})^2
\end{equation}
$$

> 对于线性回归，平方误差函数是以一个凸函数，方便进行梯度下降计算。

目标是找到使以上代价函数最小的$\theta_0,\theta_1$，即

$$
\begin{equation}
    \underset{\theta}{\min}(J(\theta))
\end{equation}
$$

### 梯度下降

梯度下降法（gradient descent）是一种常用的参数更新方法，

$$
\begin{gather}
    \theta_j := \theta_j - \alpha\frac{\partial J(\theta)}{\partial\theta_j} \\
    \theta_j := \theta_j - \alpha\frac{1}{m}\sum_{i=1}^{m}(h_{\theta}(x^{(i)})-y^{(i)})x^{(i)}_j
\end{gather}
$$

其中$\theta_0,...,\theta_n$需同步更新。

### 正规方程

上述梯度下降法是通过多次迭代（iteratively）计算最优解，还可以通过正规方程（normal equation）计算，即通过解析法（analytically）一次性地得到最优解。这通常只适用于特征较少的线性回归问题。

设有 $m$ 个样本，$n$ 个特征，则输入矩阵和输出向量为

$$
\begin{gather}
    X=\begin{bmatrix}
        x_0^{(1)} & \cdots & x_n^{(1)} \\
        x_0^{(2)} & \cdots & x_n^{(2)} \\
        & \cdots \\
        x_0^{(m)} & \cdots & x_n^{(m)} \\
    \end{bmatrix} \\
    y=\begin{bmatrix}
    y^{(1)} \\
    y^{(2)} \\
    \cdots  \\
    y^{(m)}
    \end{bmatrix}
\end{gather}
$$

从而有最优的参数如下，

$$
\begin{equation}
    \theta=(X^T X)^{-1} X^T y
\end{equation}
$$

其中，逆矩阵的计算复杂度通常是维度的三次方。

## 分类问题

分类问题（classification problem）拥有离散的输出值，例如 $y\in \{0,1\}$，包括

-   逻辑回归（logistic regression）

### 假设函数

逻辑回归常使用 Sigmoid 函数作为假设函数

$$
\begin{gather}
    h_{\theta}(x)=g(\theta^T x) \\
    g(z)=\frac{1}{1+e^{-z}}
\end{gather}
$$

在分类问题中，假设函数的输出值表示在给定参数下的数学期望。

### 代价函数

在逻辑回归中，常用的代价函数如下，

$$
\begin{gather}
    \text{Cost}(h_{\theta}(x),y)=-y\log(h_{\theta}(x))-(1-y)\log(1-h_{\theta}(x)) \\
    J(\theta) =\frac{1}{m}\sum_{i=1}^{m}\text{Cost}(h_{\theta}(x^{(i)}),y^{(i)})
\end{gather}
$$

### 梯度下降

$$
\begin{equation}
    \theta_j := \theta_j - \alpha\frac{1}{m}\sum_{i=1}^{m}(h_{\theta}(x^{(i)})-y^{(i)})x^{(i)}_j
\end{equation}
$$

> 虽然表示和线性回归中一样，但假设函数不同。

### 优化算法

-   共轭梯度法（conjugate gradient）
-   BFGS
-   L-BFGS

### 多类别分类

对于多类别分类（multiclass classification），针对多个分类值 $y\in \R^{K}$，分别进行二元逻辑回归计算概率，然后取其中概率最大的值作为预测值，

$$
\begin{gather}
    h_{\theta}^{(i)}(x)=P(y=i|x;\theta) \\
    \underset{i}{\max}\ h_{\theta}^{(i)}(x)
\end{gather}
$$

## 优化

### 特征缩放

通过特征缩放（feature scaling）使得 $-1 \le x_j \le 1$，梯度下降可以更快地收敛。

均值归一化（mean normalization）

### 学习率

如果$\alpha$太小，梯度下降很慢；如果$\alpha$太大，可能会导致无法收敛，甚至发散。代价函数通常是凸函数（convex function），因此不会陷入局部最优。

> Batch：每一步梯度下降使用训练集所有的样本。

### 过拟合

过拟合（overfitting）指的是特征过多时，可以很好地拟合训练数据，但是对新数据样本的预测效果很差。解决过拟合问题，可以尝试通过手动或模型选择算减少选择的特征数。另一种方法是使用正则化（regularization）。

$$
\begin{equation}
    J(\theta)=\frac{1}{2m}\bigg[\sum_{i=1}^{m}(h_{\theta}(x^{(i)})-y^{(i)})^2+\lambda\sum_{j=1}^{n}\theta_j^2 \bigg]
\end{equation}
$$

#### 线性回归

对于线性回归问题，采取正则化后的参数更新变成了，

$$
\begin{gather}
    \theta_0 := \theta_0 - \alpha\frac{1}{m}\sum_{i=1}^{m}(h_{\theta}(x^{(i)})-y^{(i)})x^{(i)}_0 \\
    \theta_j := \theta_j (1-\alpha\frac{\lambda}{m}) - \alpha\frac{1}{m}\sum_{i=1}^{m}(h_{\theta}(x^{(i)})-y^{(i)})x^{(i)}_j \qquad j=1,\dots,n
\end{gather}
$$

#### 逻辑回归

## 模型选择

### 数据划分

将数据样本按一定比例（常为 6:2:2）随机划分为训练集（training set）、交叉验证集（cross-validation set）和测试集（testing set），先使用训练集进行多个模型的参数学习，再通过验证集验证选择最小误差 $J_{cv}(\theta)$ 的模型，最后通过测试集的误差 $J_{test}(\theta)$，评估训练结果是否有较好的泛化能力。

### 欠拟合和过拟合

-   欠拟合（underfit）：$J_{train}$ 和 $J_{cv}$ 都很大，属于高偏差（bias）问题；
-   过拟合（overfit）：$J_{train}$ 较小，但 $J_{cv}$ 较大，属于高方差（variance）问题。

## 参考

-   [吴恩达机器学习系列课程](https://www.bilibili.com/video/BV164411b7dx/)
-   [吴恩达深度学习 deeplearning.ai](https://www.bilibili.com/video/BV1FT4y1E74V/)
