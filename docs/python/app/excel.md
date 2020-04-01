#### Overview

##### xlwt/xlrd

**Notes**: xlwt doesn't support *.xlsx*.

```python
import xlrd
import xlwt

# read with xlrd
wb = xlrd.open_workbook('example.xlsx')
data = {}
for i, sheet in enumerate(wb.sheets()):
    nrows = sheet.nrows  # number of rows in the sheet
    ncols = sheet.ncols  # number of columns in the sheet
    sheet_values = []
    for r in range(nrows):
        row_values = []
        for c in range(ncols):
            row_values.append(sheet.cell(r, c).value)
        sheet_values.append(row_values)
    data[sheet.name] = sheet_values

# write with xlwt
wb = xlwt.Workbook()
for key, value in data.items():
    sheet = wb.add_sheet(key)
    for r, row in enumerate(value):
        for c, value in enumerate(row):
            sheet.write(r, c, value)
wb.save('dst.xls')
```

