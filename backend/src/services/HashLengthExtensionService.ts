import { FlagService } from './FlagService'
import * as crypto from 'crypto'
import { ChallengeService } from './ChallengeService'

export class HashLengthExtensionService extends ChallengeService {

  public static DATA = "56476870637942706379427164584E30494746756233526F5A5849675A57467A644756794947566E5A793467534746325A534235623355675A6D3931626D51676447686C625342686247772F"
  public static KEY = "a".repeat(43)
  public static EXPECTED_SIGNATURE = "6a8267d997efd3eb87ffa2812de8ad97b66221f39139880d178f7639977bf569"

  public static sign(data: string): string {
    // latin1 is needed for this to work. UTF8 generates different hash
    return crypto.createHash('sha256').update(HashLengthExtensionService.KEY + data, "latin1").digest("hex")
  }
}