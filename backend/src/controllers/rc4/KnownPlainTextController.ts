import { $log, BodyParams, Controller, Get, Post } from '@tsed/common';
import { KnownPlainTextService } from '../../services/KnownPlainTextService';

export interface IHistoryEntry {
  encryptedContent: string;
  date: string;
}

export interface IRequest {
  data: string;
}


@Controller("/rc4/known-plaintext-key-reuse")
export class KnownPlainTextController {

  // 78961849-2949-4a7b-ab4a-ea951bd91d32
  static encryptedHistory: IHistoryEntry[] = [
    { encryptedContent: KnownPlainTextService.encrypt(KnownPlainTextService.FLAG), date: '2020-04-16T18:30:48.809Z' },
    { encryptedContent: KnownPlainTextService.encrypt("Some random data"), date: '2019-09-20T15:31:45.129Z' }
  ];

  @Post("/encrypt")
  public encrypt(@BodyParams() body: IRequest): IHistoryEntry {

    const plaintext = body.data;
    $log.info("Received content to encrypt: " + plaintext);

    const enc = { encryptedContent: KnownPlainTextService.encrypt(plaintext), date: new Date().toISOString() };

    KnownPlainTextController.encryptedHistory = [enc, ...KnownPlainTextController.encryptedHistory];

    return enc;
  }

  @Get("/history")
  public history(): IHistoryEntry[] {
    return KnownPlainTextController.encryptedHistory;
  }

}