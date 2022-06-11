export default class ApiRequest {

  public static fetchWithTimeout(url: string, options: any = {}, timeout = 7000): Promise<any> {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), timeout)
      )
    ])
  }



  protected static async do(path: string, params?: RequestInit, upload = false): Promise<any> {
    return new Promise((resolve, reject) => {

      if (!params) params = {}

      // force json content type
      if (!params.headers) params.headers = {}
      const headers: any = params.headers

      if (!upload) headers['content-type'] = 'application/json'

      params.headers = headers

      const url = `${ApiRequest.getApiUrl()}${path}`
      ApiRequest.fetchWithTimeout(url, params).then((res) => res.json()).then((response) => {
        resolve(response)
      }).catch(ex => {
        reject(ex)
      })

    })
  }


  public static serverPort(): number {
    const runningPort = window.location.port || 80
    let port = parseInt(runningPort.toString())

    let p: any = { env: {} }
    if (typeof process !== 'undefined') p = process

    if (p.env?.NODE_ENV === "development") {

      if (p?.env?.REACT_APP_SERVER_PORT)
        port = parseInt(p.env.REACT_APP_SERVER_PORT)
      else
        port = 4000 // if no port specified we are going to assume its the default, 4000
    }

    return port
  }


  public static getApiOrigin(): string {
    const port = ApiRequest.serverPort()

    return `${window.location.hostname}:${port}`
  }

  public static getApiUrl(): string {


    return `${window.location.protocol}//${ApiRequest.getApiOrigin()}`

  }


}