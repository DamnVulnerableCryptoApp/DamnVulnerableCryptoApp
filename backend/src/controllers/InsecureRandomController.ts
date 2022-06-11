import { InsecureRandomService } from '../services/InsecureRandomService'
import BaseController from './BaseController'

export interface ICouponsResponse {
  coupons: number[]
}

export interface ICheckResponse {
  valid: boolean
  flag: string
}

export class InsecureRandomController extends BaseController {

  static nextCoupons: number[]
  static currentCoupons: number[]

  // IMPORTANT:
  // this challenge may have problems if being served to more then one person...
  // since the nextcoupons will be overriden
  public index(): ICouponsResponse {
    InsecureRandomController.currentCoupons = InsecureRandomService.generate5RandomValues(5)
    InsecureRandomController.nextCoupons = InsecureRandomService.generate5RandomValues(5)

    console.info("Generated 5 coupons: " + InsecureRandomController.currentCoupons.toString() + " - and 5 to be predicted: " + InsecureRandomController.nextCoupons.toString())

    return { coupons: InsecureRandomController.currentCoupons }
  }


  public check(): ICheckResponse {
    const code = parseFloat(this.getQueryParam("couponCode"))

    if (InsecureRandomController.currentCoupons.includes(code))
      return { valid: true, flag: "" }
    else if (InsecureRandomController.nextCoupons.includes(code))
      return { valid: true, flag: InsecureRandomService.getFlag() }
    else
      return { flag: "", valid: false }
  }

  // function mulberry32(a) {
  //   return function() {
  //     var t = a += 0x6D2B79F5;
  //     t = Math.imul(t ^ t >>> 15, t | 1);
  //     t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  //     return ((t ^ t >>> 14) >>> 0) / 4294967296;
  //   }
  // }

  // https://stackoverflow.com/a/47593316
}