import { Box, Container, IconButton, Typography } from "@material-ui/core";
import RefreshIcon from '@material-ui/icons/Refresh';
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../App/LayoutContext";
import { IChallengeProps } from "../../Challenge/IChallengeProps";
import notAuthorizedImg from "../../Images/notauthorized.jpg";
import { PaddingOracleService } from "./PaddingOracleService";
import useStyles from "./styles";


const PaddingOracle = (props: IChallengeProps) => {

  const classes = useStyles();
  const [isAdmin, setIsAdmin] = useState(false);
  const layoutContext = useContext(LayoutContext);

  const checkPermissions = () => {
    layoutContext.setLoading(true);

    PaddingOracleService.isAdmin().then((res: any) => {
      setIsAdmin(res.isAdmin);
      props.setFlag(res.flag);
      layoutContext.setLoading(false);
    }).catch(() => layoutContext.setLoading(false));
  };


  useEffect(() => {
    layoutContext.setLoading(true);

    PaddingOracleService.init().then(() => {
      checkPermissions();
      layoutContext.setLoading(false);
    }).catch(() => layoutContext.setLoading(false));
  }, []);


  let notAuthorized;
  if (!isAdmin) notAuthorized = <img alt="You shall not pass" src={notAuthorizedImg} />;

  return (
    <div>
      <Container>
        <Box className={classes.imageContainer}>
          {notAuthorized}
        </Box>
        <Box textAlign={"center"}>
          <Typography variant="h5">Sorry, this page is for Admins only</Typography>
          <Typography variant="h5">You are not allowed here</Typography>
        </Box>
        <Box className={classes.permissionContainer}>
          <Typography>
            Check my permissions again
            <IconButton onClick={checkPermissions} color="primary" aria-label="delete">
              <RefreshIcon />
            </IconButton>
          </Typography>
        </Box>
      </Container>




    </div>
  );
};


export default PaddingOracle;