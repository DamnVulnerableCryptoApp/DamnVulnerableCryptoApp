import { Box, Button, Container, TextField, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../App/LayoutContext";
import { IChallengeProps } from "../../Challenge/IChallengeProps";
import { ByteAtATimeService } from "./ByteAtATimeService";

const ByteAtATime = (props: IChallengeProps) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [token, setToken] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const layoutContext = useContext(LayoutContext);


  const onAdminPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setAdminPassword(e.target.value);

  const submitAdminPassword = (event: React.SyntheticEvent) => {

    event.preventDefault();
    layoutContext.setLoading(true);

    ByteAtATimeService.adminLogin(adminPassword).then(res => {
      props.setFlag(res.flag);
      layoutContext.setLoading(false);
    }).catch(() => layoutContext.setLoading(false));
  };


  useEffect(() => {
    layoutContext.setLoading(true);

    ByteAtATimeService.askPermission().then(response => {
      setHasPermission(response.granted);
      setToken(response.token);
      layoutContext.setLoading(false);
    }).catch(() => layoutContext.setLoading(false));
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