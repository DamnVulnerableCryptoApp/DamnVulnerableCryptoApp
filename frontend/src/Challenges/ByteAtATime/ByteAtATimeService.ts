import ApiRequest from "../../Common/ApiRequest"
import IRequest from "./IRequest"

interface IParsedRequest {
  body: string
  headers: Record<string, string>
  method: string
  url: string

}
export class ByteAtATimeService extends ApiRequest {

  public static CHALLENGEPATH = `/aes/ecb/byte-at-a-time`


  public static async submitRequest(req: string): Promise<IRequest> {
    return new Promise((resolve, reject) => {
      try {
        const r = this.parseRequest(req)
        const parsedUrl = new URL(r.url)
        const retValue: IRequest = {
          host: parsedUrl.host,
          url: parsedUrl.searchParams ? (parsedUrl.pathname + "?" + parsedUrl.searchParams) : parsedUrl.pathname,
          method: r.method,
          protocol: parsedUrl.protocol,
          rawContent: req,
          rawResponse: "",
          status: 0
        }

        const fetchParams: any = { headers: r.headers, method: r.method }

        // body cannot be set on some operations, otherwise fetch fails.
        // so just set it when the user fills it.
        if (r.body)
          fetchParams.body = r.body

        fetch(r.url, fetchParams).then(response => {

          ByteAtATimeService.responseToString(response).then(raw => {
            retValue.rawResponse = raw
            retValue.status = response.status
            resolve(retValue)
          })

        }).catch(err => {
          retValue.rawResponse = err.toString()
          retValue.status = -1
          resolve(retValue)
        })
      }
      catch (err) {
        reject(err)
      }

    })
  }

  public static parseRequest(req: string): IParsedRequest {

    req = req.replace(/(\r\n|\n|\r)/gm, "\n")

    let firstNewLineIndex = req.indexOf("\n")
    if (firstNewLineIndex === -1) firstNewLineIndex = req.length

    const startLine = req.substring(0, firstNewLineIndex)
    const startLineArray = startLine.split(" ")
    const method = startLineArray[0]
    const path = startLineArray[1]
    let emptyLine = req.indexOf("\n\n")
    if (emptyLine === -1) emptyLine = req.length

    const headersArray = req.substring(firstNewLineIndex + 1, emptyLine).split("\n")
    const headers: Record<string, string> = {}
    const body = req.substring(emptyLine + 2)

    headersArray.forEach(h => {
      const delimiterIndex = h.indexOf(":")
      const name = h.substring(0, delimiterIndex)
      const value = h.substring(delimiterIndex + 2)
      headers[name] = value
    })

    // if full url is not in the request lets assume an http to host header
    let url: string
    if (path.startsWith("http"))
      url = path
    else
      url = "http://" + (headers.host || headers.Host) + path

    delete headers["content-length"]
    delete headers["Content-Length"]

    return { body, headers, method, url }
  }


  public static async responseToString(r: Response): Promise<string> {
    // there no method to get http version with fetch, so its hardcoded :(
    let responseString = `HTTP/1.1 ${r.status} ${r.statusText}\n`

    Object.entries(r.headers).forEach(([key, value]) => {
      responseString += `${key}: ${value}\n`
    })


    responseString += `\n${await r.text()}`

    return responseString
  }


}