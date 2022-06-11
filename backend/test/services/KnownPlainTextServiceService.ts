
import { expect } from 'chai'
import { describe } from 'mocha'
import { KnownPlainTextService } from '../../src/services/KnownPlainTextService'

describe("KnownPlainTextService", () => {

  describe("Encryption", () => {
    it("Encrypt Twice should return plaintext", () => {
      const enc = KnownPlainTextService.encrypt("dvca")
      expect(KnownPlainTextService.encrypt(enc)).to.be("dvca")
    })

  })







})
