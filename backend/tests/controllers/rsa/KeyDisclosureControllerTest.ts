
import { ExpressApplication } from '@tsed/common';
import { TestContext } from '@tsed/testing';
import { expect } from 'chai';
import * as SuperTest from "supertest";
import { IDecryptInbox, IDecryptInboxResponse } from '../../../src/controllers/rsa/KeyDisclosureController';
import { Server } from "../../../src/Server";
import { KeyDisclosureService } from '../../../src/services/KeyDisclosureService';


describe("KeyDisclosureController", () => {

  let request: SuperTest.SuperTest<SuperTest.Test>;
  before(TestContext.bootstrap(Server));
  before(TestContext.inject([ExpressApplication], (expressApplication: ExpressApplication) => {
    request = SuperTest(expressApplication);
  }));

  const path = "/rsa/key-disclosure";

  after(TestContext.reset);



  describe("POST " + path + "/decrypt-mailbox", () => {

    it("Should decrypt mailbox", async () => {
      const p = path + "/decrypt-mailbox";
      const body: IDecryptInbox = { privateKey: KeyDisclosureService.readPrivateKey() };
      const res = await request.post(p).send(body);
      const content: IDecryptInboxResponse = res.body;

      expect(res.status).to.equal(200);
      expect(content.success).to.be.true;
      expect(content.flag).to.equal(KeyDisclosureService.getFlag());
      expect(content.emails.length).to.eq(2);

    });

    it("Shouldn't decrypt mailbox", async () => {
      const p = path + "/decrypt-mailbox";
      const body: IDecryptInbox = { privateKey: KeyDisclosureService.readPublicKey() };
      const res = await request.post(p).send(body);
      const content: IDecryptInboxResponse = res.body;

      expect(res.status).to.equal(200);
      expect(content.success).to.be.false;
      expect(content.flag).to.be.empty;
      expect(content.emails.length).to.eq(0);

    });

  });

});
