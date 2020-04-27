import { AppBar, Box, IconButton, LinearProgress, Toolbar, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import DashboardIcon from '@material-ui/icons/Dashboard';
import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Challenge from "../Challenge/Challenge";
import Challenges, { ChallengeData } from "../Challenge/Challenges";
import Dashboard from "../dashboard/Dashboard";
import LogoMenu from '../Images/logo_menu.png';
import { LayoutContext } from "./LayoutContext";
import { ProgressService } from "./ProgressService";
import useStyles from "./styles";

const App = () => {

  const classes = useStyles();

  const p = ProgressService.createOrGet();

  const [progress, setProgress] = useState(p);
  const [challengesDone, setChallengesDone] = useState(ProgressService.done());
  const [progressPercentage, setProgressPercentage] = useState(ProgressService.donePercentage());


  const layoutInitialState = {
    progress, setProgress,
    progressPercentage, setProgressPercentage,
    challengesDone, setChallengesDone,
  };



  const renderChallenge = (c: ChallengeData) => {
    return () => <Challenge obj={c} />;
  };

  return (
    <div className="App">
      <LayoutContext.Provider value={layoutInitialState}>
        <AppBar position="sticky" className={classes.appbar}>
          <Toolbar className={classes.toolbar}>
            <Box className={classes.menuLeft}>
              <IconButton edge="start" href={"/"} className={classes.menuButton} color="inherit" aria-label="menu">
                <DashboardIcon />
              </IconButton>
              <img className={classes.menuLogo} src={LogoMenu} />
            </Box>
            <Box className={classes.progressBox}>
              <Box><Typography>Your Progress: {challengesDone}</Typography></Box>
              <LinearProgress variant="determinate" color="secondary" value={progressPercentage} className={classes.progress} />
              <Box><Typography>{Challenges.length}</Typography> </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Container fixed>
          <Router>
            {
              Challenges.map((c) => {
                return (
                  <Route key={c.name} path={c.url} render={renderChallenge(c)} />
                );
              })
            }
            <Route exact path="/"><Dashboard /></Route>
          </Router>
        </Container>
      </LayoutContext.Provider>
    </div >
  );
};

export default App;
