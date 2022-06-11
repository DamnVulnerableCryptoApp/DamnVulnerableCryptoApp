
import { expect } from 'chai'
import fs from 'fs'
import { describe } from 'mocha'
import { ChecksumCollisionService } from '../../src/services/ChecksumCollisionService'

describe("ChecksumCollisionService", () => {

  it("Should calculate md5 hash", async () => {
    const r = await ChecksumCollisionService.getMd5FileChecksum(fs.readFileSync(__dirname + "/../../src/config/publickey.pem"))
    expect(r).to.be.equal("6e3abd9cef2163cb37ff4936a72df849")
  })


  it("Should calculate sha1 hash", async () => {
    const r = await ChecksumCollisionService.getSha1FileChecksum(fs.readFileSync(__dirname + "/../../src/config/publickey.pem"))
    expect(r).to.be.equal("81ccb0bac342760799493de699407fc9d3803e96")
  })
})
