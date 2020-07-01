
import { TestContext } from '@tsed/testing';
import { expect } from 'chai';
import { AlgorithmNegotiationService, JWT } from '../../src/services/AlgorithmNegotiationService';


describe("AlgorithmNegotiationService", () => {

  before(TestContext.create);
  after(TestContext.reset);

  describe("Generate JWT", () => {
    it("Should generate jwt", () => {
      const oneYearFromNow = new Date();
      const timestamp = 123123123;

      const jwt = AlgorithmNegotiationService.generateJWT("dvca", true, timestamp);

      expect(jwt);
      expect(jwt.header.alg).to.equal("HS256");
      expect(jwt.header.typ).to.equal("JWT");

      expect(jwt.payload.sub).to.equal("dvca");
      expect(jwt.payload.isAdmin).to.equal(true);
      expect(jwt.payload.iat).to.equal(123123);
    });

    it("Should generate jwt and convert to string", () => {
      const oneYearFromNow = new Date();
      const timestamp = 123123123;

      const jwt = AlgorithmNegotiationService.generateJWT("dvca", true, timestamp);
      expect(AlgorithmNegotiationService.JWTToString(jwt)).to.be.equal("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkdmNhIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxMjMxMjN9.7c55y69UKqGX59tWMP-rFJ93vag3tqvpWoCyaC7sxyk");

    });
  });

  describe("parseToken", () => {
    it("Should parse and validate jwt", () => {
      const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkdmNhIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxMjMxMjN9.7c55y69UKqGX59tWMP-rFJ93vag3tqvpWoCyaC7sxyk";
      const parsed = AlgorithmNegotiationService.parseToken(jwt);

      expect(parsed);
      expect(parsed.header.alg).to.equal("HS256");
      expect(parsed.header.typ).to.equal("JWT");

      expect(parsed.payload.sub).to.equal("dvca");
      expect(parsed.payload.isAdmin).to.equal(true);
      expect(parsed.payload.iat).to.equal(123123);
    });

    it("Should throw error because of bad signature", () => {
      const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkdmNhIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxMjMxMjN9.7c55y69UKqGX59tWMP-rFJ93vag3tqvpWoCyaC7sxy";
      expect(() => AlgorithmNegotiationService.parseToken(jwt)).to.throw();
    });

    it("Should parse successfully token with alg none", () => {

      const jwt: JWT = { header: { alg: 'none', typ: "JWT", }, payload: { sub: 'dvca', iat: 123123, isAdmin: true }, signature: "" };

      const jwtString = AlgorithmNegotiationService.JWTToString(jwt);
      const parsed = AlgorithmNegotiationService.parseToken(jwtString);

      expect(parsed);
      expect(parsed.header.alg).to.equal("none");
      expect(parsed.header.typ).to.equal("JWT");

      expect(parsed.payload.sub).to.equal("dvca");
      expect(parsed.payload.isAdmin).to.equal(true);
      expect(parsed.payload.iat).to.equal(123123);

    });
  });



});
