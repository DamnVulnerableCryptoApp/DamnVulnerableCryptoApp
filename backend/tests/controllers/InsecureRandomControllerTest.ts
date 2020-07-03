
import { ExpressApplication } from '@tsed/common';
import { TestContext } from '@tsed/testing';
import { expect } from 'chai';
import * as SuperTest from "supertest";
import { ICheckResponse, ICouponsResponse, InsecureRandomController } from '../../src/controllers/InsecureRandomController';
import { Server } from "../../src/Server";
import { InsecureRandomService } from '../../src/services/InsecureRandomService';


describe("InsecureRandomController", () => {

  let request: SuperTest.SuperTest<SuperTest.Test>;
  before(TestContext.bootstrap(Server));
  before(TestContext.inject([ExpressApplication], (expressApplication: ExpressApplication) => {
    request = SuperTest(expressApplication);
  }));

  const path = "/random";

  after(TestContext.reset);



  describe("GET " + path, () => {

    it("Should generate 5 numbers", async () => {


      const res = await request.get(path);
      const content: ICouponsResponse = res.body;

      expect(res.status).to.equal(200);
      expect(content.coupons.length).to.equal(5);

    });

  });

  describe("GET " + path + "/check", () => {


    it("Should validate successfull guessed random value and return flag", async () => {

      const n = InsecureRandomController.nextCoupons[2];
      const p = path + "/check?couponCode=" + n;

      const res = await request.get(p);
      const content: ICheckResponse = res.body;

      expect(res.status).to.equal(200);
      expect(content.flag).to.eq(InsecureRandomService.getFlag());
      expect(content.valid).to.be.true;

    });

  });

});
