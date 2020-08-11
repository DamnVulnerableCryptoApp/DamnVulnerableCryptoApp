
import { ExpressApplication } from '@tsed/common';
import { TestContext } from '@tsed/testing';
import { expect } from 'chai';
import * as SuperTest from "supertest";
import { IHistoryEntry, IRequest } from '../../../src/controllers/rc4/KnownPlainTextController';
import { Server } from "../../../src/Server";
import { KnownPlainTextService } from '../../../src/services/KnownPlainTextService';


describe("KownPlainTextController", () => {

  let request: SuperTest.SuperTest<SuperTest.Test>;
  before(TestContext.bootstrap(Server));
  before(TestContext.inject([ExpressApplication], (expressApplication: ExpressApplication) => {
    request = SuperTest(expressApplication);
  }));

  const path = "/rc4/known-plaintext-key-reuse";

  after(TestContext.reset);

  describe("GET " + path + "/history", () => {

    it("Should get initial history", async () => {
      const p = path + "/history";

      const res = await request.get(p);
      const content: IHistoryEntry[] = res.body;

      expect(res.status).to.equal(200);
      expect(content.length).to.equal(2);

    });

    it("Should encrypt and add to history", async () => {

      const p = path + "/encrypt";
      const body: IRequest = { data: "test" };
      const res = await request.post(p).send(body);
      const content: IHistoryEntry = res.body;

      expect(res.status).to.equal(200);
      expect(content.encryptedContent).to.equal(KnownPlainTextService.encrypt("test"));

      const p2 = path + "/history";

      const res2 = await request.get(p2);
      const content2: IHistoryEntry[] = res2.body;

      expect(res2.status).to.equal(200);
      expect(content2.length).to.equal(3);

    });

  });

});
