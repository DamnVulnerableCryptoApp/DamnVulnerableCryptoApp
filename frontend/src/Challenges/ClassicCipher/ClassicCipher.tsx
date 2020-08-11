import { Box, IconButton, InputBase, Paper, Typography } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import Alert from "@material-ui/lab/Alert";
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../App/LayoutContext";
import { IChallengeProps } from "../../Challenge/IChallengeProps";
import { ClassicService } from "./ClassicService";
import useStyles from "./styles";




const ClassicCipher = (props: IChallengeProps) => {

  const classes = useStyles();
  const [answer, setAnswer] = useState("");
  const [enigma, setEnigma] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const layoutContext = useContext(LayoutContext);


  const checkAnswer = (event: React.SyntheticEvent) => {
    event.preventDefault();
    layoutContext.setLoading(true);
    setErrorMessage("");

    ClassicService.checkAnswer(answer).then(res => {
      const flag = res.flag;
      props.setFlag(flag);
      if (!res.success) setErrorMessage("Sorry, not quite there yet...");

      layoutContext.setLoading(false);

    }).catch(() => layoutContext.setLoading(false));
  };

  useEffect(() => {
    layoutContext.setLoading(true);

    ClassicService.init().then(data => {
      setEnigma(data);
      layoutContext.setLoading(false);
    }).catch(() => layoutContext.setLoading(false));
  }, []);

  const onAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => setAnswer(e.target.value);

  return (
    <Box>
      <Box className={classes.paper} boxShadow={3}>
        <strong>{enigma}</strong>
      </Box>


      <Box className={classes.formContainer}>
        <Typography>Decrypt the message and solve the riddle</Typography>

        <Paper component="form" onSubmit={checkAnswer} >
          <Box className={classes.inputContainer}>
            <InputBase className={classes.input} fullWidth placeholder="[1,4,13,27,35,46,49,62,71]" onChange={onAnswerChange} />
            <IconButton color="primary" type="submit">
              <SendIcon />
            </IconButton>
          </Box>
          {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : <div />}
        </Paper>
      </Box>
    </Box>
  );
};


export default ClassicCipher;
