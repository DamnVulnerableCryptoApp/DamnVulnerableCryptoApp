
import { expect } from 'chai'
import { describe } from 'mocha'
import { SubstitutionService } from '../../src/services/SubstitutionService'

describe("SubstitutionService", () => {

  describe("Encryption", () => {
    it("Should encrypt data", () => {
      expect(SubstitutionService.encrypt("dvca")).to.be.equal("qrxz")
    })
  })


  describe("Decryption", () => {
    it("Should decrypt data", () => {
      expect(SubstitutionService.decrypt("qrxz")).to.be.equal("dvca")
    })
  })


})
