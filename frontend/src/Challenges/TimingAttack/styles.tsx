import { Button, makeStyles, TextField, withStyles } from "@material-ui/core"
import { teal } from "@material-ui/core/colors"

const useStyles = makeStyles({
  bg: {
    backgroundColor: teal[600],
    padding: '70px',
    position: 'relative'

  },
  container: {
    backgroundColor: teal[500],
    color: 'white',
    minHeight: '600px',
    borderRadius: '5px',
    border: '1px solid ' + teal[400]
  },
  titleContainer: {
    marginBottom: '50px',
    textAlign: 'center',
  },
  loginButtonContainer: {
    textAlign: 'center'
  },
  logo: {
    fontSize: '100px',
    border: '3px solid white',
    padding: '20px',
    borderRadius: '200px'
  },
  loginMessage: {
    textAlign: "center",
    height: '50px'
  }
})

export const WhiteOutlinedButton = withStyles({
  root: {
    borderColor: 'white',
    color: 'white'
  }
})(Button)

export const WhiteTextField = withStyles({
  root: {
    '& .MuiInputBase-input': {
      color: 'white',
    },
    '& .MuiInputBase-input.Mui-disabled': {
      color: '#999'
    },
    '& label': {
      color: '#DDD'
    },
    '& label.Mui-focused, & .MuiFormLabel-root.Mui-disabled': {
      color: 'white',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'white',
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: 'white'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      borderBottomColor: 'white',
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  },
})(TextField)

export default useStyles