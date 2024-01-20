## Usage

### Reading

```java
int cellType = cell.getCellType() == Cell.CELL_TYPE_FORMULA ? cell.getCachedFormulaResultType() : cell.getCellType();
String cellValue = "";
switch (cellType) {
	case Cell.CELL_TYPE_NUMERIC:
		if (DateUtil.isCellDateFormatted(cell)) {
			cellValue = String.valueOf(cell.getDateCellValue());
		} else {
			cell.setCellType(Cell.CELL_TYPE_STRING);
			cellValue = cell.getStringCellValue();
		}
		break;

	case Cell.CELL_TYPE_STRING:
		cellValue = legalizeString((cell.getStringCellValue()));
		break;

	case Cell.CELL_TYPE_BOOLEAN:
		cellValue = String.valueOf(cell.getBooleanCellValue());
		break;

	default:
		break;
}
```

## References

-   [Apache POI - the Java API for Microsoft Documents](https://poi.apache.org/)
