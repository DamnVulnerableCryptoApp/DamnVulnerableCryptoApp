import { createStyles, makeStyles, Theme } from "@material-ui/core";

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

    menuLeft: {
      display: 'flex',
      flexFlow: "flex-direction",
    },
    menuLogo: {
      height: '30px',
      marginTop: '9px',
      cursor: 'pointer'
    },
    docsLink: {
      color: '#FFF',
      textDecoration: 'none',
      fontSize: '1rem',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      lineHeight: '43px',
      letterSpacing: '0.00938em',
      paddingRight: '20px'
    }

  }),
);

export default useStyles;