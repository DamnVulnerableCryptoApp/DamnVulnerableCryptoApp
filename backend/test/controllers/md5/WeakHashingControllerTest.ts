
import { expect } from 'chai'
import { ICheckResponse, ILogin } from '../../../src/controllers/md5/WeakHashingController'
import { WeakHashingService } from '../../../src/services/WeakHashingService'
import { request } from '../../init'

describe("WeakHashingController", () => {

  const path = "/md5/login"

  describe("POST " + path, () => {

    it("Should login and get flag", async () => {

      const body: ILogin = { username: "admin", password: WeakHashingService.ADMIN_PASSWORD }
      const res = await request.post(path).send(body)
      const content: ICheckResponse = res.body

      expect(res.status).to.equal(200)
      expect(content.flag)
      expect(content.success).to.be.true

    })

    it("Should fail login", async () => {

      const body: ILogin = { username: "admin", password: "badpassword" }
      const res = await request.post(path).send(body)
      const content: ICheckResponse = res.body

      expect(res.status).to.equal(200)
      expect(content.flag).to.be.empty
      expect(content.success).to.be.false

    })

  })

})
