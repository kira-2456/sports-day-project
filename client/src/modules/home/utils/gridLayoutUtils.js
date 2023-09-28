import _find from 'lodash/find';
import _rangeRight from 'lodash/rangeRight';

export const getColumnConfig = ({ containerWidth, maxColumns, minColumnWidth, gutterWidth = 0 }) => {
  const effectiveColumnCount =
    _find(
      _rangeRight(1, maxColumns + 1),
      columnCount => minColumnWidth * columnCount + gutterWidth * (columnCount - 1) < containerWidth
    ) || 1;
  const effectiveColumnWidth = (containerWidth - gutterWidth * (effectiveColumnCount - 1)) / effectiveColumnCount;

  return { columnCount: effectiveColumnCount, columnWidth: effectiveColumnWidth };
};
