import { AppBar, Box, Grid, Paper, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { LayoutContext } from "../App/LayoutContext";
import Flag from "../Flag/Flag";
import { ProgressService } from "../Progress/ProgressService";
import { IChallengeContainerProps } from "./IChallengeContainerProps";
import useStyles from "./styles";

const validFlag = (flag: string) => flag && flag.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/);


const Challenge = (props: IChallengeContainerProps) => {

  const [flag, _setFlag] = useState("");
  const [warning, setWarning] = useState("");
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

  const displayWarning = () => {
    return (
      <Box>
        <AppBar position="static" className={classes.warningTitle}>
          <Typography variant="h6">Warning</Typography>
        </AppBar>
        <Paper role="tabpanel" className={classes.warning}>
          {warning.split("\n").map((l, i) => <Typography key={i}>{l}</Typography>)}
        </Paper>
      </Box>
    );
  }

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
          <Component flag={flag} setFlag={setFlag} setWarning={setWarning} />
        </Paper>
      </Grid>
      <Grid item md={4}>
        <Flag flag={flag} resetChallenge={resetChallenge} />

        {warning ? displayWarning() : ""}

        <AppBar position="static" className={classes.documentationTitle}>
          <Typography variant="h6">Docs</Typography>
        </AppBar>
        <Paper role="tabpanel" className={classes.documentation}>
          <Typography>If you are having trouble with this challenge take a look at our documentation <Link to={"docs" + props.obj.url}>here</Link> </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};


export default Challenge;