
import { expect } from 'chai'
import { IAccessRequest, IPaste } from '../../../src/controllers/jwt/AlgorithmNegotiationController'
import { AlgorithmNegotiationService, JWT } from '../../../src/services/AlgorithmNegotiationService'
import { request } from '../../init'

describe("AlgorithmNegotiationController", () => {

  const path = "/jwt/negotiation"

  describe("GET " + path + "/anonymousAccess", () => {

    it("Should generate anonymous token", async () => {

      const p = path + "/anonymousAccess"
      const res = await request.post(p)
      const content: IAccessRequest = res.body

      expect(res.status).to.equal(200)
      expect(content.token)

    })

  })


  describe("GET " + path + "/", () => {

    it("Should get public pastes", async () => {

      const token = AlgorithmNegotiationService.JWTToString(AlgorithmNegotiationService.generateJWT("ANONYMOUSUSER"))
      const res = await request.get(path).set("Authorization", token)
      const content: IPaste[] = res.body


      expect(res.status).to.equal(200)
      expect(content.length).to.equal(2)

    })

    it("Should get all pastes with signed jwt", async () => {


      const token = AlgorithmNegotiationService.JWTToString(AlgorithmNegotiationService.generateJWT("admin", true))
      const res = await request.get(path).set("Authorization", token)
      const content: IPaste[] = res.body

      expect(res.status).to.equal(200)
      expect(content.length).to.equal(3)

    })

    it("Should get all pastes with 'none' alg jwt", async () => {
      const oneYearFromNow = new Date()
      const timestamp = oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)

      const jwt: JWT = {
        header: { alg: "none", typ: "JWT" },
        payload: {
          sub: "admin",
          isAdmin: true,
          iat: Math.round(timestamp / 1000)
        },
        signature: ""
      }


      const token = AlgorithmNegotiationService.JWTToString(jwt)
      const res = await request.get(path).set("Authorization", token)
      const content: IPaste[] = res.body

      expect(res.status).to.equal(200)
      expect(content.length).to.equal(3)

    })


  })




})