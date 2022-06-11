
import { expect } from 'chai'
import { IAccessResponse } from '../../../src/controllers/aes/PaddingOracleController'
import { PaddingOracleService } from '../../../src/services/PaddingOracleService'
import { request } from '../../init'

describe("PaddingOracleController", () => {

  const path = "/aes/cbc/padding-oracle"

  describe("GET " + path, () => {

    it("Should generate a token", async () => {

      const res = await request.get(path)
      const content: IAccessResponse = res.body

      expect(res.status).to.equal(200)
      expect(content.token)

    })

  })

  describe("GET " + path + "/isAdmin", () => {
    const p = path + "/isAdmin"

    it("should return a padding error", async () => {

      const c = PaddingOracleService.encryptToken("test")
      const res = await request.get(p).set("token", c.replace(/^\w\w/, "FF"))

      expect(res.status).to.equal(500)
      expect(res.text).to.include("bad decrypt")

    })

    it("it should decrypt a good message", async () => {

      const c = PaddingOracleService.encryptToken("test")
      const res = await request.get(p).set("token", c)

      expect(res.status).to.equal(200)

    })

  })

})

