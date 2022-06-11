import { expect } from 'chai'
import { describe } from 'mocha'
import { FlagService } from '../../src/services/FlagService'
import { IvDetectionService } from '../../src/services/IvDetectionService'
import { KnownPlainTextService } from '../../src/services/KnownPlainTextService'
import { PaddingOracleService } from '../../src/services/PaddingOracleService'

describe("FlagService", () => {

  describe("List Services", () => {
    it("Should list existing services", () => {

      // @ts-ignore
      const services = FlagService.listServices()
      expect(services).to.include(PaddingOracleService.name)
      expect(services).to.include(IvDetectionService.name)
      expect(services).to.include(KnownPlainTextService.name)
    })
  })

  describe("Generate Flag", () => {
    it("Should generate uuid formated flag", () => {
      // @ts-ignore
      expect(FlagService.generateFlag()).to.match(/[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/)
    })
  })

  describe("Create or Load Flags", () => {


    it("Should create flag file", () => {
      FlagService.deleteFlagFile()

      // @ts-ignore
      const exists = FlagService.flagFileExists()
      expect(exists).to.be.false

      FlagService.createOrLoadFlags()

      // @ts-ignore
      const exists2 = FlagService.flagFileExists()
      expect(exists2).to.be.true

    })

    it("Should read flags", () => {
      FlagService.forceCreateFlags()
      // @ts-ignore
      const flags = FlagService.readFlags()
      expect(flags[KnownPlainTextService.name]).to.exist
    })
  })


})