import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    padding: '200px',
    paddingTop: '100px',
    '& code': {
      wordBreak: 'break-all',
    },
    '& pre': {
      border: '1px solid #ccc'
    },

    '& blockquote': {
      color: '#666',
      margin: 0,
      paddingLeft: '3em',
      borderLeft: '0.5em #eee solid'
    },
    '& table': {
      'borderCollapse': 'collapse'
    },
    '& tr': {
      borderTop: '1px solid #c6cbd1',
      background: '#fff',
    },

    '& th': {
      padding: '6px 13px',
      border: '1px solid #dfe2e5'
    },
    '& td': {
      padding: '6px 13px',
      border: '1px solid #dfe2e5'
    },
    '& table tr:nth-child(2n)': {
      background: '#f6f8fa'
    }

  }
});

export default useStyles;