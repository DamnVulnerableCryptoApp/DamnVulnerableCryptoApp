
import { TestContext } from '@tsed/testing';
import { expect } from 'chai';
import { ChecksumCollisionService } from '../../src/services/ChecksumCollisionService';


describe("ChecksumCollisionService", () => {

  before(TestContext.create);
  after(TestContext.reset);


  it("Should calculate md5 hash", () => {

    ChecksumCollisionService.getMd5FileChecksum(__dirname + "/../../src/config/publickey.pem").then(r => {
      expect(r).to.be.equal("9618c9f82606cd2ab0e333d225cd48a2");
    });

  });


  it("Should calculate sha1 hash", () => {

    ChecksumCollisionService.getSha1FileChecksum(__dirname + "/../../src/config/publickey.pem").then(r => {
      expect(r).to.be.equal("0d6f4912f5b2800cba5d79d5f036a1a79ee61303");
    });

  });





});
