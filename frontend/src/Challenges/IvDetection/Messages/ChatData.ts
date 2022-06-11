import ChatSystemImg from '../../../Images/chatsystem.png'
import Samsepi0lImg from '../../../Images/samsepi0l.jpg'
import { IChatParticipant } from './IChatParticipant'
import { IMessage } from './IMessage'

export const me: IChatParticipant = { username: "D0loresH4ze", avatar: "" }
export const samsepi0l: IChatParticipant = { username: "samsepi0l", avatar: Samsepi0lImg }
export const system: IChatParticipant = { username: "system", avatar: ChatSystemImg }

export const chatName: string = "th3g3ntl3man"

export const InitialMessages: IMessage[] = [
  {
    author: system,
    content: `${samsepi0l.username} just started an encrypted chat with you.`,
    date: '23:44',
    type: "notification",
  },
  {
    author: samsepi0l,
    content: `hey`,
    date: '23:44',
    type: "message",
  },
  {
    author: me,
    content: "feds found the arcade.",
    date: '23:45',
    type: "message",
  },
  {
    author: me,
    content: "they got an illegal surveillance program...",
    date: '23:45',
    type: "message",
  },
  {
    author: me,
    content: "something called \"berenstain\"",
    date: '23:45',
    type: "message",
  },
  {
    author: me,
    content: "romero's body was found on his back porch. coup de grace",
    date: '23:45',
    type: "message",
  },
  {
    author: samsepi0l,
    content: "wait for my instructions",
    date: '23:46',
    type: "message",
  },
]

export const firstResponseMessage: IMessage = { author: samsepi0l, content: "find me the iv", date: "now", type: "message" }
export const successMessage: IMessage = { author: samsepi0l, content: "it worked", date: "now", type: "message" }