import { Button, Grid, Paper, Typography } from "@material-ui/core";
import DescriptionIcon from '@material-ui/icons/Description';
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { LayoutContext } from "../App/LayoutContext";
import { ProgressService } from "../App/ProgressService";
import Flag from "../Flag/Flag";
import { IChallengeContainerProps } from "./IChallengeContainerProps";
import useStyles from "./styles";

const validFlag = (flag: string) => flag && flag.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/);


const Challenge = (props: IChallengeContainerProps) => {

  const [flag, _setFlag] = useState("");
  const { setChallengesDone } = useContext(LayoutContext);
  const history = useHistory();

  const challengeData = props.obj || { description: "", explanation: "", name: "", objective: "", url: "" };
  const Component = props.obj.component;


  const setFlag = (flg: string) => {
    if (validFlag(flg)) {
      _setFlag(flg);
      ProgressService.updateProgress(props.obj.url, flg);
    }

    setChallengesDone(ProgressService.done());
  };

  const resetChallenge = () => {
    _setFlag("");
    ProgressService.updateProgress(props.obj.url, "");
    setChallengesDone(ProgressService.done());
  };

  const onGoToDocsClicked = (path: string) => {
    return () => history.push(path);
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
          <Component flag={flag} setFlag={setFlag} />
        </Paper>
      </Grid>
      <Grid item md={4}>
        <Flag flag={flag} resetChallenge={resetChallenge} />
        <Paper className={classes.documentation}>
          <Typography variant="h6">Documentation</Typography>
          <DescriptionIcon style={{ fontSize: 200, color: '#EEE' }} />
          <Typography>If you are having trouble with this challenge take a look at our documentation</Typography>
          <Button size="small" fullWidth variant="contained" color="primary" onClick={onGoToDocsClicked("docs" + props.obj.url)}>Docs</Button>
        </Paper>
      </Grid>
    </Grid>
  );
};


export default Challenge;