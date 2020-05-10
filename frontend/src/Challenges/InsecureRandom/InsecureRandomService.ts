import ApiRequest from "../../Common/ApiRequest";

interface CheckResponse {
  valid: boolean;
  flag: string;
}

export class InsecureRandomService extends ApiRequest {


  public static CHALLENGEPATH = `/random`;



  public static async getCoupons(): Promise<number[]> {
    return new Promise((resolve, reject) => {

      const path = `${InsecureRandomService.CHALLENGEPATH}/`;
      super.do(path).then(res => resolve(res.coupons)).catch(ex => reject(ex));

    });
  }

  public static async checkCoupon(coupon: string): Promise<CheckResponse> {
    const c = InsecureRandomService.unformatCoupon(coupon);
    const path = `${InsecureRandomService.CHALLENGEPATH}/check?couponCode=${c}`;

    return super.do(path);
  }

  public static formatCoupon(coupon: number): string {
    let c = coupon.toString();
    c = c.replace("0.", "");

    const length = c.length;
    const enforceLength = 20 - length;
    const padding = "0".repeat(enforceLength);

    c = c + padding;

    const formatted = c.substring(0, 4) + "-" + c.substring(4, 8) + "-" + c.substring(8, 12) + "-" + c.substring(12, 16) + "-" + c.substring(16, 20);

    return formatted;
  }

  public static unformatCoupon(coupon: string): number {
    coupon = "0." + coupon.replace("DVCAPP-", "").replace(/-/g, "");

    return parseFloat(coupon);
  }

}
