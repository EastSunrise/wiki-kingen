#### Overview

##### [xlwt](https://pypi.org/project/xlwt/)/[xlrd]

```python
import xlrd
import xlwt

# read with xlrd
wb = xlrd.open_workbook('example.xlsx', encoding='utf-8')
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
wb = xlwt.Workbook(encoding='utf-8')
for key, value in data.items():
    sheet = wb.add_sheet(key)
    for r, row in enumerate(value):
        for c, value in enumerate(row):
            sheet.write(r, c, value)
wb.save('dst.xls')
```

###### xlwt.Worksheet.[Worksheet](https://xlwt.readthedocs.io/en/latest/api.html#xlwt.Worksheet.Worksheet)

```python
write(r, c, label='', style=<xlwt.Style.XFStyle object>)

# example
write(0, 0, 'example')
write(0,1,xlwt.Formula('HYPERLINK("%s", "%s")' % (url, name)))
```

`r` and `c` start with 0.

`label` is the data value to be written. 

- An `int`, `long`, or `Decimal` instance is converted to `float`.
- A `unicode` instance is written as is. A `bytes` instance is converted to `unicode` using the encoding, which defaults to `ascii`, specified when the Workbook instance was created. 
- A `datetime`, `date` or `time` instance is converted into Excel date format (a float representing the number of days since (typically) `1899-12-31T00:00:00`, under the pretence that 1900 was a leap year).
- A `bool` instance will show up as `TRUE` or `FALSE` in Excel.
- `None` causes the cell to be blank: no data, only formatting.
- An `xlwt.Formula` instance causes an Excel formula to be written.

**Notes**: xlwt doesn't support *.xlsx*.

