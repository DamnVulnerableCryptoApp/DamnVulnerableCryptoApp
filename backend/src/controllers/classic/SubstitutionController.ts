import { Controller, Get, QueryParams } from "@tsed/common";


@Controller("/classic/substitution")
export class SubstitutionController {


  static FLAG = "1595832a-563e-414b-9c0c-a7dd9b6975a0";
  static SUBSTITUTIONS: Record<string, string> = {
    "a": "z",
    "b": "y",
    "c": "x",
    "d": "q",
    "e": "p",
    "f": "o",
    "g": "n",
    "h": "m",
    "i": "l",
    "j": "k",
    "k": "j",
    "l": "i",
    "m": "h",
    "n": "g",
    "o": "f",
    "p": "e",
    "q": "w",
    "r": "v",
    "s": "u",
    "t": "t",
    "u": "s",
    "v": "r",
    "w": "d",
    "x": "c",
    "y": "b",
    "z": "a"
  };



  @Get("/")
  public index() {
    const enc = this.encrypt("It was an ambush. Five or our men died. We got the goods. We leave at dawn");

    return { data: enc };
  }


  // zyxqponmlkjihgfewvutsrdcba
  // a normal substitution cypher that translates to:
  // It was an ambush. Five or our men died. We got the goods. We leave at dawn
  // this can be manually decrypted by studying letter frequency
  // now a daws there are awesome websites that do this automatically
  // https://quipqiup.com/
  // [1, 4, 13, 27, 35, 46, 49, 62, 71]
  // these are just possitions of the letters to get:
  // iwbodteld
  @Get("/check")
  public check(@QueryParams("answer") answer: string) {
    return answer === "iwbodteld" ? { flag: SubstitutionController.FLAG } : { flag: "" };
  }


  private decrypt(content: string): string {

    // reverse the map and use encryption and we can decrypt :)
    const decryptionMap: Record<string, string> = {};
    Object.keys(SubstitutionController.SUBSTITUTIONS).forEach(k => {
      const v = SubstitutionController.SUBSTITUTIONS[k];
      decryptionMap[v] = k;
    });

    return this.encrypt(content, decryptionMap);

  }

  private encrypt(content: string, map = SubstitutionController.SUBSTITUTIONS): string {
    content = content.toLowerCase();
    let newContent = "";

    for (let i = 0; i < content.length; i++) {
      const c = content.charAt(i);
      let d: string = map[c];
      if (!d) d = c; // if we do not find a corresponding letter, leave the original


      newContent += d;
    }

    return newContent;
  }


}
