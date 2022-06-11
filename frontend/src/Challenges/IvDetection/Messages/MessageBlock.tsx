import { Box, Chip, Typography } from "@material-ui/core"
import React from "react"
import useStyles from "../styles"
import { me, system } from "./ChatData"
import { IMessage } from "./IMessage"


export interface IMessageBlockProps {
  left: boolean
  messages: IMessage[]
}

const MessageChip = (content: string, className: string) => (<Chip label={content} className={className} />)
const NotificationChip = (content: string) => (<Chip label={content} variant="outlined" color="secondary" />)

const MessageBlock = (props: IMessageBlockProps) => {
  const classes = useStyles()

  if (props.messages.length === 0) return (<div />)
  const firstMessage = props.messages[0]
  const ownMessage = firstMessage.author === me
  const systemMessage = firstMessage.author === system
  const alignment = ownMessage ? classes.messageRight : classes.messageLeft
  const className = ownMessage ? classes.ownMessage : classes.receivedMessage

  return (
    <Box className={alignment}>
      <Box className={classes.messageAuthorImg}>
        {
          ownMessage ? "" : <img className={classes.auhtorImg} src={firstMessage.author.avatar} width="40" />
        }
      </Box>
      <Box className={classes.messageContent} textAlign={ownMessage ? "right" : "left"}>
        <Box className={classes.participantNameMessage}><Typography variant="caption">{firstMessage.author.username} {firstMessage.date}</Typography></Box>
        {
          props.messages.map((m, i) => {
            return (
              <Box key={i} className={classes.messageChip}>
                {
                  m.type === "message" ? MessageChip(m.content, className) : NotificationChip(m.content)
                }
              </Box>
            )
          })
        }
      </Box>
    </Box>
  )
}


export default MessageBlock