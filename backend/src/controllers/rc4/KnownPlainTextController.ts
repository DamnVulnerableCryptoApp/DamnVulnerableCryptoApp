import { $log, BodyParams, Controller, Get, Post } from '@tsed/common';
import * as crypto from 'crypto';

interface HistoryEntry {
  encryptedContent: string;
  date: string;
}


@Controller("/rc4/known-plaintext-key-reuse")
export class KnownPlainTextController {

  // 78961849-2949-4a7b-ab4a-ea951bd91d32
  static encryptedHistory: HistoryEntry[] = [
    { encryptedContent: 'df75d1ce00d8112f827061a19aff2392ebc39b054e10b8923ffb64b391c8440c065cd63b', date: '2020-04-16T18:30:48.809Z' },
    { encryptedContent: '37383936313834392d323934392d346137622d616234612d656139353162643931643332', date: '2019-09-20T15:31:45.129Z' }
  ];
  static KEY = crypto.createHash('sha256').update("supersecurekey123").digest();


  // symetric crypto is heavily based on XOR operations. Something like: message XOR key == encrypted
  // this is a really easy schema to break due to XOR properties...
  // message XOR key == encrypted && message XOR encrypted = key &&  key XOR encrypted == message
  // so if we know the encrypted content and try to encrypt it again with the key, we end up with the original plaintext
  @Post("/encrypt")
  public async encrypt(@BodyParams() body: any): Promise<HistoryEntry> {

    const plaintext = body.data;
    $log.info("Received content to encrypt: " + plaintext);

    const cipher = crypto.createCipheriv('rc4', KnownPlainTextController.KEY, '');
    const ciphertext = cipher.update(plaintext, "binary").toString("hex");

    const enc = { encryptedContent: ciphertext, date: new Date().toISOString() };

    KnownPlainTextController.encryptedHistory = [enc, ...KnownPlainTextController.encryptedHistory];

    return enc;
  }

  @Get("/history")
  public async history() {
    return KnownPlainTextController.encryptedHistory;
  }

}