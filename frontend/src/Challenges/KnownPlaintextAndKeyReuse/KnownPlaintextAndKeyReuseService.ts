import ApiRequest from "../../Common/ApiRequest";

interface IHistoryEntry {
  encryptedContent: string;
  date: string;
}

interface IRequest {
  data: string;
}

export class KnownPlaintextAndKeyReuseService extends ApiRequest {

  public static CHALLENGEPATH = `/rc4/known-plaintext-key-reuse`;


  public static async encrypt(data: string): Promise<IHistoryEntry> {

    const path = `${KnownPlaintextAndKeyReuseService.CHALLENGEPATH}/encrypt`;
    const payload: IRequest = { data };
    const params: any = {
      method: "POST",
      body: JSON.stringify(payload),
      // body: JSON.stringify({ data: '\xdf\x75\xd1\xce\x00\xd8\x11\x2f\x82\x70\x61\xa1\x9a\xff\x23\x92\xeb\xc3\x9b\x05\x4e\x10\xb8\x92\x3f\xfb\x64\xb3\x91\xc8\x44\x0c\x06\x5c\xd6\x3b' }),
    };

    return super.do(path, params);
  }

  public static async history() {

    const path = `${KnownPlaintextAndKeyReuseService.CHALLENGEPATH}/history`;

    return super.do(path);

  }
}