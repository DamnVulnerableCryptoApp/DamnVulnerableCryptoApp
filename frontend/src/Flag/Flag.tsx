import { Card, CardContent, IconButton, makeStyles, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import amber from '@material-ui/core/colors/amber';
import grey from '@material-ui/core/colors/grey';
import FlagIcon from '@material-ui/icons/Flag';
import ReplayIcon from '@material-ui/icons/Replay';
import React from "react";

interface FlagProps {
  flag?: string;
  resetChallenge: () => void;
}


const useStyles = makeStyles({
  root: {
    display: 'flex',
    'margin-bottom': '50px'
  },
});


const Flag = (props: FlagProps) => {
  const classes = useStyles();


  let cardColor, cardTitle, cardDesc, fontColor, flagColor, refreshColor;

  if (props.flag) {
    cardColor = green[400];
    cardTitle = "Well Done";
    cardDesc = "Seems like you completed this challenge.";
    fontColor = "#FFF";
    flagColor = amber[500];
    refreshColor = 'white';


  }
  else {
    cardColor = grey[200];
    cardTitle = "Find The Flag";
    cardDesc = "Solve the crypto challenge to get the flag";
    fontColor = grey[400];
    flagColor = fontColor;
    refreshColor = grey[400];
  }



  return (
    <Card className={classes.root} style={{ backgroundColor: cardColor }}>
      <FlagIcon style={{ fontSize: 150, color: flagColor }} />
      <CardContent style={{ color: fontColor, width: '100%' }}>

        <IconButton onClick={props.resetChallenge} disabled={!props.flag} style={{ float: 'right', marginTop: '-10px', color: refreshColor }} aria-label="Reset Challenge" component="span">
          <ReplayIcon />
        </IconButton>

        <Typography gutterBottom variant="h5" component="h2">{cardTitle}</Typography>
        <Typography variant="subtitle1">
          {cardDesc}
        </Typography>

        <Typography variant="overline" display="block" gutterBottom >
          flag: {props.flag || "Not found yet"}
        </Typography>
      </CardContent>
    </Card>);
};

export default Flag;