
import { ExpressApplication } from '@tsed/common';
import { TestContext } from '@tsed/testing';
import { expect } from 'chai';
import * as SuperTest from "supertest";
import { IAccessResponse } from '../../../src/controllers/aes/BlockReorderingController';
import { ByteAtATimeController, IAdminResponse } from '../../../src/controllers/aes/ByteAtATimeController';
import { Server } from "../../../src/Server";


describe("ByteAtATimeController", () => {
  const path = "/aes/ecb/byte-at-a-time";


  let request: SuperTest.SuperTest<SuperTest.Test>;
  before(TestContext.bootstrap(Server));
  before(TestContext.inject([ExpressApplication], (expressApplication: ExpressApplication) => {
    request = SuperTest(expressApplication);
  }));


  after(TestContext.reset);

  describe("POST " + path, () => {

    it("Should generate a token", async () => {

      const res = await request.post(path + "/request-access").set("username", "someuser").send();
      const content: IAccessResponse = res.body;

      expect(res.status).to.equal(200);
      expect(content.token);

    });

  });

  describe("POST " + path + "/admin", () => {
    const p = path + "/admin";
    it("Should have admin access", async () => {

      const token = Buffer.from("admin:" + ByteAtATimeController.ADMIN_PASSWORD).toString("base64");
      const res = await request.post(p).set("Authorization", `basic: ${token}`).send();
      expect(res.status).to.equal(200);

      const body: IAdminResponse = res.body;
      expect(body.success).to.be.true;
      expect(body.flag);

    });

    it("Should not have admin access (wrong user)", async () => {

      const token = Buffer.from("admin2:" + ByteAtATimeController.ADMIN_PASSWORD).toString("base64");
      const res = await request.post(p).set("Authorization", `basic: ${token}`).send();

      expect(res.status).to.equal(200);

      const body: IAdminResponse = res.body;
      expect(body.success).to.be.false;
      expect(body.flag).to.be.empty;


    });

    it("Should not have admin access (wrong password)", async () => {

      const token = Buffer.from("admin:asd").toString("base64");
      const res = await request.post(p).set("Authorization", `basic: ${token}`).send();

      expect(res.status).to.equal(200);

      const body: IAdminResponse = res.body;
      expect(body.success).to.be.false;
      expect(body.flag).to.be.empty;

    });

  });
});

