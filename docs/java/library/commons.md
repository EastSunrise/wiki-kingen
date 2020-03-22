#### Overview

[Apache Commons](http://commons.apache.org/) Libraries.

#### Components

##### ArrayUtils

```java
public class TestMain {
	public static void main(String[] args) {
		int[] nums1 = { 1, 2, 3, 4, 5, 6 };

		// 通过常量创建新数组
		int[] nums2 = ArrayUtils.EMPTY_INT_ARRAY;

		// 比较两个数组是否相等
		ArrayUtils.isEquals(nums1, nums2);

		// 输出数组,第二参数为数组为空时代替输出
		ArrayUtils.toString(nums1, "array is null");

		// 克隆新数组,注意此拷贝为深拷贝
		int[] nums3 = ArrayUtils.clone(nums1);

		// 截取数组
		ArrayUtils.subarray(nums1, 1, 2);

		// 判断两个数组长度是否相等
		ArrayUtils.isSameLength(nums1, nums2);

		// 判断两个数组类型是否相等,注意int和Integer比较时不相等
		ArrayUtils.isSameType(nums1, nums2);

		// 反转数组
		ArrayUtils.reverse(nums1);

		// 查找数组元素位置
		ArrayUtils.indexOf(nums1, 5);

		// 查找数组元素最后出现位置
		ArrayUtils.lastIndexOf(nums1, 4);

		// 查找元素是否存在数组中
		ArrayUtils.contains(nums1, 2);

		// 将基本数组类型转为包装类型
		Integer[] nums4 = ArrayUtils.toObject(nums1);

		// 判断是否为空,length=0或null都属于
		ArrayUtils.isEmpty(nums1);

		// 并集操作,合并数组
		ArrayUtils.addAll(nums1, nums2);

		// 增加元素,在下标5中插入10,注意此处返回是新数组
		ArrayUtils.add(nums1, 5, 1111);

		// 删除指定位置元素,注意返回新数组,删除元素后面的元素会前移,保持数组有序
		ArrayUtils.remove(nums1, 5);

		// 删除数组中值为10的元素,以值计算不以下标
		ArrayUtils.removeElement(nums1, 10);
	}
}
```

##### ClassUtils

```java
public class TestMain {
	public static void main(String[] args) {
		// 获取Test类所有实现的接口
		ClassUtils.getAllInterfaces(Test.class);

		// 获取Test类所有父类
		ClassUtils.getAllSuperclasses(Test.class);

		// 获取Test类所在的包名
		ClassUtils.getPackageName(Test.class);

		// 获取Test类简单类名
		ClassUtils.getShortClassName(Test.class);

		// 判断是否可以转型
		ClassUtils.isAssignable(Test.class, Object.class);

		// 判断是否有内部类
		ClassUtils.isInnerClass(Test.class);
	}
}
```

##### ConstructorUtils

```java
public class TestMain {
	public static void main(String[] args) {
		// 获取参数为String的构造函数
		ConstructorUtils.getAccessibleConstructor(Test.class, String.class);

		// 执行参数为String的构造函数
		Test test = (Test) ConstructorUtils.invokeConstructor(Test.class, "Hello");
	}
}
```

##### MethodUtils

```java
public static void main(String[] args) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException {
	// 调用无参方法
	Test test = new Test();
	MethodUtils.invokeMethod(test, "publicHello", null);

	// 调用一参方法
	MethodUtils.invokeMethod(test, "publicHello", "Hello");

	// 调用多参方法
	MethodUtils.invokeMethod(test, "publicHello", new Object[] { "100", new Integer(10) });

	// 调用静态方法
	MethodUtils.invokeStaticMethod(Test.class, "staticHello", null);
}
```

##### FieldUtils

```java
public class TestMain {
	public static void main(String[] args) throws IllegalAccessException {
		Test test = new Test("1", "Ray", "hello");

		// 以下两个方法完全一样,都能获取共有或私有变量,因为第三个参数都设置了不检查
		FieldUtils.getDeclaredField(Test.class, "username", true);
		FieldUtils.getField(Test.class, "username", true);

		// 读取私有或公共变量的值
		FieldUtils.readField(test, "username", true);

		// 读取静态变量
		FieldUtils.readStaticField(Test.class, "STATIC_FIELD");

		// 写入私有或共有变量
		FieldUtils.writeField(test, "username", "RayRay", true);

		// 写入静态变量
		FieldUtils.writeStaticField(Test.class, "STATIC_FIELD", "static_value");
	}
}
```

##### NumberUtils & RandomUtils

**Notes**: `org.apache.commons.lang.NumberUtils`已经被弃用，注意要引入`org.apache.commons.lang.math.NumberUtils`

RandomUtils帮助我们产生随机数，不止是数字类型，连boolean类型都可以通过RandomUtils产生

```java
public class TestMain {
	public static void main(String[] args) throws IllegalAccessException {
		String str = "12.7";

		// 判断字符串是否为整数
		NumberUtils.isDigits(str);

		// 判断字符串是否为数字
		NumberUtils.isNumber(str);

		// 获取参数中最大的值，支持传入数组
		NumberUtils.max(10, 20, 30);

		// 获取参数中最小的值，支持传入数组
		NumberUtils.min(10, 20, 30);

		// 将字符串转换为int类型，支持float,long,short等数值类型
		NumberUtils.toInt(str);

		// 通过字符串创建BigDecimal类型，支持int,float,long等数值
		NumberUtils.createBigDecimal(str);
		RandomUtils.nextBoolean();
		RandomUtils.nextDouble();
		RandomUtils.nextLong();
		RandomUtils.nextInt(1000);
	}
}
```

##### StringUtils

```java
public class TestMain {
	public static void main(String[] args) throws IllegalAccessException {
		String str = "Hello World";

		// isEmpty和isBlank的区别在于isEmpty不会忽略空格，" "<\\--对于这样的字符串isEmpty会认为不是空，而isBlank会认为是空,isBlank更常用
		StringUtils.isEmpty(str);
		StringUtils.isNotEmpty(str);
		StringUtils.isBlank(str);
		StringUtils.isNotBlank(str);

		StringUtils.strip(str, "aa");
		StringUtils.stripStart(str, "hell");
		StringUtils.stripEnd(str, "orld");

		// 返回字符串在第三次出现A的位置
		StringUtils.ordinalIndexOf(str, "A", 3);

		// 获取str开始为hello结尾为orld中间的字符串
		// 注意此方法返回字符串 -->substringBetween
		StringUtils.substringBetween(str, "hell", "orld");

		// 注意此方法返回字符串数组(多了个s) --> substringsBetween
		StringUtils.substringsBetween(str, "hell", "orld");

		 // 重复字符串,第二种重载形式为在重复中用hahah拼接
		StringUtils.repeat(str, 3);
		StringUtils.repeat(str, "hahah", 2);

		// 统计参数2在字符串中出现的次数
		StringUtils.countMatches(str, "l");

		// 判断字符串是否全小写或大写
		StringUtils.isAllLowerCase(str);
		StringUtils.isAllUpperCase(str);

		// isAlpha，全部由字母组成返回true
		StringUtils.isAlpha(str);
		
		// isNumeric，全部由数字组成返回true
		StringUtils.isNumeric(str);

		// isAlphanumeric，全部由字母或数字组成返回true
		StringUtils.isAlphanumeric(str);

		// isAlphaSpace，全部由字母或空格组成返回true
		StringUtils.isAlphaSpace(str);

		// isWhitespace -->全部由空格组成返回true
		StringUtils.isWhitespace(str);

		// 缩进字符串,第二参数最低为 4,要包含...
		// 现在Hello World输出为H...
		StringUtils.abbreviate(str, 4);

		// 首字母大写或小写
		StringUtils.capitalize(str);
		StringUtils.uncapitalize(str);

		// 将字符串数组转变为一个字符串,通过","拼接,支持传入iterator和collection
		StringUtils.join(new String[] { "Hello", "World" }, ",");

		// 经常性要把后台的字符串传递到前提作为html代码进行解释，可以使用以下方法进行转换,以下方法输出为：`<p>Hello</p>`
		StringEscapeUtils.escapeHtml("Hello");
	}
}
```

##### DateUtils & DateFormatUtils

由于Aache的DateUtils和DateFormatUtils并没有Joda强大，所以在这里只作简单的示例

```java
public class TestMain {
	public static void main(String[] args) throws IllegalAccessException {
		Date day1 = new Date();

		// 增加一天
		DateUtils.addDays(day1, 1);

		// 减少一年
		DateUtils.addYears(day1, -1);

		// 格式化时间,第三参数为国际化,表示按美国时间显示
		DateFormatUtils.format(day1, "yyyy-MM-dd", Locale.UK);
	}
}
```

##### BeanUtils

Commons-BeanUtils 提供对 Java 反射和自省API的包装

**Notes**: `MethodUtils` 和 `ConstructUtils` 在 `org.apache.commons.lang.reflect` 和 `org.apache.commons.beanutils` 都存在，但FieldUtils和ClassUtils只在reflect当中存在，因为beanutils提供了另外一种名为PropertyUtils的对属性存取更为方便的工具，但PropertyUtils不能获取传统反射的Field对象，建议MethodUtils和ConstructUtils应该倾向使用beanutils，因为beanutils就是为反射而存在，更专业(虽然提供的方法几乎一样)，而使用ClassUtils和要获取传统的Field对象时使用reflect中的FieldUtils

##### Betwixt

Betwixt提供将 JavaBean 映射至 XML 文档，以及相反映射的服务.

##### Chain

Chain 提供实现组织复杂的处理流程的“责任链模式”.

##### CLI

CLI 提供针对命令行参数，选项，选项组，强制选项等的简单API.

##### Codec

Codec 包含一些通用的编码解码算法。包括一些语音编码器， Hex, Base64, 以及URL encoder.

##### Collections

Commons-Collections 提供一个类包来扩展和增加标准的 Java Collection框架

##### Configuration

Commons-Configuration 工具对各种各式的配置和参考文件提供读取帮助.

##### Daemon

一种 unix-daemon-like java 代码的替代机制

##### DBCP

Commons-DBCP 提供数据库连接池服务

##### DbUtils

DbUtils 是一个 JDBC helper 类库，完成数据库任务的简单的资源清除代码.

##### Digester

Commons-Digester 是一个 XML-Java对象的映射工具，用于解析 XML配置文件.

##### Discovery

Commons-Discovery 提供工具来定位资源 (包括类) ，通过使用各种模式来映射服务/引用名称和资源名称。.

##### EL

Commons-EL 提供在JSP2.0规范中定义的EL表达式的解释器.

##### FileUpload

FileUpload 使得在你可以在应用和Servlet中容易的加入强大和高性能的文件上传能力

##### HttpClient

Commons-HttpClient 提供了可以工作于HTTP协议客户端的一个框架.

##### IOIO

IOIO 是一个 I/O 工具集

##### Jelly

Jelly是一个基于 XML 的脚本和处理引擎。 Jelly 借鉴了 JSP 定指标签，Velocity, Cocoon和Xdoclet中的脚本引擎的许多优点。Jelly 可以用在命令行， Ant 或者 Servlet之中。

##### Jexl

Jexl是一个表达式语言，通过借鉴来自于Velocity的经验扩展了JSTL定义的表达式语言。

##### JXPath

Commons-JXPath 提供了使用Xpath语法操纵符合Java类命名规范的 JavaBeans的工具。也支持 maps, DOM 和其他对象模型。

##### Lang

Commons-Lang 提供了许多许多通用的工具类集，提供了一些java.lang中类的扩展功能

##### Latka

Commons-Latka 是一个HTTP 功能测试包，用于自动化的QA,验收和衰减测试.

##### Launcher

Launcher 组件是一个交叉平台的Java 应用载入器。 Commons-launcher 消除了需要批处理或者Shell脚本来载入Java 类。.原始的 Java 类来自于Jakarta Tomcat 4.0 项目

##### Logging

Commons-Logging 是一个各种 logging API实现的包裹类.

##### Math

Math 是一个轻量的，自包含的数学和统计组件，解决了许多非常通用但没有及时出现在Java标准语言中的实践问题.

##### Modeler

Commons-Modeler 提供了建模兼容JMX规范的 Mbean的机制.

##### Net

Net 是一个网络工具集，基于 NetComponents 代码，包括 FTP 客户端等等。

##### Pool

Commons-Pool 提供了通用对象池接口，一个用于创建模块化对象池的工具包，以及通常的对象池实现.

##### Primitives

Commons-Primitives提供了一个更小，更快和更易使用的对Java基本类型的支持。当前主要是针对基本类型的 collection。.

##### Validator

The commons-validator提供了一个简单的，可扩展的框架来在一个XML文件中定义校验器 (校验方法)和校验规则。支持校验规则的和错误消息的国际化。

#### References

1. [apache commons常用工具类_Apache常用工具类 - 冷血天狼的博客 - CSDN博客](https://blog.csdn.net/YingHuaNanHai/article/details/81273116)