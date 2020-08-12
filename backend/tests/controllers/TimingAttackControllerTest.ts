
import { ExpressApplication } from '@tsed/common';
import { TestContext } from '@tsed/testing';
import { expect } from 'chai';
import * as SuperTest from "supertest";
import { IForgotPasswordRequest, IForgotPasswordResponse, ILoginRequest, ILoginResponse } from '../../src/controllers/TimingAttackController';
import { Server } from "../../src/Server";
import { TimingAttackService } from '../../src/services/TimingAttackService';


describe("TimingAttackController", () => {

  let request: SuperTest.SuperTest<SuperTest.Test>;
  before(TestContext.bootstrap(Server));
  before(TestContext.inject([ExpressApplication], (expressApplication: ExpressApplication) => {
    request = SuperTest(expressApplication);
  }));

  const path = "/timing-attack";

  after(TestContext.reset);



  describe("POST " + path + "/login", () => {

    it("Should fail login", async () => {

      const data: ILoginRequest = { password: "", username: "some" };
      const res = await request.post(path + "/login").send(data);
      const content: ILoginResponse = res.body;

      expect(res.status).to.equal(200);
      expect(content.success).to.be.false;

    });

  });

  describe("POST " + path + "/forgot-password", () => {

    it("should not return the flag", async () => {
      const p = path + "/forgot-password";
      const data: IForgotPasswordRequest = { username: "abel1" };
      const res = await request.post(p).send(data);
      const content: IForgotPasswordResponse = res.body;
      expect(res.status).to.equal(200);
      expect(content.success).to.be.true;
      expect(content.flag).to.be.empty;

    });

    it("should return the flag", async () => {
      const p = path + "/forgot-password";
      const data: IForgotPasswordRequest = { username: "abel" };
      const res = await request.post(p).send(data);
      const content: IForgotPasswordResponse = res.body;

      expect(res.status).to.equal(200);
      expect(content.success).to.be.true;
      expect(content.flag).to.be.eq(TimingAttackService.getFlag());

    });

  });

});
