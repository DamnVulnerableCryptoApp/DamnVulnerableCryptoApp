import ApiRequest from "../../Common/ApiRequest";

interface ICheckResponse {
  success: boolean;
  flag: string;
}



export default class ChecksumCollisionService extends ApiRequest {
  public static CHALLENGEPATH = `/md5/checksum/`;

  public static sendFiles(file1: File, file2: File): Promise<ICheckResponse> {
    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);

    return super.do(ChecksumCollisionService.CHALLENGEPATH, { method: 'POST', body: formData }, true);

  }
}