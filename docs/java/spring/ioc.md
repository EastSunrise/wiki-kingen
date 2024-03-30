# IoC

## 基于注解配置

### @Autowired

`@Autowired` 注解可以用于构造函数、setter、任意方法和成员变量来注入 bean.

```java
public class MovieRecommender {

    private final CustomerPreferenceDao customerPreferenceDao;

    private MovieFinder movieFinder;

    private MovieCatalog movieCatalog;

    private PreferenceDao preferenceDao;

    /**
     * It can be ignored when there is only one constructor.
     * At least one of constructors must be annotated 
     * if more than one constructors are available and there is no primary/default one.
     */
    @Autowired
    public MovieRecommender(CustomerPreferenceDao customerPreferenceDao) {
        this.customerPreferenceDao = customerPreferenceDao;
    }

    @Autowired
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    @Autowired
    public void prepare(MovieCatalog movieCatalog, PreferenceDao preferenceDao) {
        this.movieCatalog = movieCatalog;
        this.preferenceDao = preferenceDao;
    }

    // ...
}
```

也可以通过数组和集合类型注入同类型的多个 beans.

```java
public class MovieRecommender {

    @Autowired
    private MovieFinder[] movieFinders;

    private Set<MovieCatalog> movieCatalogs;

    // key is name of the bean
    private Map<String, MovieCreator> movieCreators;

    @Autowired
    public void setMovieCatalogs(Set<MovieCatalog> movieCatalogs) {
        this.movieCatalogs = movieCatalogs;
    }

    @Autowired
    public void setMovieCreators(Map<String, MovieCreator> movieCreators) {
        this.movieCreators = movieCreators;
    }
    // ...
}
```

### @Resource

`@Resource` 根据名称注入 bean，未指定或找不到再根据类型匹配。

```java
public class SimpleMovieLister {

    private MovieFinder movieFinder;

    @Resource(name="myMovieFinder") 
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }
}
```

## 参考

- [The IoC Container](https://docs.spring.io/spring-framework/reference/core/beans.html)
