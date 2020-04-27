import { Controller, Post, Property } from "@tsed/common";
import { MultipartFile } from "@tsed/multipartfiles";
import { Description, Example, Returns } from '@tsed/swagger';
import * as crypto from 'crypto';
import * as fs from 'fs';


class ResponseModel {

  @Example("11111111-1111-1111-1111-111111111111")
  @Description("Returns empty if operation not succeeded")
  @Property() flag: string;
  @Property() success: boolean;
}



@Controller("/md5")
export class ChecksumCollisitonsController {

  static FLAG = "2e1e19ae-8674-11ea-bc55-0242ac130003";



  // to exploit this there are a few tools, and script to automate them.
  // I like to use https://github.com/thereal1024/python-md5-collision. its a small and automated python script on top of fastcol
  // to make it work smoothly you need to:
  // sudo apt-get install libboost-all-dev
  // python3 gen_coll_c.py
  // this will compile the c template in the project folder and create two different files.
  @Post("/checksum")
  @Description("Receives the two files and checks if they have same md5 hash and if they are different")
  @Returns(ResponseModel)
  public async checksum(
    @MultipartFile("file1") file1: Express.Multer.File,
    @MultipartFile("file2") file2: Express.Multer.File
  ): Promise<ResponseModel> {

    let success = false;
    let flag = "";
    const md51 = await (this.getMd5FileChecksum(file1));
    const md52 = await (this.getMd5FileChecksum(file2));

    if (md51 === md52) {

      const sha11 = await (this.getSha1FileChecksum(file1));
      const sha12 = await (this.getSha1FileChecksum(file1));


      if (sha11 === sha12) {
        success = true;
        flag = ChecksumCollisitonsController.FLAG;
      }
    }

    fs.unlink(file1.path, () => { });
    fs.unlink(file2.path, () => { });

    return { flag, success };

  }


  private getMd5FileChecksum(file: Express.Multer.File): Promise<string> {
    const hash = crypto.createHash('md5');

    return this.getFileChecksum(hash, file);
  }

  private getSha1FileChecksum(file: Express.Multer.File): Promise<string> {
    const hash = crypto.createHash('sha1');

    return this.getFileChecksum(hash, file);
  }

  private getFileChecksum(hash: crypto.Hash, file: Express.Multer.File): Promise<string> {

    return new Promise((resolve, reject) => {

      const stream = fs.createReadStream(file.path);
      stream.on('data', (data) => hash.update(data));
      stream.on('end', () => resolve(hash.digest('hex')));

    });
  }



}
