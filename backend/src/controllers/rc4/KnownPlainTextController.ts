import { KnownPlainTextService } from '../../services/KnownPlainTextService'
import BaseController from '../BaseController'

export interface IHistoryEntry {
  encryptedContent: string
  date: string
}

export interface IRequest {
  data: string
}

export class KnownPlainTextController extends BaseController {

  // 78961849-2949-4a7b-ab4a-ea951bd91d32
  static encryptedHistory: IHistoryEntry[] = [
    { encryptedContent: KnownPlainTextService.encrypt(KnownPlainTextService.getFlag()), date: '2020-04-16T18:30:48.809Z' },
    { encryptedContent: KnownPlainTextService.encrypt("Some random data"), date: '2019-09-20T15:31:45.129Z' }
  ]

  public encrypt(): IHistoryEntry {
    const body: IRequest = this.req.body

    const plaintext = body.data
    console.info("Received content to encrypt: " + plaintext)

    const enc = { encryptedContent: KnownPlainTextService.encrypt(plaintext), date: new Date().toISOString() }

    KnownPlainTextController.encryptedHistory = [enc, ...KnownPlainTextController.encryptedHistory]

    return enc
  }

  public history(): IHistoryEntry[] {
    return KnownPlainTextController.encryptedHistory
  }

}