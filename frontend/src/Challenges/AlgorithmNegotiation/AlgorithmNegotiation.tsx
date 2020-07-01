import { Box, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../App/LayoutContext";
import { IChallengeProps } from "../../Challenge/IChallengeProps";
import faklerPastes from "../../Images/fakepastes.png";
import { AlgorithmNegotiationService, IPaste } from "./AlgorithmNegotiationService";
import useStyles from "./styles";







const AlgorithmNegotiation = (props: IChallengeProps) => {
  const classes = useStyles();
  const layoutContext = useContext(LayoutContext);
  const [pastes, setPastes] = useState<IPaste[]>([]);

  useEffect(() => {
    layoutContext.setLoading(true);

    AlgorithmNegotiationService.initAsAnonymous().then(() =>
      AlgorithmNegotiationService.getPastes().then((res) => {
        setPastes(res);
        res.forEach(p => {
          props.setFlag(p.content); // check if the content of the paste is the flag.
        });

      }).catch(
        err => layoutContext.setSnackErrorMessage("Error retrieving pastes")
      )
    ).catch(() => layoutContext.setSnackErrorMessage("Error creating anonymous session")
    ).finally(() => layoutContext.setLoading(false));


  }, []);



  return (
    <Box>
      <Box textAlign="center">
        <img src={faklerPastes} className={classes.logo} />
      </Box>
      <Typography variant="h5" className={classes.darkCyanText}>Latest public pastes</Typography>
      {
        pastes.map((p, i) => {
          return (
            <Box key={i} className={classes.paste}>
              <Typography ><strong>{p.author}</strong></Typography>
              <pre ><code>{p.content}</code></pre>
            </Box>
          );
        })
      }
    </Box>
  );
};

export default AlgorithmNegotiation;