### 激活函数

#### ReLU 函数

$$
\begin{equation}
    a(x)=\begin{cases}
        x\quad (x>0) \\
        0 \quad (x\le0)
    \end{cases}
\end{equation}
$$

#### softmax 函数

神经网络在处理分类问题时，常使用softmax函数作为输出层的激活函数。设$n$为输出层神经单元的个数，则softmax函数如下，

$$
\begin{equation}
    y_j=\frac{\exp(z^L_{j})}{\sum_{i=1}^{n}\exp(z^L_j)}
\end{equation}
$$

为了防止指数计算时出现溢出，通常在指数运算前，减去一个常数$C$（一般取输入值的最大值），

$$
\begin{equation}
    y_j=\frac{\exp(z^L_{j}+C)}{\sum_{i=1}^{n}\exp(z^L_j+C)}
\end{equation}
$$

由式$(2)$易知，softmax函数的输出总和为$1$，因此可以将其输出解释为每种输出类别的**概率**。

### 损失函数

#### 交叉熵误差

设第$y$层为神经单元的输出，$t$为正解，$n$为学习实例总数，则所有数据预测的交叉熵误差如下，

$$
\begin{equation}
    C_T=-\frac{1}{n}\sum_{1\le k\le n}\sum_{i}t_i\log y_i
\end{equation}
$$

### 小批量学习

为了减少训练的时间，每次学习时从总的训练数据中选择一批数据（称为mini-batch），进行学习，即称为小批量学习。
