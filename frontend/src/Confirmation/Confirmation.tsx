import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import React from "react";
import IConfirmationProps from "./IConfirmationProps";
import useStyles from "./styles";



const Confirmation = (props: IConfirmationProps) => {
  const classes = useStyles();

  return (
    <div>
      <Dialog open={props.isOpen} onClose={props.onClose}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{props.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onNegativeButtonClick} className={classes.successButton}>
            {props.negativeButton}
          </Button>
          <Button onClick={props.onPositiveButtonClick} color="secondary" autoFocus>
            {props.positiveButton}
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
};


export default Confirmation;