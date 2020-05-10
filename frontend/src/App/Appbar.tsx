import { AppBar, Box, IconButton, Toolbar } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React from 'react';
import { useHistory } from 'react-router';
import LogoMenu from '../Images/logo_menu.png';
import Progress from '../Progress/Progress';
import useStyles from './styles';

const Appbar = () => {
  const classes = useStyles();
  const history = useHistory();

  const onLogoClicked = () => {
    history.push("/");
  };

  const onBackClicked = () => {
    history.goBack();
  };

  const isHomePage = () => {
    return history.location.pathname === "/";
  };



  return (
    <AppBar position="sticky" className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <Box className={classes.menuLeft}>
          <IconButton edge="start" disabled={isHomePage()} className={classes.menuButton} onClick={onBackClicked} color="inherit" aria-label="menu">
            <ArrowBackIcon />
          </IconButton>
          <img className={classes.menuLogo} src={LogoMenu} onClick={onLogoClicked} />
        </Box>
        <Progress />
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;