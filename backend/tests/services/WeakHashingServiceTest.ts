
import { TestContext } from '@tsed/testing';
import { expect } from 'chai';
import { describe } from 'mocha';
import { WeakHashingService } from '../../src/services/WeakHashingService';

describe("SubstitutionService", () => {

  before(TestContext.create);
  after(TestContext.reset);

  describe("Hash", () => {
    it("Should hash password", () => {
      expect(WeakHashingService.hashPassowrd("securepassword")).to.be.equal("b0439fae31f8cbba6294af86234d5a28");
      expect(WeakHashingService.hashPassowrd(WeakHashingService.ADMIN_PASSWORD)).to.be.equal(WeakHashingService.ADMIN_PASSWORD_HASHED);
    });
  });



});
