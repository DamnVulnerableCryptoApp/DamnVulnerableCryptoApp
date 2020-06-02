import { Controller, Post } from "@tsed/common";
import { MultipartFile } from "@tsed/multipartfiles";
import * as fs from 'fs';
import { ChecksumCollisionService } from '../../services/ChecksumCollisionService';

interface ICheckResponse {
  success: boolean;
  flag: string;
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
  public async checksum(
    @MultipartFile("file1") file1: Express.Multer.File,
    @MultipartFile("file2") file2: Express.Multer.File
  ): Promise<ICheckResponse> {

    let success = false;
    let flag = "";
    const md51 = await (ChecksumCollisionService.getMd5FileChecksum(file1.path));
    const md52 = await (ChecksumCollisionService.getMd5FileChecksum(file2.path));

    if (md51 === md52) {

      const sha11 = await (ChecksumCollisionService.getSha1FileChecksum(file1.path));
      const sha12 = await (ChecksumCollisionService.getSha1FileChecksum(file2.path));


      if (sha11 === sha12) {
        success = true;
        flag = ChecksumCollisitonsController.FLAG;
      }
    }

    fs.unlink(file1.path, () => { });
    fs.unlink(file2.path, () => { });

    return { flag, success };

  }


}
