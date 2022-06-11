
import { expect } from 'chai'
import { ICheckResponse, ICouponsResponse, InsecureRandomController } from '../../src/controllers/InsecureRandomController'
import { InsecureRandomService } from '../../src/services/InsecureRandomService'
import { request } from '../init'

describe("InsecureRandomController", () => {

  const path = "/random"

  describe("GET " + path, () => {

    it("Should generate 5 numbers", async () => {

      const res = await request.get(path)
      const content: ICouponsResponse = res.body

      expect(res.status).to.equal(200)
      expect(content.coupons.length).to.equal(5)

    })

  })

  describe("GET " + path + "/check", () => {


    it("Should validate successful guessed random value and return flag", async () => {

      const n = InsecureRandomController.nextCoupons[2]
      const p = path + "/check?couponCode=" + n

      const res = await request.get(p)
      const content: ICheckResponse = res.body

      expect(res.status).to.equal(200)
      expect(content.flag).to.eq(InsecureRandomService.getFlag())
      expect(content.valid).to.be.true

    })

  })

})
