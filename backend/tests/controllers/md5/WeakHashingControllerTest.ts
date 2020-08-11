
import { ExpressApplication } from '@tsed/common';
import { TestContext } from '@tsed/testing';
import { expect } from 'chai';
import * as SuperTest from "supertest";
import { ICheckResponse, ILogin } from '../../../src/controllers/md5/WeakHashingController';
import { Server } from "../../../src/Server";
import { WeakHashingService } from '../../../src/services/WeakHashingService';


describe("WeakHashingController", () => {

  let request: SuperTest.SuperTest<SuperTest.Test>;
  before(TestContext.bootstrap(Server));
  before(TestContext.inject([ExpressApplication], (expressApplication: ExpressApplication) => {
    request = SuperTest(expressApplication);
  }));

  const path = "/md5/login";

  after(TestContext.reset);

  describe("POST " + path, () => {

    it("Should login and get flag", async () => {

      const body: ILogin = { username: "admin", password: WeakHashingService.ADMIN_PASSWORD };
      const res = await request.post(path).send(body);
      const content: ICheckResponse = res.body;

      expect(res.status).to.equal(200);
      expect(content.flag);
      expect(content.success).to.be.true;

    });

    it("Should fail login", async () => {

      const body: ILogin = { username: "admin", password: "badpassword" };
      const res = await request.post(path).send(body);
      const content: ICheckResponse = res.body;

      expect(res.status).to.equal(200);
      expect(content.flag).to.be.empty;
      expect(content.success).to.be.false;

    });

  });

});
