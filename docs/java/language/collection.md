#### Transformation

##### From List or Set to Array

Only for non-primary types

```java
List<Integer> list = new ArrayList<>();
Integer[] array = list.toArray(new Integer[0]);

Set<Integer> set = new HashSet<>();
Integer[] array = set.toArray(new Integer[0]);
```

##### Between List and Set

```java
List<Integer> list = new ArrayList<>();
Set<Integer> set = new HashSet<>(list);

Set<Integer> set = new HashSet<>();
List<Integer> list = new ArrayList<>(set);
```

##### From Array to List or Set

###### Non-primary types

```java
Integer[] array = new Integer[0];
List<Integer> list = Arrays.asList(array);
```

###### Common

```java    
Integer[] array = new Integer[0];
List<Integer> list = new ArrayList<>();
Collections.addAll(list, array);
```