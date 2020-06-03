
import { TestContext } from '@tsed/testing';
import { expect } from 'chai';
import { SubstitutionService } from '../../src/services/SubstitutionService';


describe("SubstitutionService", () => {

  before(TestContext.create);
  after(TestContext.reset);

  describe("Encryption", () => {
    it("Should encrypt data", () => {
      expect(SubstitutionService.encrypt("dvca")).to.be.equal("qrxz");
    });
  });


  describe("Decryption", () => {
    it("Should decrypt data", () => {
      expect(SubstitutionService.decrypt("qrxz")).to.be.equal("dvca");
    });
  });


});
