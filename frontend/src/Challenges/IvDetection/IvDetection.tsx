import { Box, TextField, Typography } from "@material-ui/core";
import LockIcon from '@material-ui/icons/Lock';
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../App/LayoutContext";
import { IChallengeProps } from "../../Challenge/IChallengeProps";
import { IvDetectionService } from "./IvDetectionService";
import { chatName, firstResponseMessage, InitialMessages, me, successMessage } from "./Messages/ChatData";
import { IMessage } from "./Messages/IMessage";
import MessageBlock from "./Messages/MessageBlock";
import useStyles from "./styles";

const displayMessages = (history: IMessage[]) => {
  if (history.length === 0) return;
  let lastMessageFrom = history[0].author;

  const blocks: any = [];
  let left = false;
  let messageGroup: IMessage[] = [];


  history.forEach((m, i) => {
    left = m.author !== me;

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
    setHistory(InitialMessages);
  }, []);


  useEffect(() => {

    const c = document.getElementById('message-container');
    c?.scrollTo(0, c.scrollHeight);

  }, [history]);

  const onMesageChange = (e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value);


  const createMessage = (messageContent: string) => {
    const msg: IMessage = { author: me, content: messageContent, date: "now", type: "message" };
    appendToHistory(msg);
    setMessage("");
  };

  const onMessageSent = (e: React.SyntheticEvent) => {
    e.preventDefault();

    layoutContext.setLoading(true);

    IvDetectionService.sendMessage(message).then(res => {
      layoutContext.setLoading(false);

      if (res.flag) {
        props.setFlag(res.flag);
        sendThanks();
      }
      else
        if (firstResponse) sendFirstReply();

      setFistResponse(false);
    }).catch(() => layoutContext.setLoading(false));

    createMessage(message);

  };

  const sendFirstReply = () => {
    setTimeout(() => appendToHistory(firstResponseMessage), 10000);
  };

  const sendThanks = () => {
    setTimeout(() => appendToHistory(successMessage), 3000);
  };




  return (
    <Box className={classes.chatContainer}>
      <Box className={classes.chatTitle}>
        <Box className={classes.participantName}>
          <Typography variant="h5" ><LockIcon className={classes.lockIcon} /> #{chatName}</Typography>
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