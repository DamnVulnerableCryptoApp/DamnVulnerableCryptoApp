
import { expect } from 'chai'
import { IDecryptInbox, IDecryptInboxResponse } from '../../../src/controllers/rsa/KeyDisclosureController'
import { KeyDisclosureService } from '../../../src/services/KeyDisclosureService'
import { request } from '../../init'

describe("KeyDisclosureController", () => {

  const path = "/rsa/key-disclosure"

  describe("POST " + path + "/decrypt-mailbox", () => {

    it("Should decrypt mailbox", async () => {
      const p = path + "/decrypt-mailbox"
      const body: IDecryptInbox = { privateKey: KeyDisclosureService.readPrivateKey() }
      const res = await request.post(p).send(body)
      const content: IDecryptInboxResponse = res.body

      expect(res.status).to.equal(200)
      expect(content.success).to.be.true
      expect(content.flag).to.equal(KeyDisclosureService.getFlag())
      expect(content.emails.length).to.eq(2)

    })

    it("Shouldn't decrypt mailbox", async () => {
      const p = path + "/decrypt-mailbox"
      const body: IDecryptInbox = { privateKey: KeyDisclosureService.readPublicKey() }
      const res = await request.post(p).send(body)
      const content: IDecryptInboxResponse = res.body

      expect(res.status).to.equal(200)
      expect(content.success).to.be.false
      expect(content.flag).to.be.empty
      expect(content.emails.length).to.eq(0)

    })

  })

})
