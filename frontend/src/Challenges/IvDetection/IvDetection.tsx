import { Box, TextField, Typography } from "@material-ui/core";
import LockIcon from '@material-ui/icons/Lock';
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../App/LayoutContext";
import { IChallengeProps } from "../../Challenge/IChallengeProps";
import DetectiveImg from '../../Images/detective.png';
import { IvDetectionService } from "./IvDetectionService";
import { IMessage } from "./Messages/IMessage";
import initialMessages, { participantName } from "./Messages/InitialMessages";
import MessageBlock from "./Messages/MessageBlock";
import useStyles from "./styles";



const displayMessages = (history: IMessage[]) => {
  if (history.length === 0) return;
  let lastMessageFrom = history[0].author;

  const blocks: any = [];
  let left = false;
  let messageGroup: IMessage[] = [];


  history.forEach((m, i) => {
    left = m.author !== "me";

    if (lastMessageFrom !== m.author) { // if different sender, create a new block
      blocks.push(<MessageBlock key={i} left={left} messages={messageGroup} />);
      messageGroup = [m];
    }
    else
      messageGroup.push(m);

    lastMessageFrom = m.author;
  });

  // push the last changes
  blocks.push(<MessageBlock key="last" left={left} messages={messageGroup} />);

  return blocks;
};




const IvDetection = (props: IChallengeProps) => {

  const [history, setHistory] = useState<IMessage[]>([]);
  const [message, setMessage] = useState("");
  const [firstResponse, setFistResponse] = useState(true);
  const layoutContext = useContext(LayoutContext);

  const appendToHistory = (m: IMessage) => setHistory((hstry) => [...hstry, m]);
  const classes = useStyles();


  useEffect(() => {
    setHistory(initialMessages);
  }, []);


  useEffect(() => {

    const c = document.getElementById('message-container');
    c?.scrollTo(0, c.scrollHeight);

  }, [history]);

  const onMessageSent = (e: React.SyntheticEvent) => {
    e.preventDefault();

    layoutContext.setLoading(true);

    // if the user sends the IV as a message, the flag will be returned
    IvDetectionService.sendMessage(message).then(res => {
      layoutContext.setLoading(false);
      if (res.flag) {
        props.setFlag(res.flag);
        sendThanks();
      }
      else {
        if (firstResponse)
          sendThreat();
      }

      setFistResponse(false);

    }).catch(() => layoutContext.setLoading(false));

    const msg: IMessage = { author: "me", authorImg: "", content: message, date: "now", type: "message" };
    appendToHistory(msg);
    setMessage("");



  };

  const sendThreat = () => {

    setTimeout(() => {
      const m = "We got your friend. Give us what we want!";
      const msg: IMessage = { author: participantName, authorImg: DetectiveImg, content: m, date: "now", type: "message" };
      appendToHistory(msg);
    }, 10000);

  };

  const sendThanks = () => {
    setTimeout(() => {
      const m = "Now you're talking!";
      const msg: IMessage = { author: participantName, authorImg: DetectiveImg, content: m, date: "now", type: "message" };
      appendToHistory(msg);
    }, 3000);
  };

  const onMesageChange = (e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value);


  return (
    <Box className={classes.chatContainer}>
      <Box className={classes.chatTitle}>
        <img src={DetectiveImg} alt="Icon made by Freepik from flaticon.com" width="50" />
        <Box className={classes.participantName}>
          <Typography variant="h5" ><LockIcon className={classes.lockIcon} /> {participantName}</Typography>
        </Box>
      </Box>
      <Box className={classes.messageContainer} id="message-container">
        {displayMessages(history)}
      </Box>

      <Box component="form" className={classes.chatInput} onSubmit={onMessageSent}>
        <TextField fullWidth placeholder="Type our message here" variant="outlined" value={message} onChange={onMesageChange} />
      </Box>
    </Box>
  );
};


export default IvDetection;