import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid, Paper, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../App/LayoutContext";
import { ProgressService } from "../App/ProgressService";
import Flag from "../Flag/Flag";
import { IChallengeContainerProps } from "./IChallengeContainerProps";
import useStyles from "./styles";


const validFlag = (flag: string) => flag && flag.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/);


const Challenge = (props: IChallengeContainerProps) => {

  const [flag, _setFlag] = useState("");
  const { setChallengesDone } = useContext(LayoutContext);

  const challengeData = props.obj || { description: "", explanation: "", name: "", objective: "", url: "" };
  const Component = props.obj.component;


  const setFlag = (flg: string) => {

    if (validFlag(flg)) {
      _setFlag(flg);

      // otherwise will clean an already finished challenge and we do not whant that.
      if (flg) ProgressService.updateProgress(props.obj.url, flg);
    }
    else {
      _setFlag("");
      ProgressService.updateProgress(props.obj.url, "");
    }

    setChallengesDone(ProgressService.done());
  };

  const resetChallange = () => {
    setFlag("");
  };


  useEffect(() => {
    const f = ProgressService.getFoundFlag(props.obj.url);
    setFlag(f);
  }, []);


  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item md={8}>

        <Paper className={classes.mainContainer}>
          <Typography variant="h4" gutterBottom className={classes.title}> {challengeData.name}</Typography>
          <Flag flag={flag} resetChallenge={resetChallange} />
          <Component flag={flag} setFlag={setFlag} />
        </Paper>
      </Grid>
      <Grid item md={4}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography variant="h6">About {challengeData.name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails><Typography>{challengeData.explanation}</Typography></ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography variant="h6">Help</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails><Typography>{challengeData.objective}</Typography></ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </Grid>
  );
};


export default Challenge;