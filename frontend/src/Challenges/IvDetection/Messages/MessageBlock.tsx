import { Box, Chip, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "../styles";
import { IMessage } from "./IMessage";


export interface IMessageBlockProps {
  left: boolean;
  messages: IMessage[];
}


const MessageChip = (content: string, color: "primary" | "default") => (<Chip label={content} color={color} />);
const NotificationChip = (content: string) => (<Chip label={content} variant="outlined" color="secondary" />);

const MessageBlock = (props: IMessageBlockProps) => {
  const classes = useStyles();

  if (props.messages.length === 0) return (<div />);
  const firstMessage = props.messages[0];
  const ownMessage = firstMessage.author === "me";
  const alignment = ownMessage ? classes.messageRight : classes.messageLeft;

  return (
    <Box className={alignment}>
      <Box className={classes.messageAuthorImg}>
        {
          ownMessage ? "" : <img src={firstMessage.authorImg} width="40" alt="Icon made by Freepik from flaticon.com" />
        }
      </Box>
      <Box className={classes.messageContent} textAlign={ownMessage ? "right" : "left"}>
        <Box className={classes.participantNameMessage}><Typography variant="caption">{firstMessage.author} {firstMessage.date}</Typography></Box>
        {
          props.messages.map((m, i) => {
            return (
              <Box key={i} className={classes.messageChip}>
                {
                  m.type === "message" ? MessageChip(m.content, ownMessage ? "primary" : "default") : NotificationChip(m.content)
                }
              </Box>
            );
          })
        }
      </Box>
    </Box>
  );

};


export default MessageBlock;