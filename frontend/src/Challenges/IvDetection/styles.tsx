import { makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles({
  chatContainer: {
    border: '1px solid ' + red[400],


  },
  chatTitle: {
    display: 'flex',
    borderBottom: '1px solid #DDD',

    padding: '20px',
    backgroundColor: red[400],
    color: '#FFF'

  },
  chatInput: {
    padding: '20px',
    display: 'flex',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: `50px`,
      },
    },
  },
  messageContainer: {
    height: '500px',
    overflow: 'scroll',
    overflowX: 'hidden',
    padding: '20px',

    '&::-webkit-scrollbar': {
      width: '7px'
    },
    '&::-webkit-scrollbar-track': {
      background: '#ddd'
    },
    '&::-webkit-scrollbar-thumb': {
      background: red[400]
    }
  },
  lockIcon: {
    color: 'white'
  },
  participantName: {
    marginTop: '10px',
    paddingLeft: '10px'
  },
  messageRight: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  messageAuthorImg: {
    paddingTop: '5px'
  },
  messageLeft: {
    display: 'flex'
  },
  messageContent: {
    paddingLeft: '10px'
  },
  participantNameMessage: {
    color: '#AAA',
    paddingLeft: '5px',
  },
  messageChip: {
    paddingBottom: '10px'
  },
  ownMessage: {
    backgroundColor: red[400],
    color: '#FFF'
  },
  receivedMessage: {
    backgroundColor: '#e0e0e0',
    color: '#000'
  },
  auhtorImg: {
    borderRadius: '200px'
  }
});

export default useStyles;