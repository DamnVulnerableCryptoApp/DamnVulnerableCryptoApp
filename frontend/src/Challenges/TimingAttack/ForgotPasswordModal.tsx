import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { TimingAttackService } from "./TimingAttackService";

interface IModalProps {
  isOpen: boolean;
  setIsOpen: (f: boolean) => void;
  setFlag: (f: string) => void;
}

const getContainer = () => document.getElementById('timing-attack-container');

const ForgotPasswordModal = (props: IModalProps) => {

  const [username, setUsername] = useState("");
  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const { isOpen, setIsOpen, setFlag } = props;


  const onModalClose = () => setIsOpen(false);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    TimingAttackService.forgotPassword(username).then(res => setFlag(res.flag));
    onModalClose();
  };


  return (
    <Dialog open={isOpen} container={getContainer} style={{ position: 'absolute' }} onClose={onModalClose} BackdropProps={{ style: { position: 'absolute' } }}>
      <DialogTitle >Forgot Password</DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          <Alert severity="info">
            Type your username here. If the username is valid an email will be sent to it. No other feedback will be given
          </Alert>

          <TextField fullWidth label="Username" value={username} onChange={onUsernameChange} autoFocus />

          <Box mt={3} textAlign="right">
            <Button variant="contained" color="primary" type="submit">Submit</Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;