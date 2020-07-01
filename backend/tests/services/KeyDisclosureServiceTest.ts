
import { TestContext } from '@tsed/testing';
import { expect } from 'chai';
import { KeyDisclosureService } from '../../src/services/KeyDisclosureService';


describe("KeyDisclosureService", () => {

  before(TestContext.create);
  after(TestContext.reset);

  describe("Read Keys", () => {
    it("Should read public key", () => {
      expect(KeyDisclosureService.readPublicKey()).to.contain("-----BEGIN PUBLIC KEY-----");
    });

    it("Should read private key", () => {
      expect(KeyDisclosureService.readPrivateKey()).to.contain("-----BEGIN RSA PRIVATE KEY-----");
    });
  });


  it("Should encrypt and data", () => {
    const enc = KeyDisclosureService.encrypt("dvca");
    const decrypt = KeyDisclosureService.decrypt(enc, KeyDisclosureService.readPrivateKey());
    expect(decrypt).to.be.equal("dvca");
  });

  it("Should decrypt data", () => {
    const enc = "8d682671861f96f8105c1ffbafe1015cc03b3a6dc444ce732ccf3108202922a79c0f0b366d891aff694eb692ce6ec7972bacb7ebd25d456541851f13c43e8d852b7639c061a8c1831a52b8b3869f92c6ee89cf196a28bd05eb29a3b5ec92207ab79a1b6291a3d809713e8dfeb4dd39a2fda1e751c7829ce177dcecc1c48832a29b3356b685a42e3cc31e91e6c74062d04ca4470c9beacbbd0a073c855bb4af6e8db71841e161c74a24916890b9ab4e4e9827a10d7e008e9235cc50a9c7eef5cf522c5f5a828849ef794f7a41911e91d14389f533bfc32adfff2807e02f7729c956d2311153e6884b3ab9940841d837d6385c74e0aa93ac24c07a7ecce87f2531";
    expect(KeyDisclosureService.decrypt(enc, KeyDisclosureService.readPrivateKey())).to.be.equal("dvca");
  });








});
