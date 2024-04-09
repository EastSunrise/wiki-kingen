# Spring MVC

## DispatcherServlet

`DispatcherServlet` 是 Spring MVC 的核心，负责请求处理。

![MVC Context Hierarchy](../img/mvc-context-hierarchy.png)

其实际工作通过委派给默认或者自定义的组件来完成：

- `HandlerMapping`：根据请求找到对应的 handler，及前置和后置拦截器，主要实现是 `RequestMappingHandlerMapping`（支持 `@RequestMapping` 注解） 和 `SimpleUrlHandlerMapping`；
- `HandlerAdapter`：调用 handler；
- `HandlerExceptionResolver`：异常处理；
- `ViewResolver`：基于字符串的视图解析器；
- `LocaleResolver`：国际化组件；
- `MultipartResolver`：multipart 数据解析，包括文件上传；
- `FlashMapManager`：用于管理重定向时的参数传递。

## MVC Controller

`@RequestMapping` 注解用于标记一个方法为处理请求的控制器方法，通过 URL 模板（`PathPattern` 和 `AntPathPattern`）匹配。

如果未声明 HTTP 方法（不推荐），则 `Allow` 标头设为 `GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS`，默认匹配所有 HTTP 方法。

### 方法参数

基于 `HandlerMethodArgumentResolver` 的不同实现从请求上下文解析方法参数。

!!! note
    如果请求参数是 name-value 类型，但参数值类型声明不是 `String`，则会自动执行类型转换，比如 `@RequestParam, @RequestHeader, @PathVariable, @MatrixVariable, @CookieValue`。默认情况下，支持简单类型（`int, long, Date` 等），也可以通过 `WebDataBinder` 或 `Formatter` 自定义。

#### 请求相关参数

支持类型参考 [ServletRequestMethodArgumentResolver](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/servlet/mvc/method/annotation/ServletRequestMethodArgumentResolver.html)：

```java
@RestController
@RequestMapping("/api")
public class ExampleController {

    /**
     * @param method   the HTTP method of the request
     * @param locale   the current request locale
     * @param timeZone the time zone associated with the current request
     */
    @GetMapping("/hello")
    public void hello(HttpMethod method, Locale locale, TimeZone timeZone) {
        // do something
    }
}
```

#### @PathVariable

`@PathVariable` 匹配 URI 模板变量。如果参数类型为 `Map` ，且未指定名称，则解析所有给定名称的路径变量。

```java
@RestController
@RequestMapping("/api")
public class ExampleController {

    @GetMapping("/hello/{name}")
    public void hello(@PathVariable String name) {
        // do something
    }
}
```

#### @RequestParam

`@RequestParam` 绑定 Query 参数和 `multipart/form-data` 请求体。

支持数组或集合类型接收多值参数。如果参数类型为 `Map`，且未指定名称，则解析所有给定名称参数。

!!! note
    `@RequestParam` 是可选的，默认情况下，如果参数为简单类型（`BeanUtils.isSimpleProperty()`）且未被其他解析器处理，则默认使用 `@RequestParam`。

```java
@RestController
@RequestMapping("/api")
public class ExampleController {

    @GetMapping("/hello")
    public void hello(@RequestParam("name") String name) {
        // do something
    }
    
    /**
     * @RequestParam(name = "name", required = false) is ignored
     */
    @GetMapping("/greet")
    public void greet(String name) {
        // do something
    }

    @PostMapping("/upload")
    public void upload(@RequestParam("file") MultipartFile file) {
        // do something
    }
}
```

#### @RequestHeader

`@RequestHeader` 匹配请求头，使用 `Map` 绑定所有请求头。

```java
@RestController
@RequestMapping("/api")
public class ExampleController {

    @GetMapping("/hello")
    public void hello(@RequestHeader("Accept-Encoding") String encoding) {
        // do something
    }

    /**
     * @param accepts converting the comma-separated Accept header to an array or collection
     */
    @GetMapping("/greet")
    public void greet(@RequestHeader("Accept") String[] accepts) {
        // do something
    }
}
```

#### @RequestBody

`@RequestBody` 注解的参数通过 `HttpMessageConverter` 读取和解析请求体，可以结合 `@Valid` 和 `@Validated` 进行校验。

```java
@RestController
@RequestMapping("/api")
public class ExampleController {

    @PostMapping("/login")
    public void login(@RequestBody @Valid User user) {
        // do something
    }

    public record User(@NotBlank String username, @NotBlank String password) {}
}
```

#### @RequestPart

`@RequestPart` 匹配 `multipart/form-data` 请求体，可以结合 `@Valid` 和 `@Validated` 进行校验。

!!! note
    `@RequestPart` 和 `@RequestParam` 都可以匹配 `multipart/form-data` 请求体，区别在于：当参数类型既不是 `String` 也不是 `MultipartFile` 的时候，前者基于 `Content-Type` 对应的 `HttpMessageConverter` 实现解析参数，支持 JSON 和 XML 等复杂结构，后者通过注册的 `Converter, PropertyEditor` 解析参数，一般是 name-value 格式。

```java
@RestController
@RequestMapping("/api")
public class ExampleController {

    @PostMapping("/upload")
    public void upload(@RequestPart("metadata") @Valid Metadata metadata, @RequestPart("file") MultipartFile file) {
        // do something
    }

    public record Metadata(@NotBlank String name, @Min(1) Long size) {}
}
```

#### @ModelAttribute

`@ModelAttribute` 将方法参数或者返回值和 Model 对象绑定，可以结合 `@Valid` 和 `@Validated` 进行校验。

!!! note
    `@ModelAttribute` 是可选的，默认情况下，如果参数**不是**简单类型（`!BeanUtils.isSimpleProperty()`）且未被其他解析器处理，则默认使用 `@ModelAttribute`。

```java
@RestController
@RequestMapping("/api")
public class ExampleController {

    @PostMapping("/login")
    public void login(@ModelAttribute @Valid User user) {
        // do something
    }

    /**
     * @ModelAttribute is ignored
     */
    @PostMapping("/owners/{ownerId}/pets/{petId}/edit")
    public String processSubmit(Pet pet) { 
        // do something
    }

    public record User(@NotBlank String username, @NotBlank String password) {}
}
```

#### @AuthenticationPrincipal

在 Spring Security 中，`@AuthenticationPrincipal` 将 `Authentication#getPrincipal()` 和参数绑定：

```java
@RestController
@RequestMapping("/api")
public class ExampleController {

    /**
     * @param principle the currently authenticated user
     */
    @GetMapping("/hello")
    public void hello(@AuthenticationPrincipal UserPrinciple principle) {
        // do something
    }

    /**
     * Customized principal.
     */
    public record UserPrinciple(String username, String role) {}
}
```

更多支持的参数参考 [Method Arguments](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/arguments.html).

## 参考

- [Spring Web MVC :: Spring Framework](https://docs.spring.io/spring-framework/reference/web/webmvc.html)
