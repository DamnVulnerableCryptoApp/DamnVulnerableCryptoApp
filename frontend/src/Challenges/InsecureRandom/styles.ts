import { makeStyles } from "@material-ui/core";
import { grey, indigo } from "@material-ui/core/colors";

const useStyles = makeStyles({
  container: {
    backgroundColor: grey[200]
  },
  coupons: {
    padding: '20px'
  },
  coupon: {
    padding: '20px'
  },
  logo: {
    maxWidth: '200px'
  },

  couponIcon: {
    fontSize: 100,
    color: indigo[500]
  },
  congrats: {
    marginBottom: '10px',
    backgroundColor: indigo[500],
    color: '#FFF',
    padding: '30px'
  },

  form: {
    display: 'flex',
  },
  couponInput: {
    paddingLeft: '20px',
  }
});

export default useStyles;