#### Pointcut Expressions

In this article, we'll discuss different types of AOP advice that can be created in Spring. The implementation of all these examples and code snippets can be found in [my GitHub project](https://github.com/eugenp/tutorials/tree/master/spring-aop).

**Advice is an action taken by an aspect at a particular join point**. Different types of advice include `around`, `before` and `after` advice. The main purpose of aspects is to support cross-cutting concerns, such as logging, profiling, caching, and transaction management.

And if you want to go deeper into pointcut expressions, check out [the previous intro to these](https://www.baeldung.com/spring-aop-pointcut-tutorial)

##### Enabling Advice

With Spring, you can declare advice using AspectJ annotations, but** you must first apply the `@EnableAspectJAutoProxy` annotation to your configuration class**, which will enable support for handling components marked with AspectJ's `@Aspect` annotation

```java
@Configuration
@EnableAspectJAutoProxy
public class AopConfiguration {
}
```

###### Spring Boot

**In Spring Boot projects, we don't have to explicitly use the `@EnableAspectJAutoProxy`.** There's a dedicated `[AopAutoConfiguration`](https://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/autoconfigure/aop/AopAutoConfiguration.html) that enables Spring's AOP support if the `Aspect` or `Advice` is on the classpath.

##### Before Advice

**This advice, as the name implies, is executed before the join point.** It doesn't prevent the continued execution of the method it advises unless an exception is thrown.

Consider the following aspect that simply logs the method name before it is called.

```java
@Component
@Aspect
public class LoggingAspect {
	private Logger logger = Logger.getLogger(LoggingAspect.class.getName());

	@Pointcut("@target(org.springframework.stereotype.Repository)")
	public void repositoryMethods() {}

	@Before("repositoryMethods()")
	public void logMethodCall(JoinPoint jp) {
		String methodName = jp.getSignature().getName();
		logger.info("Before " + methodName);
	}
}
```

The `logMethodCall` advice will be executed before any repository method defined by the repositoryMethods pointcut.

##### After Advice

After advice, declared by using the @After annotation, **is executed after a matched method's execution, whether or not an exception was thrown**.

In some ways, it is similar to a `finally` block. In case you need advice to be triggered only after normal execution, you should use the `returning advice`declared by `@AfterReturning` annotation. If you want your advice to be triggered only when the target method throws an exception, you should use `throwing advice`, declared by using the `@AfterThrowing` annotation.
Suppose that we wish to notify some application components when a new instance of `Foo` is created. We could publish an event from `FooDao`, but this would violate the single responsibility principle. Instead, we can accomplish this by defining the following aspect:

```java
@Component
@Aspect
public class PublishingAspect {
 
    private ApplicationEventPublisher eventPublisher;
 
    @Autowired
    public void setEventPublisher(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }
 
    @Pointcut("@target(org.springframework.stereotype.Repository)")
    public void repositoryMethods() {}
 
    @Pointcut("execution(* *..create*(Long,..))")
    public void firstLongParamMethods() {}
 
    @Pointcut("repositoryMethods() && firstLongParamMethods()")
    public void entityCreationMethods() {}
 
    @AfterReturning(value = "entityCreationMethods()", returning = "entity")
    public void logMethodCall(JoinPoint jp, Object entity) throws Throwable {
        eventPublisher.publishEvent(new FooCreationEvent(entity));
    }
}
```

Notice, first, that by using the `@AfterReturning` annotation we can access the target method's return value. Second, by declaring a parameter of type `JoinPoint`, we can access the arguments of the target method's invocation.

Next we create a listener which will simply log the event. You may read more about events in [this tutorial](https://www.baeldung.com/spring-events):

```java
@Component
public class FooCreationEventListener implements ApplicationListener<FooCreationEvent> {
 
    private Logger logger = Logger.getLogger(getClass().getName());
 
    @Override
    public void onApplicationEvent(FooCreationEvent event) {
        logger.info("Created foo instance: " + event.getSource().toString());
    }
}
```

##### Around Advice

Around advice surrounds a join point such as a method invocation.

This is the most powerful kind of advice. **Around advice can perform custom behavior both before and after the method invocation**. It's also responsible for choosing whether to proceed to the join point or to shortcut the advised method execution by providing its own return value or throwing an exception.
To demonstrate its use, suppose that you want to measure method execution time. For this purpose you may create the following aspect:

```java
@Aspect
@Component
public class PerformanceAspect {
 
    private Logger logger = Logger.getLogger(getClass().getName());
 
    @Pointcut("within(@org.springframework.stereotype.Repository *)")
    public void repositoryClassMethods() {}
 
    @Around("repositoryClassMethods()")
    public Object measureMethodExecutionTime(ProceedingJoinPoint pjp) throws Throwable {
        long start = System.nanoTime();
        Object retVal = pjp.proceed();
        long end = System.nanoTime();
        String methodName = pjp.getSignature().getName();
        logger.info("Execution of " + methodName + " took " +
          TimeUnit.NANOSECONDS.toMillis(end - start) + " ms");
        return retVal;
    }
}
```

This advice is triggered when any of the join points matched by the `repositoryClassMethods` pointcut is executed.

**This advice takes one parameter of type `ProceedingJointPoint`**. The parameter gives us an opportunity to take action before the target method call. In this case, we simply save the method start time.

Second, the advice return type is `Object` since the target method can return a result of any type. If target method is `void`, `null` will be returned. After the target method call, we can measure the timing, log it, and return the method's result value to the caller.

#### References

1. [Introduction to Pointcut Expressions in Spring | Baeldung](https://www.baeldung.com/spring-aop-pointcut-tutorial)