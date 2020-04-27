import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    toolbar: {
      display: 'flex',
      'justify-content': "space-between",
    },
    appbar: {
      'margin-bottom': '40px'
    },
    progressBox: {

      display: 'flex',
      flexFlow: "flex-direction",
    },
    progress: {
      width: '200px',
      marginTop: '10px',
      marginLeft: '5px',
      marginRight: '5px',
    },
    menuLeft: {
      display: 'flex',
      flexFlow: "flex-direction",
    },
    menuLogo: {
      height: '30px',
      marginTop: '9px'
    }

  }),
);

export default useStyles;