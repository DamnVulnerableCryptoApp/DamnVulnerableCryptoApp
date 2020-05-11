import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import LockIcon from '@material-ui/icons/Lock';
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../App/LayoutContext";
import { IChallengeProps } from "../../Challenge/IChallengeProps";
import { HistoryEntry, KnownPlaintextAndKeyReuseService } from "./KnownPlaintextAndKeyReuseService";
import useStyles from "./styles";


const KnownPlaintextAndKeyReuse = (props: IChallengeProps) => {

  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [plaintext, setPlaintext] = useState("");
  const layoutContext = useContext(LayoutContext);


  const onEncryptButtonPressed = () => {
    layoutContext.setLoading(true);

    KnownPlaintextAndKeyReuseService.encrypt(plaintext).then((res: HistoryEntry) => {
      const c = Buffer.from(res.encryptedContent, "hex").toString();
      setHistory((hstry) => [res, ...hstry]);

      // TODO: This may be not be reliable. take a look at it and find a better way to validate it
      if (c.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/))
        props.setFlag(c);

      layoutContext.setLoading(false);

    }).catch(() => layoutContext.setLoading(false));
  };

  const getHistory = () => {
    layoutContext.setLoading(true);

    KnownPlaintextAndKeyReuseService.history().then(res => {
      setHistory((hstry) => res);
      layoutContext.setLoading(false);
    }).catch(() => layoutContext.setLoading(false));
  };

  useEffect(() => {
    getHistory();
  }, []);


  const classes = useStyles();

  const onPlainTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setPlaintext(e.target.value);

  return (
    <div>
      <Box mt={7}>
        <Box style={{ display: 'flex' }}>
          <Box>
            <LockIcon className={classes.lockIcon} />
          </Box>
          <Box mt={2}>
            <Typography gutterBottom variant="h5">Encrypt4Free</Typography>
            <Typography>We offer you an online and secure service to encrypt data for free.</Typography>
          </Box>
        </Box>
        <TextField fullWidth label="Text to encrypt" variant="outlined" multiline rows={4} onChange={onPlainTextChange} />
      </Box>
      <div className={classes.buttonContainer}>
        <Button variant="contained" color="primary" onClick={onEncryptButtonPressed}>Encrypt</Button>
      </div>

      <Typography gutterBottom variant="h5" component="h2">
        Other data encrypted with this service
      </Typography>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Encrypted Content</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              history.map((row: any, index: number) => (
                <TableRow key={index}>
                  <TableCell scope="row">{row.date}</TableCell>
                  <TableCell scope="row">{row.encryptedContent}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
};

export default KnownPlaintextAndKeyReuse;