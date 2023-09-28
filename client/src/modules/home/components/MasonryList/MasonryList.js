import React, { useMemo } from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import _reduce from 'lodash/reduce';

import useResizeObserver from 'core/utils/hooks/useResizeObserver';

import { getColumnConfig } from '../../utils/gridLayoutUtils';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  footer: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
}));

const MasonryList = ({
  id,
  keyExtractor,
  renderItem,
  renderHeader,
  renderFooter,
  items,
  minColumnWidth,
  gutterWidth,
  maxColumns,
}) => {
  const classes = useStyles();

  const { width: containerWidth } = useResizeObserver({ uniqueId: id });

  const { columnWidth, columnCount } = useMemo(() => {
    return getColumnConfig({
      containerWidth,
      maxColumns,
      minColumnWidth,
      gutterWidth,
    });
  }, [maxColumns, minColumnWidth, gutterWidth, containerWidth]);

  const gridItems = useMemo(() => {
    return _reduce(
      items,
      (acc, item, index) => {
        const columnIndex = index % columnCount;

        if (!acc[columnIndex]) {
          acc[columnIndex] = [];
        }

        acc[columnIndex].push(item);
        return acc;
      },
      []
    );
  }, [items, columnCount]);

  return (
    <div className={classes.root} id={id}>
      {renderHeader?.()}
      <Grid container spacing={2}>
        {gridItems.map((column, index) => (
          <Grid item xs={12} md={12 / columnCount} key={index} style={{ width: `${columnCount}px` }}>
            {column.map(item => renderItem({ item, columnWidth }))}
          </Grid>
        ))}
      </Grid>
      {renderFooter && <div className={classes.footer}>{renderFooter()}</div>}
    </div>
  );
};

export default MasonryList;
