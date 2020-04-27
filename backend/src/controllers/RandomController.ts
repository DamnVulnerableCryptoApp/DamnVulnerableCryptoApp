import { Controller, Get, QueryParams } from '@tsed/common';



@Controller("/random")
export class Random {

  nextCoupons: number[];
  currentCoupons: number[];
  static FLAG = "83939130-daa9-4878-ab18-5d5edac5fead";

  @Get("/")
  public async index() {

    this.nextCoupons = [];
    this.currentCoupons = [];

    for (let i = 0; i < 5; i++)
      this.currentCoupons.push(Math.random());

    for (let i = 0; i < 5; i++)
      this.nextCoupons.push(Math.random());

    console.log("Generated 5 coupons: " + this.currentCoupons.toString() + " - and 5 to be predicted: " + this.nextCoupons.toString());

    return { coupons: this.currentCoupons };
  }


  // https://github.com/TACIXAT/XorShift128Plus
  // this is the project that predicts the Math.random implementation from firefox and chrome
  // I couldn't make it work properly with the older version of V8.
  // so this was tested successfully only with node v12 which already has new v8 implementation (XorShift128 instead of XorShift128+)
  // also, to make this work install z3-solver:
  // pip install z3-solver
  // more about js random: https://gist.github.com/joepie91/7105003c3b26e65efcea63f3db82dfba
  @Get("/check")
  public async check(@QueryParams("couponCode") code: number) {
    if (this.currentCoupons.includes(code))
      return { valid: true, flag: "" };
    else if (this.nextCoupons.includes(code))
      return { valid: true, flag: Random.FLAG };
    else
      return { flag: "", valid: false };
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