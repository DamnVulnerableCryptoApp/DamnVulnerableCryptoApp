import { makeStyles } from "@material-ui/core"
import { brown, grey } from "@material-ui/core/colors"

const useStyles = makeStyles({
  iconSize: {
    fontSize: '400px'
  },
  header: {
    backgroundColor: brown[500],
    color: "#FFF",
    padding: '30px',
    borderRadius: '4px'
  },
  data: {
    wordBreak: "break-all",
    fontFamily: '"Courier New", Courier, monospace'
  },
  alert: {
    marginTop: '30px'
  },
  dataContainer: {
    backgroundColor: grey[100],
    padding: '20px',
    border: '1px solid ' + grey[200],
    marginTop: '20px'
  }

})

export default useStyles