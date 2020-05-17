import { makeStyles } from "@material-ui/core";
import indigo from '@material-ui/core/colors/indigo';

const useStyles = makeStyles({
  mailbox: {
    minHeight: '500px'
  },
  emailList: {
    borderRight: '1px solid #DDD',

  },
  emailDetails: {

  },
  tabs: {
    backgroundColor: indigo[500],
  },
  emailBody: {
    marginTop: '30px'
  }
});

export default useStyles;