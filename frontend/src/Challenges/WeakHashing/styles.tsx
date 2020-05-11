import { makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles({
  container: {
    backgroundColor: "#66bd4a"
  },
  title: {
    textAlign: 'center',
    color: "#FFF",
  },
  loginButton: {
    textTransform: "none",
    backgroundColor: green[500],
    color: '#FFF'
  }
});


export default useStyles;
