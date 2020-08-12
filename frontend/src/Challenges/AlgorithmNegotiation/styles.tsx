import { makeStyles } from "@material-ui/core";
import { cyan } from "@material-ui/core/colors";

const useStyles = makeStyles({
  logo: {
    maxWidth: '500px'
  },
  cyanText: {
    color: cyan[500]
  },
  darkCyanText: {
    color: cyan[800]
  },
  paste: {
    border: '5px solid ' + cyan[800],
    borderRadius: '5px',
    backgroundColor: cyan[500],
    color: '#FFF',
    padding: '30px',
    marginTop: '20px'

  }
});

export default useStyles;