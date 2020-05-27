import { makeStyles } from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    marginBottom: '50px',
    backgroundColor: indigo[500], // lightGreen['500']
    color: '#FFF'
  },
  couponIcon: {
    fontSize: 150,
    color: '#FFF'
  },
  congrats: {
    marginBottom: '70px'
  },
  warning: {
    marginTop: '20px',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
  },
  couponInput: {
    paddingLeft: '20px',
  }
});

export default useStyles;