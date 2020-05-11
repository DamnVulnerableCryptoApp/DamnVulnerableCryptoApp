import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  progressBox: {

    display: 'flex',
    flexFlow: "flex-direction",
    paddingTop: '10px'
  },
  progress: {
    width: '200px',
    marginTop: '10px',
    marginLeft: '5px',
    marginRight: '5px',
  },
  progressContainer: {
    'display': 'flex'
  },

  resetButton: {
    color: '#FFF',
    marginLeft: '5px'
  }
});

export default useStyles;