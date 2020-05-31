import "@tsed/ajv";
import { GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings } from "@tsed/common";
import { $log } from "@tsed/logger";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cors from "cors";
import * as methodOverride from "method-override";
import * as path from 'path';

const rootDir = __dirname;
const frontend = (process.env.NODE_ENV === "development") ? path.join(rootDir, "../../frontend/build") : path.join(rootDir, "public");

$log.level = "info";
$log.name = "DamnVulnerableCryptoApp";

@ServerSettings({
  rootDir,
  acceptMimes: ["application/json"],

  httpPort: process.env.PORT || 1234,
  httpsPort: false,
  mount: {
    "/": [`${rootDir}/controllers/**/*.ts`]
  },
  componentsScan: [
    `${rootDir}/middlewares/**/**.ts`
  ],
  //swagger: [{ path: "/swagger" }],
  exclude: ["**/*.spec.ts"],
  uploadDir: `${rootDir}/uploads`,
  statics: {
    "/": frontend,
    "/documentation/": `${rootDir}/documentation`,
  }
  // logger: { requestFields: [] }
})


export class Server extends ServerLoader {


  public corsOptionsDelegate(req: any, callback: any) {
    let corsOptions;

    if (process.env.NODE_ENV === "development") // disable cors
      corsOptions = { origin: true };
    else
      corsOptions = { origin: false };

    callback(null, corsOptions); // callback expects two parameters: error and options
  }


  $beforeRoutesInit() {
    this
      .use(cors(this.corsOptionsDelegate))
      .use(GlobalAcceptMimesMiddleware)
      // .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));

    return null;
  }

  $afterRoutesInit() {

    // if its an html request, serve the react app
    this.expressApp.get(`*`, (req, res) => {
      if (req.headers['content-type']?.includes("text/html") || req.headers['accept']?.startsWith("text/html")) {
        res.sendFile(path.join(frontend, "index.html"));
      }
    });


  }
}
