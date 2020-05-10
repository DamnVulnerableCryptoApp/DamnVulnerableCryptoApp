import { makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles({
  consoleContainer: {
    backgroundColor: '#000',
    color: green[500],
    padding: '20px',
    height: '500px'

  },
  console: {},
  "@global": {
    '.typed-cursor': {
      backgroundColor: green[500],
      width: '10px',
      display: 'inline-block'
    }
  }

});


export default useStyles;