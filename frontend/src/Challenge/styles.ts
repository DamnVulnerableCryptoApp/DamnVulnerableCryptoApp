import { makeStyles } from "@material-ui/core";
import { amber } from "@material-ui/core/colors";

const useStyles = makeStyles({
  sidebarCard: {
    'margin-bottom': '20px',
    padding: '30px'
  },

  mainContainer: {
    padding: '30px'
  },

  title: {
    marginBottom: '20px',
    textAlign: 'center'
  },
  documentationTitle: {
    padding: '20px',
    textAlign: 'left'
  },
  documentation: {
    padding: '30px',
    paddingTop: '60px',
    paddingBottom: '60px',
    textAlign: 'center'
  },

  warningTitle: {
    padding: '20px',
    textAlign: 'left',
    backgroundColor: amber[500]
  },
  warning: {
    padding: '30px',
    paddingTop: '60px',
    paddingBottom: '60px',
    textAlign: 'center',
    marginBottom: '50px'
  }
});

export default useStyles;