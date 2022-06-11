import { makeStyles } from "@material-ui/core"
import { blueGrey } from "@material-ui/core/colors"

const useStyles = makeStyles({
  buttonContainer: {
    'padding-top': '20px',
    'padding-bottom': '50px',
    'text-align': 'right'
  },
  lockIcon: {
    'font-size': '100px',
    color: blueGrey[500]
  }
})

export default useStyles