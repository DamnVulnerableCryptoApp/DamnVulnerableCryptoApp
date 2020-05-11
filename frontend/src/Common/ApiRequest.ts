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
      }).catch(ex => {
        reject(ex);
      });

    });
  }


  public static serverPort(): number {
    const runningPort = window.location.port || 80;
    let port = parseInt(runningPort.toString(), 10);

    if (process?.env?.NODE_ENV === "development") {

      if (process?.env?.REACT_APP_SERVER_PORT)
        port = parseInt(process.env.REACT_APP_SERVER_PORT, 10);
      else
        port = 1234; // if no port specified we are going to assume its the default, 1234
    }

    return port;
  }


  public static getApiUrl(): string {
    const port = ApiRequest.serverPort();

    return `${window.location.protocol}//${window.location.hostname}:${port}`;

  }


}