
import { ExpressApplication } from '@tsed/common';
import { TestContext } from '@tsed/testing';
import { expect } from 'chai';
import * as SuperTest from "supertest";
import { ICheckResponse, IResponse } from '../../../src/controllers/classic/SubstitutionController';
import { Server } from "../../../src/Server";


describe("SubstitutionController", () => {

  let request: SuperTest.SuperTest<SuperTest.Test>;
  before(TestContext.bootstrap(Server));
  before(TestContext.inject([ExpressApplication], (expressApplication: ExpressApplication) => {
    request = SuperTest(expressApplication);
  }));

  const path = "/classic/substitution";

  after(TestContext.reset);

  describe("GET " + path, () => {

    it("Should get cipher", async () => {

      const res = await request.get(path);
      const content: IResponse = res.body;

      expect(res.status).to.equal(200);
      expect(content.data).to.eq("lt dzu zg zhysum. olrp fv fsv hpg qlpq. dp nft tmp nffqu. dp ipzrp zt qzdg");

    });

  });

  describe("GET " + path + "/check", () => {

    const p = path + "/check";

    it("Should not be successfull", async () => {

      const res = await request.get(p + "?answer=" + "asd");
      const content: ICheckResponse = res.body;

      expect(res.status).to.equal(200);
      expect(content.flag).to.be.empty;
      expect(content.success).to.be.false;

    });

    it("Should get flag", async () => {

      const res = await request.get(p + "?answer=" + "iwbodteld");
      const content: ICheckResponse = res.body;

      expect(res.status).to.equal(200);
      expect(content.flag);
      expect(content.success).to.be.true;

    });

  });


});