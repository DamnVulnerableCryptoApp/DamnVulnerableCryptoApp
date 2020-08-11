
import { TestContext } from '@tsed/testing';
import { expect } from 'chai';
import { describe } from 'mocha';
import { ByteAtATimeService } from '../../src/services/ByteAtATimeService';

describe("ByteAtATimeService", () => {

  before(TestContext.create);
  after(TestContext.reset);

  describe("Encryption", () => {
    it("Should encrypt data", () => {
      expect(ByteAtATimeService.encrypt("dvca")).to.eq("2ad06311ec1a29d18e41aadb46d30751");
    });
  });

  describe("Decryption", () => {
    it("Should decrypt data", () => {
      expect(ByteAtATimeService.decrypt("2ad06311ec1a29d18e41aadb46d30751")).to.eq("dvca");
    });
  });


});
