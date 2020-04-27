import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import React, { useEffect, useState } from "react";
import { IChallengeProps } from "../Challenge/IChallengeProps";
import { KeyDisclosureService } from "./KeyDisclosureService";
import useStyles from "./styles";




const KeyDisclosure = (props: IChallengeProps) => {

  const classes = useStyles();
  const [license, setLicense] = useState("");


  const downloadLicense = () => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(license));
    element.setAttribute('download', "license.dvca.license");
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

  };


  useEffect(() => {
    KeyDisclosureService.getLicense().then((_license) => {
      setLicense(_license);
    });
  }, []);

  return (
    <div>
      <Box>
        <Grid container spacing={2}>
          <Grid item md={4} className={classes.downloadSection}>
            <Box className={classes.downloadSectionBox}>
              <Typography gutterBottom variant="h4">Your license is ready</Typography>

              <Box>
                <CloudDownloadIcon onClick={downloadLicense} className={classes.downloadIcon} />
              </Box>
              <Typography>Click on the icon to download</Typography>
            </Box>
          </Grid>
          <Grid item md={8}>
            <Box className={classes.infoBox}>
              <Typography>You can now install the generated license on the customers's server</Typography>
              <Typography>You can also check the data regarding any emited license by supplying the magic field preset in the license</Typography>
              <TextField id="outlined-secondary" fullWidth label="Magic" variant="outlined" color="secondary" />
              <Button variant="contained" color="primary">Check License</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>




    </div>
  );
};

export default KeyDisclosure;