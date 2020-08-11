import { Box, Container, Link, Typography } from "@material-ui/core";
import PowerIcon from '@material-ui/icons/Power';
import React, { useContext, useState } from "react";
import { LayoutContext } from "../../App/LayoutContext";
import { IChallengeProps } from "../../Challenge/IChallengeProps";
import ForgotPasswordModal from "./ForgotPasswordModal";
import useStyles, { WhiteOutlinedButton as WhiteButton, WhiteTextField } from "./styles";
import { TimingAttackService } from "./TimingAttackService";

const TimingAttack = (props: IChallengeProps) => {

  const layoutContext = useContext(LayoutContext);
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const { setLoading } = layoutContext;
  const { setFlag } = props;

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const onForgotPasswordPressed = () => setModalOpen(true);

  const onLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);
    setLoginMessage("");

    TimingAttackService.login({ username, password }).then(r => {
      if (!r.success) setLoginMessage("Username of password incorrect");

      setLoading(false);
    });
  };


  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Box className={classes.bg} id="timing-attack-container">
        <ForgotPasswordModal isOpen={modalOpen} setIsOpen={setModalOpen} setFlag={setFlag} />
        <Container maxWidth="xs" className={classes.container}>
          <Box pt={5} pb={5}>
            <Box className={classes.titleContainer}>
              <Typography variant="h4">Login</Typography>
            </Box>

            <form noValidate autoComplete="off" onSubmit={onLogin}>
              <Box textAlign="center">
                <PowerIcon className={classes.logo} />
              </Box>

              <Box pb={2}>
                <WhiteTextField fullWidth label="Username" value={username} onChange={onUsernameChange} autoFocus />
              </Box>

              <Box pb={2}>
                <WhiteTextField fullWidth label="Password" value={password} onChange={onPasswordChange} type="password" />
              </Box>

              <Box pb={2} textAlign="right">
                <Link style={{ color: 'white' }} onClick={onForgotPasswordPressed}>Forgot password?</Link>
              </Box>

              <Box className={classes.loginMessage}>
                <Typography color="secondary">{loginMessage}</Typography>
              </Box>

              <Box className={classes.loginButtonContainer}>
                <WhiteButton variant="outlined" type="submit">Login</WhiteButton>
              </Box>
            </form>
          </Box>
        </Container>
      </Box>
    </>);
};

export default TimingAttack;