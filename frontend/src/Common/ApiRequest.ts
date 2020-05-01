export default class ApiRequest {



  protected static async do(path: string, params?: RequestInit, upload = false): Promise<any> {
    return new Promise((resolve, reject) => {

      if (!params) params = {};

      // force json content type
      if (!params.headers) params.headers = {};
      const headers: any = params.headers;

      if (!upload) headers['content-type'] = 'application/json';

      params.headers = headers;

      const url = `${ApiRequest.getApiUrl()}${path}`;
      fetch(url, params).then((res) => res.json()).then((response) => {
        resolve(response);
      }).catch(ex => reject(ex));

    });
  }



  protected static getApiUrl(): string {
    const runninPort = window.location.port || 80;
    const port = process.env.NODE_ENV === "development" ? 1234 : runninPort;
    const server = `${window.location.protocol}//${window.location.hostname}`;

    return `${server}:${port}`;
  }


}