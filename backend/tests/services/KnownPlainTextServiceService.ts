
import { TestContext } from '@tsed/testing';
import { expect } from 'chai';
import { KnownPlainTextService } from '../../src/services/KnownPlainTextService';


describe("KnownPlainTextService", () => {

  before(TestContext.create);
  after(TestContext.reset);

  describe("Encryption", () => {
    it("Encrypt Twice should return plaintext", () => {
      const enc = KnownPlainTextService.encrypt("dvca");
      expect(KnownPlainTextService.encrypt(enc)).to.be("dvca");
    });

  });







});
