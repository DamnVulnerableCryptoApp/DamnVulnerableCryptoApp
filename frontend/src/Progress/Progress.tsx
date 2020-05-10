
import { Box, IconButton, LinearProgress, Typography } from "@material-ui/core";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import React, { useContext, useState } from "react";
import { LayoutContext } from "../App/LayoutContext";
import Challenges from "../Challenge/Challenges";
import Confirmation from "../Common/Confirmation";
import { ProgressService } from "./ProgressService";
import useStyles from "./styles";

const Progress = () => {

  const context = useContext(LayoutContext);
  const classes = useStyles();

  const [showResetConfirmation, setShowResetConfirmation] = useState(false);

  const onResetClicked = () => {
    setShowResetConfirmation(true);
  };

  const onConfirmationCancel = () => { setShowResetConfirmation(false); };
  const onConfirmationClose = () => { setShowResetConfirmation(false); };
  const onConfirmationOk = () => {
    context.setProgress({ challenges: {} });
    context.setChallengesDone(0);
    context.setProgressPercentage(0);
    ProgressService.clearProgress();
    setShowResetConfirmation(false);

  };

  return (
    <Box className={classes.progressContainer}>
      <Box className={classes.progressBox}>
        <Box><Typography>Your Progress: {context.challengesDone}</Typography></Box>
        <LinearProgress variant="determinate" color="secondary" value={context.progressPercentage} className={classes.progress} />
        <Box><Typography>{Challenges.length}</Typography> </Box>
      </Box>
      <Box>
        <IconButton className={classes.resetButton} aria-label="delete" title="Reset all progress" onClick={onResetClicked}>
          <RotateLeftIcon />
        </IconButton>
      </Box>

      <Confirmation
        title="Reset All Progress"
        isOpen={showResetConfirmation}
        message="Are you sure you want to proceed? All progress will be lost"
        negativeButton="Cancel"
        onClose={onConfirmationClose}
        onNegativeButtonClick={onConfirmationCancel}
        onPositiveButtonClick={onConfirmationOk}
        positiveButton="Sure!" />
    </Box>
  );
};

export default Progress;