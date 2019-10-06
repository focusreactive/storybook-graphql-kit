import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
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
      opacity: 0.8,
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

const LinkAction = ({ url, classes, id }) => (
  <Tooltip title={`Edit entry ${id} in GraphCMS`}>
    <IconButton href={url} target="_blank" variant="extended" aria-label="delete" className={classes.fab} size="small">
      <EditIcon className={classes.extendedIcon} />
    </IconButton>
  </Tooltip>
)

const DefaultTable = ({ columns, rows, createEntryLink, isLoading }) => {
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
              {columns.map(column => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          {!isLoading && <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map(column => {
                    const value = row[column.id];
                    const action = column.action ? createEntryLink(value) : null;
                    const formatedValue = column.format && typeof value === 'number' ? column.format(value) : value
                    const output = formatedValue;
                    let formatedOutput = `${output}`
                    if (Array.isArray(output)) {
                      formatedOutput = `[${output.length}]`
                    }
                    return (
                      <StyledTableCell key={column.id} align={column.align}>
                        {action ? <LinkAction url={action} classes={classes} id={value} /> : formatedOutput}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>}
        </Table>

      </div>
      {isLoading && <div className={classes.progress}>
        <LinearProgress />
      </div>
      }
      {!isLoading && <TablePagination
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
      />}
    </Paper>
  );
}

export default DefaultTable;
