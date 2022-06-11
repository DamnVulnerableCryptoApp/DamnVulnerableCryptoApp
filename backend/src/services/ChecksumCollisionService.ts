import * as crypto from 'crypto'
import { ChallengeService } from './ChallengeService'

export class ChecksumCollisionService extends ChallengeService {

  public static getMd5FileChecksum(file: Buffer): string {
    const hash = crypto.createHash('md5')

    return ChecksumCollisionService.getFileChecksum(hash, file)
  }

  public static getSha1FileChecksum(file: Buffer): string {
    const hash = crypto.createHash('sha1')

    return ChecksumCollisionService.getFileChecksum(hash, file)
  }

  public static getFileChecksum(hash: crypto.Hash, fileContent: Buffer): string {
    hash.update(fileContent)

    return hash.digest('hex')
  }
}