import ChallengeCard from '../ChallengeCard/ChallengeCard';
import Challenges from '../Challenges/Challenges';
import { ProgressService } from '../Progress/ProgressService';
import Logo from './../Images/logo.png';
import { Box } from './node_modules/@material-ui/core';
import Grid from './node_modules/@material-ui/core/Grid';
import React from './node_modules/react';
import useStyles from './styles';

const Dashboard = () => {
  const classes = useStyles();

  return (

    <div>
      <Box className={classes.logoContainer} >
        <img className={classes.logo} src={Logo} />
      </Box>
      <Grid container spacing={5} className={classes.root}>
        {Challenges.map((challenge, i) => {
          const done = ProgressService.getFoundFlag(challenge.url) ? true : false;

          return (<Grid item key={i} xs={6} md={4} lg={3}>
            <ChallengeCard index={i} challenge={challenge} done={done} />
          </Grid>);
        })}
      </Grid>
    </div>
  );

};


export default Dashboard;