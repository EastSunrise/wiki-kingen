#### Overview

It provides the Windows APIs from Python.

#### FileDialog

```python
import win32ui

dialog = win32ui.CreateFileDialog(1)
dialog.SetOFNInitialDir('C:/Users/Administrator/Documents/')
dialog.DoModal()

filename = dialog.GetPathName()
print(filename)
```