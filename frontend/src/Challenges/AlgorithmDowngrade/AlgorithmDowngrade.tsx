import { Box, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../App/LayoutContext";
import { IChallengeProps } from "../../Challenge/IChallengeProps";
import { AlgorithmDowngradeService, IPaste } from "./AlgorithmDowngradeService";
import useStyles from "./styles";







const AlgorithmDowngrade = (props: IChallengeProps) => {
  const classes = useStyles();
  const layoutContext = useContext(LayoutContext);
  const [pastes, setPastes] = useState<IPaste[]>([]);

  useEffect(() => {
    layoutContext.setLoading(true);

    AlgorithmDowngradeService.initAsAnonymous().then(() =>
      AlgorithmDowngradeService.getPastes().then((res) => {
        setPastes(res);
        res.forEach(p => {
          props.setFlag(p.content); // check if the content of the paste is the flag.
        })

      }).catch(
        err => layoutContext.setSnackErrorMessage("Error retrieving pastes")
      )
    ).catch(() => layoutContext.setSnackErrorMessage("Error creating anonymous session")
    ).finally(() => layoutContext.setLoading(false));


  }, []);



  return (
    <Box>
      <Typography variant="h5">PasteBox</Typography>
      {
        pastes.map((p, i) => {
          return (
            <Box key={i}>
              <Typography><strong>{p.author}</strong></Typography>
              <pre ><code>{p.content}</code></pre>
              <hr />
            </Box>
          );
        })
      }
    </Box>
  );
};

export default AlgorithmDowngrade;