
import { TestContext } from '@tsed/testing';
import { expect } from 'chai';
import { describe } from 'mocha';
import { TimingAttackService } from '../../src/services/TimingAttackService';

describe("TimingAttackService", () => {

  before(TestContext.create);
  after(TestContext.reset);



  describe("checkLogin", () => {

    // test the right user
    it("Should take some time", async () => {
      const time = Date.now();
      await TimingAttackService.checkLogin("abel", "");
      const duration = Date.now() - time;

      expect(duration).to.be.greaterThan(400);
    });

    // test a wrong user
    it("Should be fast", async () => {
      const time = Date.now();
      await TimingAttackService.checkLogin("abel1", "");
      const duration = Date.now() - time;

      expect(duration).to.be.lessThan(400);
    });
  });


  describe("checkusername", () => {
    it("Should prevent bruteforce and return true", async () => {
      const time = Date.now();
      await TimingAttackService.checkUsername("abel");
      const duration = Date.now() - time;

      expect(duration).to.be.gte(5000);
    });
  });


});
