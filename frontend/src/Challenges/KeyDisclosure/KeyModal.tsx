import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@material-ui/core"
import React, { useContext } from "react"
import { LayoutContext } from "../../App/LayoutContext"
import { IEmail, KeyDisclosureService } from "./KeyDisclosureService"
import useStyles from "./styles"

interface IModalProps {
  inboxUnlocked: boolean
  mailboxKey: string
  setMailboxKey: (s: string) => void
  setInboxUnlocked: (b: boolean) => void
  setSelectedEmail: (m: IEmail) => void
  setEmails: (emails: IEmail[]) => void
  setFlag: (f: string) => void

}



const KeyModal = (props: IModalProps) => {

  const layoutContext = useContext(LayoutContext)
  const classes = useStyles()

  const onLoginClicked = () => {
    layoutContext.setLoading(true)

    KeyDisclosureService.unlockMailbox(props.mailboxKey).then(res => {
      layoutContext.setLoading(false)
      if (res.success) {
        props.setFlag(res.flag)
        props.setInboxUnlocked(true)
        props.setEmails(res.emails)
        props.setSelectedEmail(res.emails[0])
      }
    }).catch(() => layoutContext.setLoading(false))
  }

  const onMailboxChange = (e: React.ChangeEvent<HTMLInputElement>) => props.setMailboxKey(e.target.value)
  const getContainer = () => document.getElementById('key-disclosure-container')



  return (
    <Dialog open={!props.inboxUnlocked} container={getContainer} style={{ position: 'absolute' }} BackdropProps={{ style: { position: 'absolute' } }}>
      <DialogTitle id="simple-dialog-title">Unlock admin@fakecryptomail.com mailbox</DialogTitle>
      <DialogContent>
        <Box display={props.inboxUnlocked ? "none" : "block"}>
          <Typography>Add your private key to decrypt your inbox</Typography>

          <Box mt={2} mb={3}>
            <TextField placeholder="Private Key" fullWidth multiline rows={8} variant="outlined" onChange={onMailboxChange} />
          </Box>

          <Box textAlign="right">
            <Button variant="contained" className={classes.btn} onClick={onLoginClicked}>Decrypt</Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog >
  )
}


export default KeyModal
