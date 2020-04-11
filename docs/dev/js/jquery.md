#### Overview

[jQuery] is a [JavaScript](index.md) library. See [official apis](https://api.jquery.com/) or [Chinese version](https://www.jquery123.com/).

#### Utilities

##### [extend](https://api.jquery.com/jQuery.extend/)

Merge the contents of two or more objects together into the first object.

```javascript
var object = $.extend(object1, object2); // merge object2 into object1, the object1 will be modified.
var object = $.extend({}, object1, object2); // if u don't want target to be modified.
var object = $.extend(true, object1, object1); // merge recursively, defaults to false.
```
