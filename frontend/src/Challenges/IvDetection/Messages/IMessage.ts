import { IChatParticipant } from "./IChatParticipant"

export interface IMessage {
  author: IChatParticipant
  content: string
  date: string
  type: "message" | "notification"
}

