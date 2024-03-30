# FAQ

## 内存分配

当使用 `new` 关键字创建一个新引用类型对象时，JVM 会从堆空间（Heap-space）分配新的内存空间给该对象，引用则被放在栈内存（Stack-memory）上。如果创建的对象是基本类型（primitive type），则直接放在栈内存上。

但是当使用字面量（例如 `String` 和 `Integer`）创建对象时，JVM 会先检查常量池是否已存在该对象，如果存在则直接引用。

```java
public static void main(String[] args) {
    // a and b are different references to the same object
    String a = "ab", b = "ab";
    System.out.println(a == b); // true
    System.out.println(a.equals(b)); // true

    //  x and y are not the same objects
    String x = new String("xy"), y = new String("xy");
    System.out.println(x == y); // false
    System.out.println(x.equals(y)); // true
}
```

## 参考

- [Stack vs Heap Memory Allocation - GeeksforGeeks](https://www.geeksforgeeks.org/stack-vs-heap-memory-allocation/)
