import { AppBar, Avatar, Box, Grid, List, ListItem, ListItemAvatar, ListItemText, Tab, Tabs, Typography } from "@material-ui/core";
import DraftsIcon from '@material-ui/icons/Drafts';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import StarIcon from '@material-ui/icons/Star';
import React, { useEffect, useState } from "react";
import { IChallengeProps } from "../../Challenge/IChallengeProps";
import DetectiveImg from '../../Images/detective.png';
import FakeReporterImg from "../../Images/fakereporter.jpg";
import { IEmail } from "./KeyDisclosureService";
import KeyModal from "./KeyModal";
import useStyles from "./styles";

const KeyDisclosure = (props: IChallengeProps) => {

  const classes = useStyles();
  const [inboxUnlocked, setInboxUnlocked] = useState(false);
  const [mailboxKey, setMailboxKey] = useState("");
  const [emails, setEmails] = useState<IEmail[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<IEmail>({} as IEmail);


  useEffect(() => {
    setEmailDetails();
  }, [selectedEmail]);

  const onChangeOpenEmail = (mail: IEmail) => {

    return (e: React.MouseEvent) => {
      setSelectedEmail(mail);
    };
  };

  const emailEntry = (index: number, mail: IEmail) => {
    const from = mail.from.split("<")[0];
    const img = mail.from.startsWith("Fake Reporter") ? FakeReporterImg : DetectiveImg;

    return (
      <List key={index}>
        <ListItem button onClick={onChangeOpenEmail(mail)}>
          <ListItemAvatar>
            <Avatar>
              <img src={img} width="50" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={from} secondary={mail.subject} />
        </ListItem>
      </List>
    );
  };


  const setEmailDetails = () => {
    if (!selectedEmail?.from) return;

    const img = selectedEmail.from.startsWith("Fake Reporter") ? FakeReporterImg : DetectiveImg;

    return (
      <Box p={2}>
        <Box display="flex">
          <Avatar><img src={img} width="50" /></Avatar>
          <Box ml={1}>
            <Typography><strong>Subject:</strong> {selectedEmail.subject}</Typography>
            <Typography><small><strong>Date: </strong>{selectedEmail.date}</small></Typography>
          </Box>
        </Box>


        <Box className={classes.emailBody}>
          <Typography>{selectedEmail.body} </Typography>
        </Box>
      </Box>
    );
  };


  return (
    <Box id="key-disclosure-container" style={{ position: 'relative' }}>


      <KeyModal inboxUnlocked={inboxUnlocked} mailboxKey={mailboxKey} setSelectedEmail={setSelectedEmail}
        setEmails={setEmails} setInboxUnlocked={setInboxUnlocked} setMailboxKey={setMailboxKey} setFlag={props.setFlag} />

      <Box mt={2}>
        <AppBar position="static" className={classes.tabs}>
          <Tabs value={0}>
            <Tab label="Inbox" icon={<DraftsIcon />} />
            <Tab label="Stared" icon={<StarIcon />} />
            <Tab label="Drafts" icon={<InsertDriveFileIcon />} />
          </Tabs>
        </AppBar>



        <div role="tabpanel">
          <Box>
            <Grid container className={classes.mailbox} >
              <Grid item sm={4} className={classes.emailList}>
                {
                  emails.map((mail, i) => emailEntry(i, mail))
                }
              </Grid>
              <Grid item sm={8} className={classes.emailDetails}>{setEmailDetails()}</Grid>
            </Grid>
          </Box>
        </div>
      </Box>

    </Box >
  );
};

export default KeyDisclosure;