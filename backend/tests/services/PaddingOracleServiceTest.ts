
import { TestContext } from '@tsed/testing';
import { expect } from 'chai';
import { PaddingOracleService } from '../../src/services/PaddingOracleService';


describe("PaddingOracleService", () => {

  before(TestContext.create);
  after(TestContext.reset);

  describe("Generate Token", () => {
    it("should create token string", () => {
      const token = PaddingOracleService.createTokenString();

      expect(token).to.match(/^lastRequestAt=/);
      expect(token).to.match(/;isAdmin=false;username=Anonymous$/);
    });

    it("should create admin token string", () => {
      const token = PaddingOracleService.createTokenString("admin", true);

      expect(token).to.match(/^lastRequestAt=/);
      expect(token).to.match(/;isAdmin=true;username=admin$/);
    });

  });


  describe("Encryption", () => {
    it("should encrypt a string", () => {
      const c = PaddingOracleService.encryptToken("dvca");
      expect(c).to.be.equal("4b28dfe2ee8dcd542b0605fa695f6ff9");
    });
  });

  describe("Decryption", () => {
    it("should decrypt a string", () => {
      const c = PaddingOracleService.decryptToken("4b28dfe2ee8dcd542b0605fa695f6ff9");
      expect(c).to.be.equal("dvca");
    });

    it("should throw a bad padding exception", () => {

      expect(() => PaddingOracleService.decryptToken("4b28dfe2ee8dcd542b0605fa695f6f02")).to.be.throw();
    });
  });

  describe("isAdmin", () => {
    it("should be admin", () => {
      const token = PaddingOracleService.createTokenString("admin", true);
      const encToken = PaddingOracleService.encryptToken(token);
      const isAdmin = PaddingOracleService.isAdmin(encToken);
      expect(isAdmin).to.be.true;
    });

    it("should not be admin", () => {
      const token = PaddingOracleService.getAnonymousToken();
      const isAdmin = PaddingOracleService.isAdmin(token);
      expect(isAdmin).to.be.false;
    });


  });
});

