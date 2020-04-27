import { makeStyles } from "@material-ui/core";
import oldPaper from "../Images/oldPaper.jpg";

const useStyles = makeStyles({

  paper: {

    backgroundImage: `url(${oldPaper})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    padding: '50px',
    fontFamily: "'Tangerine', cursive",
    fontSize: '50px'
  },
  formContainer: {
    marginTop: '50px',
  },
  inputContainer: {
    display: 'flex',
  },
  input: {
    paddingLeft: '10px'
  }
});

export default useStyles;