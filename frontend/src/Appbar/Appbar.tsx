import { AppBar, Box, IconButton, Toolbar } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import React from 'react'
import { useHistory } from 'react-router'
import { Link } from "react-router-dom"
import LogoMenu from '../Images/logo_menu.png'
import Progress from '../Progress/Progress'
import Loading from './Loading'
import useStyles from './styles'

const Appbar = () => {
  const classes = useStyles()
  const history = useHistory()

  const onLogoClicked = () => {
    history.push("/")
  }

  const onBackClicked = () => {
    history.goBack()
  }

  const isHomePage = () => {
    return history.location.pathname === "/"
  }

  return (
    <AppBar position="sticky" className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <Box className={classes.menuLeft}>
          <IconButton edge="start" disabled={isHomePage()} onClick={onBackClicked} className={classes.menuButton} color="inherit" aria-label="menu">
            <ArrowBackIcon />
          </IconButton>
          <img className={classes.menuLogo} src={LogoMenu} onClick={onLogoClicked} alt="DamnVulnerableCryptoApp Logo" />
        </Box>
        <Box display="flex">
          <Link to={"/docs/crypto"} className={classes.docsLink}>Docs</Link>
          <Progress />
        </Box>
      </Toolbar>
      <Loading />
    </AppBar>
  )
}

export default Appbar