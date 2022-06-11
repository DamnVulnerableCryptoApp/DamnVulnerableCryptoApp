
import { expect } from 'chai'
import { IForgotPasswordRequest, IForgotPasswordResponse, ILoginRequest, ILoginResponse } from '../../src/controllers/TimingAttackController'
import { TimingAttackService } from '../../src/services/TimingAttackService'
import { request } from '../init'

describe("TimingAttackController", () => {

  const path = "/timing-attack"

  describe("POST " + path + "/login", () => {

    it("Should fail login", async () => {

      const data: ILoginRequest = { password: "", username: "some" }
      const res = await request.post(path + "/login").send(data)
      const content: ILoginResponse = res.body

      expect(res.status).to.equal(200)
      expect(content.success).to.be.false

    })

  })

  describe("POST " + path + "/forgot-password", () => {

    it("should not return the flag", async () => {
      const p = path + "/forgot-password"
      const data: IForgotPasswordRequest = { username: "abel1" }
      const res = await request.post(p).send(data)
      const content: IForgotPasswordResponse = res.body
      expect(res.status).to.equal(200)
      expect(content.success).to.be.true
      expect(content.flag).to.be.empty

    })

    it("should return the flag", async () => {
      const p = path + "/forgot-password"
      const data: IForgotPasswordRequest = { username: "abel" }
      const res = await request.post(p).send(data)
      const content: IForgotPasswordResponse = res.body

      expect(res.status).to.equal(200)
      expect(content.success).to.be.true
      expect(content.flag).to.be.eq(TimingAttackService.getFlag())

    })

  })

})
