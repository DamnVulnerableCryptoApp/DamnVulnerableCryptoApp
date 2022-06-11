import { createStyles, makeStyles, TableCell, TableRow, Theme, withStyles } from "@material-ui/core"
import { amber } from "@material-ui/core/colors"

const useStyles = makeStyles({
  requestsTable: {
    maxHeight: '600px'
  },
  logo: {
    width: '400px'
  },
  tabPanel: {
    minHeight: '500px',
    backgroundColor: amber[50],
    marginTop: '0px',
    padding: '20px'
  },
  tabs: {
    backgroundColor: amber[500],
    color: '#FFF'
  },
  editRequestInput: {
    backgroundColor: '#FFF'
  }
})

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: amber[500],
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell)

export const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      // '&:nth-of-type(odd)': {
      //   backgroundColor: theme.palette.action.hover,
      // },
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: amber[200]
      }
    },
  }),
)(TableRow)

export default useStyles