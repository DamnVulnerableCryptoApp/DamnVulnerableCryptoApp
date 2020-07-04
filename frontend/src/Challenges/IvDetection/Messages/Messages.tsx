import { me, samsepi0l, system } from './ChatData';
import { IMessage } from './IMessage';

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
];

export const firstResponseMessage: IMessage = { author: samsepi0l, content: "find me the iv", date: "now", type: "message" };

export const successMessage: IMessage = { author: samsepi0l, content: "it worked", date: "now", type: "message" };