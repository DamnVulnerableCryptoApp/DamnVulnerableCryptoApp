import { makeStyles } from "@material-ui/core";
import indigo from '@material-ui/core/colors/indigo';

const useStyles = makeStyles({
  downloadSection: {
    'background-color': indigo[500],
    color: '#FFF',
  },
  downloadSectionBox: {
    padding: '20px',
    'text-align': 'center',
  },
  downloadIcon: {
    'font-size': "200px",
  },
  infoBox: {
    padding: '30px',
    'padding-top': '0px'
  }
});

export default useStyles;