
import { expect } from 'chai'
import { describe } from 'mocha'
import { IvDetectionService } from '../../src/services/IvDetectionService'

describe("IVDetectionService", () => {

  describe("Encryption", () => {
    it("Should encrypt data", () => {
      expect(IvDetectionService.encryptData("dvca")).to.be.equal("8467b502a05a6c2b1d7d5db3fe7d254c")
    })
  })

  describe("Decryption", () => {
    it("Should decrypt with bad padding", () => {
      const decrypted = IvDetectionService.decryptData("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
      const decryptedHex = Buffer.from(decrypted).toString("hex")
      expect(decryptedHex).to.equal("2464efbfbdefbfbd076fefbfbdd2b24aefbfbdefbfbd7b62efbfbdefbfbd")
    })

    it("Should retrieve the IV", () => {
      const encrypted = IvDetectionService.encryptData("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
      const firstBlock = encrypted.substring(0, 32) // 16 bytes
      const payload = firstBlock + ("0".repeat(32)) + firstBlock

      const xor = (s1: string, s2: string) => {
        let output = ''


        for (let i = 0; i < s1.length; ++i) {
          output += String.fromCharCode(s1.charCodeAt(i) ^ s2.charCodeAt(i))
        }

        return output
      }


      const decrypted = IvDetectionService.decryptData(payload)
      const decryptedFirstBlock = decrypted.substring(0, 16)
      const decryptedThirdBlock = decrypted.substring(32, 48)
      expect(xor(decryptedFirstBlock, decryptedThirdBlock)).to.equal(IvDetectionService.IV)
    })
  })







})
