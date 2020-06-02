
import { ExpressApplication } from '@tsed/common';
import { TestContext } from '@tsed/testing';
import { expect } from 'chai';
import * as SuperTest from "supertest";
import { IAccessRequest, IPaste } from '../../../src/controllers/jwt/AlgorithmDowngradeController';
import { Server } from "../../../src/Server";
import { AlgorithmDowngradeService, JWT } from '../../../src/services/AlgorithmDowngradeService';


describe("AlgorithmDowngradeController", () => {

  let request: SuperTest.SuperTest<SuperTest.Test>;
  before(TestContext.bootstrap(Server));
  before(TestContext.inject([ExpressApplication], (expressApplication: ExpressApplication) => {
    request = SuperTest(expressApplication);
  }));

  const path = "/jwt/downgrade";

  after(TestContext.reset);

  describe("GET " + path + "/anonymousAccess", () => {

    it("Should generate anonymous token", async () => {

      const p = path + "/anonymousAccess";
      const res = await request.post(p);
      const content: IAccessRequest = res.body;

      expect(res.status).to.equal(200);
      expect(content.token);

    });

  });


  describe("GET " + path + "/", () => {

    it("Should get public pastes", async () => {

      const token = AlgorithmDowngradeService.JWTToString(AlgorithmDowngradeService.generateJWT("ANONYMOUSUSER"));
      const res = await request.get(path).set("Authorization", token);
      const content: IPaste[] = res.body;


      expect(res.status).to.equal(200);
      expect(content.length).to.equal(2);

    });

    it("Should get all pastes with signed jwt", async () => {


      const token = AlgorithmDowngradeService.JWTToString(AlgorithmDowngradeService.generateJWT("admin", true));
      const res = await request.get(path).set("Authorization", token);
      const content: IPaste[] = res.body;

      expect(res.status).to.equal(200);
      expect(content.length).to.equal(3);

    });

    it("Should get all pastes with 'none' alg jwt", async () => {
      const oneYearFromNow = new Date();
      const timestamp = oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

      const jwt: JWT = {
        header: { alg: "none", typ: "JWT" },
        payload: {
          sub: "admin",
          isAdmin: true,
          iat: Math.round(timestamp / 1000)
        },
        signature: ""
      };


      const token = AlgorithmDowngradeService.JWTToString(jwt);
      const res = await request.get(path).set("Authorization", token);
      const content: IPaste[] = res.body;

      expect(res.status).to.equal(200);
      expect(content.length).to.equal(3);

    });


  });




});