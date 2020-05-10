
export interface IMessage {
  authorImg: string;
  author: string;
  content: string;
  date: string;
  type: "message" | "notification";
}

