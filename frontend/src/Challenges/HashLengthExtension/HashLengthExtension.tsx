import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../App/LayoutContext";
import { IChallengeProps } from "../../Challenge/IChallengeProps";
import useStyles from "./styles";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { Box, Typography } from "@material-ui/core";
import { HashLengthExtensionService } from "./HashLengthExtensionService";
import { Alert, AlertProps, Color } from "@material-ui/lab";

const HashLengthExtension = (props: IChallengeProps) => {

  const layoutContext = useContext(LayoutContext);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<Color>("success");
  const [data, setData] = useState("");

  useEffect(() => {
    layoutContext.setLoading(true);

    const authData = HashLengthExtensionService.getData();
    authData.then(d => {
      setData(d.data);

      HashLengthExtensionService.check(d).then(f => {
        props.setFlag(f.flag);
        layoutContext.setLoading(false);

        if (f.tampered) {
          setMessage("DamnVulnerableCryptoApp sadly informs you that the data was manipulated");
          setSeverity("error");
        }
        else {
          setMessage("DamnVulnerableCryptoApp certifies that the data was not tampered");
          setSeverity("success");
        }

      }).catch(err => {
        layoutContext.setSnackErrorMessage("Some error message");
        layoutContext.setLoading(false);
      });
    }).catch(err => {
      layoutContext.setSnackErrorMessage("Some error message");
      layoutContext.setLoading(false);
    });


  }, []);


  const classes = useStyles();

  return (
    <Box >
      <Box className={classes.header} textAlign="center">
        <AccountBalanceIcon className={classes.iconSize} />
        <Typography variant="h2">Integrity Checker</Typography>
      </Box>

      <Alert severity={severity} className={classes.alert}>
        {message}
      </Alert>


      <Box className={classes.dataContainer}>
        <Typography>Your Data:</Typography>
        <Typography className={classes.data}>{data}</Typography>
      </Box>
    </Box>
  );
};

export default HashLengthExtension;