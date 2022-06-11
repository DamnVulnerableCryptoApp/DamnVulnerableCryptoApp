import { ChecksumCollisionService } from '../../services/ChecksumCollisionService'
import BaseController from '../BaseController'

interface ICheckResponse {
  success: boolean
  flag: string
}

// to exploit this there are a few tools, and script to automate them.
// I like to use https://github.com/thereal1024/python-md5-collision. its a small and automated python script on top of fastcol
// to make it work smoothly you need to:
// sudo apt-get install libboost-all-dev
// python3 gen_coll_c.py
// this will compile the c template in the project folder and create two different files.
export class ChecksumCollisionsController extends BaseController {
  public async checksum(): Promise<ICheckResponse> {

    // https://stackoverflow.com/a/70799312
    const files = this.req.files as { [fieldname: string]: Express.Multer.File[] }

    const file1 = files["file1"][0]
    const file2 = files["file2"][0]

    let success = false
    let flag = ""
    const md51 = await (ChecksumCollisionService.getMd5FileChecksum(file1.buffer))
    const md52 = await (ChecksumCollisionService.getMd5FileChecksum(file2.buffer))

    if (md51 === md52) {

      const sha11 = await (ChecksumCollisionService.getSha1FileChecksum(file1.buffer))
      const sha12 = await (ChecksumCollisionService.getSha1FileChecksum(file2.buffer))


      if (sha11 !== sha12) {
        success = true
        flag = ChecksumCollisionService.getFlag()
      }
    }

    return { flag, success }
  }
}
