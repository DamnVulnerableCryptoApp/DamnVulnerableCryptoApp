import * as crypto from 'crypto';
import * as fs from 'fs';
import { ChallengeService } from './ChallengeService';

export class ChecksumCollisionService extends ChallengeService {

  public static getMd5FileChecksum(file: string): Promise<string> {
    const hash = crypto.createHash('md5');

    return ChecksumCollisionService.getFileChecksum(hash, file);
  }

  public static getSha1FileChecksum(file: string): Promise<string> {
    const hash = crypto.createHash('sha1');

    return ChecksumCollisionService.getFileChecksum(hash, file);
  }

  public static getFileChecksum(hash: crypto.Hash, file: string): Promise<string> {

    return new Promise((resolve, reject) => {

      const stream = fs.createReadStream(file);
      stream.on('data', (data) => hash.update(data));
      stream.on('end', () => resolve(hash.digest('hex')));

    });
  }
}