
import { ExpressApplication } from '@tsed/common';
import { TestContext } from '@tsed/testing';
import { expect } from 'chai';
import * as SuperTest from "supertest";
import { IResponse } from '../../../src/controllers/aes/IvDetectionController';
import { Server } from "../../../src/Server";
import { IvDetectionService } from '../../../src/services/IVDetectionService';


describe("IVDetectionController", () => {

  let request: SuperTest.SuperTest<SuperTest.Test>;
  before(TestContext.bootstrap(Server));
  before(TestContext.inject([ExpressApplication], (expressApplication: ExpressApplication) => {
    request = SuperTest(expressApplication);
  }));

  const path = "/aes/cbc/iv-detection";

  after(TestContext.reset);

  describe("POST " + path + "/send", () => {

    it("Should reply with 200", async () => {

      const p = path + "/send";
      const res = await request.post(p).send({ data: "something" });
      expect(res.status).to.equal(200);
    });

  });

  describe("POST " + path + "/encrypt", () => {

    const p = path + "/encrypt";
    it("Should encrypt data", async () => {

      const res = await request.post(p).send({ data: "test" });
      expect(res.status).to.equal(200);

      const body: IResponse = res.body;
      expect(body.data).to.eq(IvDetectionService.encryptData("test"));
      expect(body.flag).to.be.empty;
    });

    it("Should recognize the IV and retrieve flag", async () => {

      const res = await request.post(p).send({ data: IvDetectionService.IV });
      expect(res.status).to.equal(200);

      const body: IResponse = res.body;
      expect(body.flag).to.eq(IvDetectionService.FLAG);
    });

  });


});

