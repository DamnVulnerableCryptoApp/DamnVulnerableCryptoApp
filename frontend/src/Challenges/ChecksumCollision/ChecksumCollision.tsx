import { Box, Button, IconButton } from "@material-ui/core";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import React, { useEffect, useState } from "react";
import Typed from "typed.js";
import { IChallengeProps } from "../../Challenge/IChallengeProps";
import ChecksumCollisionService from "./ChecksumCollisionService";
import useStyles from "./styles";



const ChecksumCollision = (props: IChallengeProps) => {
  const classes = useStyles();

  const noFileSelected = "No File Selected";
  const banner =
    '___________       __        ___________                   \n' +
    '\\_   _____/____  |  | __ ___\\__    ___/__________  _____  \n' +
    ' |    __) \\__  \\ |  |/ // __ \\|    |_/ __ \\_  __ \\/     \\ \n' +
    ' |     \\   / __ \\|    <\\  ___/|    |\\  ___/|  | \\/  Y Y  \\\n' +
    ' \\___  /  (____  /__|_ \\\\___  >____| \\___  >__|  |__|_|  /\n' +
    '     \\/        \\/     \\/    \\/           \\/            \\/ \n';


  const [file1, setFile1] = useState<File>(new File([], ""));
  const [file2, setFile2] = useState<File>(new File([], ""));
  let typed: Typed;


  const typedError = () => {
    typed.destroy();
    typed = new Typed('#console', {
      strings: [
        '$ Hello Fak3Ag3n7,^1000 `<br>`' +
        '$ Something is not right... Isn\'t it possible or is it a mistake? ^1000 `<br>`' +
        '$ I will wait for another try...^1000 `<br>`'
      ],
      typeSpeed: 50,
      loop: false
    });
  };

  const uploadFiles = () => {
    ChecksumCollisionService.sendFiles(file1, file2).then(data => {
      props.setFlag(data.flag);


      if (!data.success)
        typedError();


    }).catch(() => typedError());

  };




  useEffect(() => {
    typed = new Typed('#console', {
      strings: [

        '$ Hello Fak3Ag3n7,^1000 `<br>`' +
        '$ Your services are required again `<br>`' +
        '$ I need you need to create two applications^200, one completly normal and doing nothing wrong, but the other... the other will do nasty things... `<br>`^500' +
        '$ I want to use this other app to take control of a computer. `<br>`^500' +
        '$ There\'s on catch. I need to supply the checksum of the executable in the website, and it will be audited... `<br>`' +
        '$ To make sure the guy trusts and runs the executable I need it to have the same checksum as the \'normal\' one `<br>`' +
        '$ Create me a test to see it is possible, and we\'ll continue from there.'


      ],
      typeSpeed: 50,
      loop: false
    });

  }, []);


  const onFile1Change = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files) { setFile1(e.target.files[0]); } };
  const onFile2Change = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files) { setFile2(e.target.files[0]); } };

  return (<div>
    <Box>
      <Box className={classes.consoleContainer}>
        <pre>{banner}</pre>
        <span id="console" className={classes.console} />
      </Box>
    </Box>

    <Box>
      <input id="file1" type="file" onChange={onFile1Change} />
      <label htmlFor="file1">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <AttachFileIcon />
        </IconButton>
        {file1.name || noFileSelected}
      </label>
    </Box>
    <Box>
      <input id="file2" type="file" onChange={onFile2Change} />
      <label htmlFor="file2">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <AttachFileIcon />
        </IconButton>
        {file2.name || noFileSelected}
      </label>
    </Box>
    <Button variant="contained" onClick={uploadFiles}>Send</Button>
  </div>);
};


export default ChecksumCollision;
