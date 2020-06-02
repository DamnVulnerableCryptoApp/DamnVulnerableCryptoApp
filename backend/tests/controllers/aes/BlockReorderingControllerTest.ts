
import { ExpressApplication } from '@tsed/common';
import { TestContext } from '@tsed/testing';
import { expect } from 'chai';
import * as SuperTest from "supertest";
import { IAdminResponse } from '../../../src/controllers/aes/BlockReorderingController';
import { Server } from "../../../src/Server";
import { BlockReorderingService } from '../../../src/services/BlockReorderingService';


describe("BlockReorderingController", () => {

  let request: SuperTest.SuperTest<SuperTest.Test>;
  before(TestContext.bootstrap(Server));
  before(TestContext.inject([ExpressApplication], (expressApplication: ExpressApplication) => {
    request = SuperTest(expressApplication);
  }));

  const path = "/aes/ecb/block-reordering";

  after(TestContext.reset);

  describe("GET " + path, () => {

    it("Should generate a token", async () => {

      const res = await request.get(path);
      const content = res.body;

      expect(res.status).to.equal(200);
      expect(content.token);

    });

  });

  describe("GET" + path + "/isAdmin", () => {
    it("Should be admin", async () => {

      const adminToken = BlockReorderingService.createToken("someuser", true);
      const res = await request.get(path + "/isAdmin").set("token", adminToken);
      const content: IAdminResponse = res.body;

      expect(res.status).to.equal(200);
      expect(content.flag.length).to.be.above(0);
      expect(content.isAdmin).to.be.true;
    });


    it("Should not be admin", async () => {

      const adminToken = BlockReorderingService.createToken("someuser");
      const res = await request.get(path + "/isAdmin").set("token", adminToken);
      const content: IAdminResponse = res.body;

      expect(res.status).to.equal(200);
      expect(content.flag).to.be.empty;
      expect(content.isAdmin).to.be.false;
    });
  });
});

