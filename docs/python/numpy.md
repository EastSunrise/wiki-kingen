## 数组

数组（`ndarray`）是 NumPy 的核心数据结构，包括以下属性：

-   `ndarray.ndim` 表示数组的维数；
-   `ndarray.shape` 表示数组形状，由数组各个维度大小组成的元组；
-   `ndarray.size` 表示数组总的元素个数；
-   `ndarray.dtype` 表示数组内元素类型；
-   `ndarray.itemsize` 表示单个元素所占字节数；
-   `ndarray.data` 表示数组实际元素的缓冲。

按维度，数组可以分为一维数组（向量）、二维数组（矩阵）、N-维数组（张量）三种。

### 创建

-   `np.array()` 生成给定的数组；
-   `np.zeros()` 生成元素均为 0 的数组；
-   `np.ones()` 生成元素均为 1 的数组；
-   `np.empty()` 生成包含随机初始值的数组；
-   `np.arange()` 和 `np.linspace()` 生成等差数列，前者指定步长，后者指定总个数。

上述函数都可以指定数据类型 `dtype`.

### 基本运算

对于二元操作符，如果数组形状相同，则数组中元素一一对应执行对应操作（element-wise）；如果形状不同，NumPy 使用广播（broadcast）机制来使两者兼容：

-   所有输入的数组向其中维数最大的数组看齐，不足的在前面补 1；
-   输出数组的形状取各个维度上的最大值；
-   输入数组的某个维度长度**要么和最大值相同，要么为 1**，否则无法对齐计算；
-   如果输入数组的某个维度长度为 1，则沿着此维度运算时均使用第一组值。

矩阵乘法使用 `@` 运算符（python>=3.5）或者 `dot` 函数。

如果数组元素类型不同，则结果使用更通用或者精度更高的类型（upcasting）。

对于一元操作符，运算操作取决于 `axis` 参数。

### 索引和分片

`[i]` 表示索引，`[i:j]` 表示分片，多维则使用列表对应各个维度。

## 参考

-   [NumPy: the absolute basics for beginners](https://numpy.org/doc/stable/user/absolute_beginners.html)
-   [NumPy documentation](https://numpy.org/doc/stable/)
-   [NumPy Reference](https://numpy.org/doc/stable/reference/index.html)
