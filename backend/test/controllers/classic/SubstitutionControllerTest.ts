
import { expect } from 'chai'
import { ICheckResponse, IResponse } from '../../../src/controllers/classic/SubstitutionController'
import { request } from '../../init'

describe("SubstitutionController", () => {

  const path = "/classic/substitution"

  describe("GET " + path, () => {

    it("Should get cipher", async () => {

      const res = await request.get(path)
      const content: IResponse = res.body

      expect(res.status).to.equal(200)
      expect(content.data).to.eq("lt dzu zg zhysum. olrp fv fsv hpg qlpq. dp nft tmp nffqu. dp ipzrp zt qzdg")

    })

  })

  describe("GET " + path + "/check", () => {

    const p = path + "/check"

    it("Should not be successfull", async () => {

      const res = await request.get(p + "?answer=" + "asd")
      const content: ICheckResponse = res.body

      expect(res.status).to.equal(200)
      expect(content.flag).to.be.empty
      expect(content.success).to.be.false

    })

    it("Should get flag", async () => {

      const res = await request.get(p + "?answer=" + "iwbodteld")
      const content: ICheckResponse = res.body

      expect(res.status).to.equal(200)
      expect(content.flag)
      expect(content.success).to.be.true

    })

  })


})