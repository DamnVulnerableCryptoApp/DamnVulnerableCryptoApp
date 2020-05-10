import { Box, Button, Container, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { IChallengeProps } from "../../Challenge/IChallengeProps";
import { ByteAtATimeService } from "./ByteAtATimeService";
import useStyles from "./styles";

const ByteAtATime = (props: IChallengeProps) => {
  const classes = useStyles();
  const [hasPermission, setHasPermission] = useState(false);
  const [token, setToken] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const onAdminPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setAdminPassword(e.target.value);

  const submitAdminPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
    ByteAtATimeService.adminLogin(adminPassword).then(res => {
      props.setFlag(res.flag);
    });
  };


  useEffect(() => {

    ByteAtATimeService.askPermission().then(response => {
      setHasPermission(response.granted);
      setToken(response.token);
    });
  }, []);



  const notAllowed = (
    <Box>
      <Typography>You're not allowed here</Typography>
    </Box>
  );

  const content = (
    <Box>
      <Box textAlign="center">
        <Typography variant="h3">Hi there...</Typography>
        <Typography>The admin accepted your request to access this page, and delegated you a token to access it... there is not much here though...</Typography>
      </Box>

      <Container maxWidth="sm">
        <Typography>Provide the admin password to move forward</Typography>
        <form noValidate autoComplete="off" onSubmit={submitAdminPassword}>
          <TextField type="password" id="admin-password" label="Admin Password" fullWidth onChange={onAdminPasswordChange} />
          <Button variant="contained" color="primary" type="submit">Send</Button>
        </form>
      </Container>
    </Box>
  );

  return (
    <Box>{hasPermission ? content : notAllowed}</Box>
  );
};

export default ByteAtATime;