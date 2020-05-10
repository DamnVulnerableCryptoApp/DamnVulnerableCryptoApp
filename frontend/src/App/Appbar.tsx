import { AppBar, Box, IconButton, Toolbar } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import React from 'react';
import { useHistory } from 'react-router';
import LogoMenu from '../Images/logo_menu.png';
import Progress from './Progress';
import useStyles from './styles';

const Appbar = () => {
  const classes = useStyles();
  const history = useHistory();

  const onMenuButtomClicked = () => {
    history.push("/");
  };

  return (
    <AppBar position="sticky" className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <Box className={classes.menuLeft}>
          <IconButton edge="start" onClick={onMenuButtomClicked} className={classes.menuButton} color="inherit" aria-label="menu">
            <DashboardIcon />
          </IconButton>
          <img className={classes.menuLogo} src={LogoMenu} />
        </Box>
        <Progress />
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;