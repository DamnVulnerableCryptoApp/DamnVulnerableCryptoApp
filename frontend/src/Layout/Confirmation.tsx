import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import React from "react";


interface IConfirmationProps {
  title: string;
  message: string;
  positiveButton: string;
  negativeButton: string;
  onPositiveButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onNegativeButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClose: () => void;
  isOpen: boolean;
}

const useStyles = makeStyles({
  successButton: { color: green[500] }
});


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