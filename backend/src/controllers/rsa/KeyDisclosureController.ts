import { KeyDisclosureService } from '../../services/KeyDisclosureService'
import BaseController from '../BaseController'

export interface IDecryptInbox {
  privateKey: string
}

export interface IEmail {
  from: string
  to: string
  subject: string
  body: string
  date: string
}

export interface IDecryptInboxResponse {
  emails: IEmail[]
  success: boolean
  flag: string
}

export class KeyDisclosureController extends BaseController {
  // this is used to validate if the decryption was successfull.
  // assuming each mailbox has a string (MAILBOX_CHECK) that needs to be decrypted and checked with the original content (MAILBOX_CHECK_STRING)
  // if they match, decryption was successfull
  static MAILBOX_CHECK_STRING = "pleasefindme"
  static MAILBOX_CHECK = KeyDisclosureService.encrypt(KeyDisclosureController.MAILBOX_CHECK_STRING)

  static EMAILS: IEmail[] = [{
    body: `Hi mate,\n As you requested: ${KeyDisclosureService.getFlag()}`,
    date: new Date().toISOString(),
    from: "Fake Reporter <fake.reporter@fakecryptomail.com>",
    subject: "Got a flag for you",
    to: "Fake expert <fake.expert@fakecryptomail.com>"
  },
  {
    body: `Hey fake,\n Have you heard about DamnVulnerableCryptoApp? Seems really cool, take a look at it :)`,
    date: new Date().toISOString(),
    from: "Gh0st1337 <gh0st.1337@fakecryptomail.com>",
    subject: "Nice Tool",
    to: "Fake expert <fake.expert@fakecryptomail.com>"
  }
  ]

  public decrypt(): IDecryptInboxResponse {
    const body: IDecryptInbox = this.req.body
    const key = body.privateKey
    let decryptionSuccess = false

    try {
      if (KeyDisclosureService.decrypt(KeyDisclosureController.MAILBOX_CHECK, key) === KeyDisclosureController.MAILBOX_CHECK_STRING)
        decryptionSuccess = true
    } catch (ex) { }


    if (decryptionSuccess)
      return { emails: KeyDisclosureController.EMAILS, success: true, flag: KeyDisclosureService.getFlag() }
    else
      return { emails: [], success: false, flag: "" }

  }





}