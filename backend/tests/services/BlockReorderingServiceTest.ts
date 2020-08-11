
import { TestContext } from '@tsed/testing';
import { expect } from 'chai';
import { BlockReorderingService } from '../../src/services/BlockReorderingService';
import { describe } from 'mocha';

describe("BlockReorderingService", () => {

  before(TestContext.create);
  after(TestContext.reset);


  it("Should encrypt token", () => {
    expect(BlockReorderingService.encryptToken("dvca")).to.be.equal("4d04658c39fb48269dc741aa6b2c78c0");
  });



  it("Should decerypt token", () => {
    expect(BlockReorderingService.decryptToken("4d04658c39fb48269dc741aa6b2c78c0")).to.be.equal("dvca");
  });



  it("Should create token adn check that is admin", () => {
    const t = BlockReorderingService.createToken("dvca", true);
    expect(t).to.match(/[a-f0-9]{128}/);
    expect(BlockReorderingService.isAdmin(t)).to.be.true;

  });

});
