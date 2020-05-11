import { makeStyles } from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    'margin-bottom': '50px',
    'background-color': indigo[500], // lightGreen['500']
    color: '#FFF'
  },
  couponIcon: {
    'font-size': 150,
    color: '#FFF'
  },
  congrats: {
    'margin-top': '100px',
    'margin-bottom': '70px'
  },
  warning: {
    'margin-top': '20px',
    'margin-bottom': '20px'
  },
  form: {
    display: 'flex',
  },
  couponInput: {
    paddingLeft: '20px',
  }
});

export default useStyles;