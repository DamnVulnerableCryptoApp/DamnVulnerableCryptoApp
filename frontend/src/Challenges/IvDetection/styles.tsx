import { makeStyles } from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";

const useStyles = makeStyles({
  chatContainer: {
    border: '1px solid ' + indigo[500],

  },
  chatTitle: {
    display: 'flex',
    borderBottom: '1px solid #DDD',

    padding: '20px',
    backgroundColor: indigo[500],
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
      background: indigo[500]
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
  }
});

export default useStyles;