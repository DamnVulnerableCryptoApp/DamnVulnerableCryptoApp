import ApiRequest from "../../Common/ApiRequest";

interface IDecryptInbox {
  privateKey: string;
}

export interface IEmail {
  from: string;
  to: string;
  subject: string;
  body: string;
  date: string;
}

export interface IDecryptInboxResponse {
  emails: IEmail[];
  success: boolean;
  flag: string;
}


export class KeyDisclosureService extends ApiRequest {

  public static CHALLENGEPATH = `/rsa/key-disclosure`;

  public static async unlockMailbox(privateKey: string): Promise<IDecryptInboxResponse> {
    const path = `${KeyDisclosureService.CHALLENGEPATH}/decrypt-mailbox`;
    const body: IDecryptInbox = { privateKey };
    const params = { method: 'POST', body: JSON.stringify(body) };


    return super.do(path, params);
  }

}