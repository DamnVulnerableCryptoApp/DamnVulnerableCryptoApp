import "@tsed/ajv";
import { GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings } from "@tsed/common";
import { $log } from "@tsed/logger";
import "@tsed/swagger";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cors from "cors";
import * as methodOverride from "method-override";
import * as path from 'path';

const rootDir = __dirname;
const frontend = path.join(rootDir, "../../frontend/build");

$log.level = "info";
$log.name = "DVC";

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
  swagger: [{ path: "/docs" }],
  exclude: ["**/*.spec.ts"],
  uploadDir: `${rootDir}/uploads`,
  statics: {
    "/": frontend
  }
  // logger: { requestFields: [] }
})


export class Server extends ServerLoader {


  public corsOptionsDelegate(req: any, callback: any) {
    let corsOptions;
    const origin = req.header('Origin');

    if (origin && origin.endsWith(":4000")) // disable cors
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
