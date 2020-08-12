import { makeStyles } from "@material-ui/core";
import deepPurple from '@material-ui/core/colors/deepPurple';

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
    backgroundColor: deepPurple[500],
  },
  emailBody: {
    marginTop: '30px'
  },
  btn: {
    backgroundColor: deepPurple[500],
    color: '#FFF'
  }
});

export default useStyles;