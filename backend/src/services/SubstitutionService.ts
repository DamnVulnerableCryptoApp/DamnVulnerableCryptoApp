import { ChallengeService } from './ChallengeService';

export class SubstitutionService extends ChallengeService {
  public static SUBSTITUTIONS: Record<string, string> = {
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

  public static decrypt(content: string): string {

    // reverse the map and use encryption and we can decrypt :)
    const decryptionMap: Record<string, string> = {};
    Object.keys(SubstitutionService.SUBSTITUTIONS).forEach(k => {
      const v = SubstitutionService.SUBSTITUTIONS[k];
      decryptionMap[v] = k;
    });

    return SubstitutionService.encrypt(content, decryptionMap);

  }

  public static encrypt(content: string, map = SubstitutionService.SUBSTITUTIONS): string {
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