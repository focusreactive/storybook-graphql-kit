import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  progress: {
    paddingTop: 8,
    flexGrow: 1,
  },
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.themeColor,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    '&:nth-of-type(odd)': {
      // opacity: 0.8,
    },
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const DataCard = ({ children, classes }) => <div className={classes.root}>
  <div className={classes.card}>
    {children}
  </div>
</div>


const StyledDataCard = withStyles(theme => ({
  root: {
    height: 120,
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  card: {
    position: 'absolute',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'flex-end',
    '&:hover': {
      overflow: 'auto',
      zIndex: 1000,
      maxHeight: 'unset',
      height: 'unset',
      minHeight: '100%',
      backgroundColor: 'white',
      width: '200%',
      maxWidth: 300,
      boxShadow: '3px 3px 9px 1px grey',
      padding: 6,
      textAlign: 'left',
      left: -6,
      top: -6,
    }
  }
}))(DataCard)

const DefaultTable = ({ columns, rows, isLoading }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column, i) => (
                <StyledTableCell
                  key={`${i}-${column.id}`}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.getLabel()}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          {!isLoading && (
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                <StyledTableRow hover role="checkbox" tabIndex={-1} key={`${i}-${row.id}`}>
                  {row.columns.map((column, j) => (
                    <StyledTableCell key={`${i}-${column.id}`} align={column.align}>
                        {column.render ? column.render() : column.getValue()}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
      {isLoading && (
        <div className={classes.progress}>
          <LinearProgress />
        </div>
      )}
      {!isLoading && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default DefaultTable;
