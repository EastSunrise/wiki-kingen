#### Overview

```python
import hashlib

md5obj = hashlib.md5()
with open('example.txt', 'rb') as file:
    md5obj.update(file.read())
    md5value = md5obj.hexdigest() # get md5 value of the file
```