import { Box } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Appbar from "../Appbar/Appbar";
import Challenge from "../Challenge/Challenge";
import Challenges, { ChallengeData } from "../Challenges/Challenges";
import Dashboard from "../Dashboard/Dashboard";
import Documentation from "../Documentation/Documentation";
import { ProgressService } from "../Progress/ProgressService";
import { LayoutContext } from "./LayoutContext";


const App = () => {


  const p = ProgressService.createOrGet();

  const [progress, setProgress] = useState(p);
  const [challengesDone, setChallengesDone] = useState(ProgressService.done());
  const [progressPercentage, setProgressPercentage] = useState(ProgressService.donePercentage());
  const [loading, setLoading] = useState(false);

  const layoutInitialState = {
    progress, setProgress,
    progressPercentage, setProgressPercentage,
    challengesDone, setChallengesDone,
    loading, setLoading
  };

  const renderChallenge = (c: ChallengeData) => {
    return () => <Challenge obj={c} />;
  };


  return (
    <div className="App">
      <Router>
        <LayoutContext.Provider value={layoutInitialState}>
          <Appbar />
          <Container fixed>
            {
              Challenges.map((c) => {
                return (
                  <Box key={c.name}>
                    <Route path={c.url} render={renderChallenge(c)} exact={true} />
                  </Box>
                );
              })
            }
            <Route exact path="/"><Dashboard /></Route>
            <Route exact path="/docs/:topic" component={Documentation} />
          </Container>
        </LayoutContext.Provider>
      </Router>

    </div >
  );
};

export default App;
