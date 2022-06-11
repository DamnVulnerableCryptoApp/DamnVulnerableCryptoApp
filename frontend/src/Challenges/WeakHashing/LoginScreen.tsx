import { Box, Button, Card, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@material-ui/core'
import PublicIcon from '@material-ui/icons/Public'
import Alert from '@material-ui/lab/Alert'
import React, { useContext, useState } from 'react'
import { LayoutContext } from '../../App/LayoutContext'
import { IChallengeProps } from '../../Challenge/IChallengeProps'
import useStyles from './styles'
import { WeakHashingService } from './WeakHashingService'


const LoginScreen = (props: IChallengeProps) => {

  const classes = useStyles()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [failedLogin, setFailedLogin] = useState(false)
  const layoutContext = useContext(LayoutContext)

  let loginError
  if (failedLogin)
    loginError = <Alert severity="error" >Failed to login</Alert>


  const doLogin = (user: string, pass: string) => {
    layoutContext.setLoading(true)

    WeakHashingService.login(user, pass).then((res) => {
      if (res.flag) {
        props.setFlag(res.flag)
        setFailedLogin(false)
        window.scrollTo(0, 200)
      }
      else
        setFailedLogin(true)

      layoutContext.setLoading(false)
    }).catch(() => layoutContext.setLoading(false))
  }

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  const onLoginButtonPressed = () => doLogin(username, password)

  return (

    <Box className={classes.container} p={10} pt={5}>
      <Typography variant="h4" className={classes.title} gutterBottom>FakeAndInsecureWebsite</Typography>
      <Box pt={2}>
        <Container maxWidth="sm">

          <Card raised={true}>
            <Box p={5}>
              <Box textAlign="center"><PublicIcon className={classes.siteLogo} /></Box>
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item md={true} sm={true} xs={true}>
                  <TextField id="username" label="Username" type="email" variant="filled" fullWidth required value={username} onChange={onUsernameChange} />
                </Grid>
              </Grid>
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item md={true} sm={true} xs={true}>
                  <TextField id="username" label="Password" type="password" variant="filled" fullWidth required value={password} onChange={onPasswordChange} />
                </Grid>
              </Grid>
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <FormControlLabel control={
                    <Checkbox color="primary" />
                  } label="Remember me" />
                </Grid>
              </Grid>
              <Grid container justify="center" style={{ marginTop: '10px' }}>
                <Button className={classes.loginButton} fullWidth onClick={onLoginButtonPressed} variant="outlined" >Login</Button>
              </Grid>

              <Box mt={5}>{loginError}</Box>
            </Box>
          </Card>
        </Container >
      </Box>
    </Box>

  )
}

export default LoginScreen