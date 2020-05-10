import ChatSystemImg from '../../../Images/chatsystem.png';
import DetectiveImg from '../../../Images/detective.png';
import { IMessage } from './IMessage';

export const participantName: string = "Gh0st1337";
const initialMessages: IMessage[] = [
  {
    authorImg: DetectiveImg,
    author: participantName,
    content: "Hi FakeGuy, you there?",
    date: '5:21 AM',
    type: "message",
  },
  {
    authorImg: DetectiveImg,
    author: participantName,
    content: "Hurry up this is important",
    date: '5:21 AM',
    type: "message",
  },
  {
    authorImg: DetectiveImg,
    author: participantName,
    content: "WAKE UP!!!",
    date: '5:21 AM',
    type: "message",
  },
  {
    authorImg: "",
    author: "me",
    content: "Hey man, its 5AM are you crazy?",
    date: '5:23 AM',
    type: "message",
  },
  {
    authorImg: "",
    author: "me",
    content: "Whats happening?",
    date: '5:23 AM',
    type: "message",
  },
  {
    authorImg: ChatSystemImg,
    author: "system",
    content: `${participantName} just started an encrypted chat with you.`,
    date: '5:23 AM',
    type: "notification",
  },
  {
    authorImg: DetectiveImg,
    author: participantName,
    content: "Now we can talk",
    date: '5:23 AM',
    type: "message",
  },
  {
    authorImg: DetectiveImg,
    author: participantName,
    content: "They found me",
    date: '5:23 AM',
    type: "message",
  },
  {
    authorImg: DetectiveImg,
    author: participantName,
    content: "Need help",
    date: '5:23 AM',
    type: "message",
  },
  {
    authorImg: DetectiveImg,
    author: participantName,
    content: "Do you have it with you?",
    date: '5:23 AM',
    type: "message",
  },

];



export default initialMessages;