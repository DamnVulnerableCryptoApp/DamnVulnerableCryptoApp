import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  progressContainer: {
    'display': 'flex'
  },

  resetButton: {
    color: '#FFF',
    marginLeft: '5px'
  },
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

});

export default useStyles;