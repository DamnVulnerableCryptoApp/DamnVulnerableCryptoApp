import { Controller, Get, PathParams, Req, Res } from '@tsed/common';
import { existsSync, readFileSync } from 'fs';

@Controller("/docs/")
export class DocumentationController {

  @Get("/:topic")
  public docs(@Req() request: Req, @Res() response: Res, @PathParams("topic") topic: string) {

    const doc = topic.split("/").pop() || "";
    if (doc.match(/^(\w|-)*$/)) { // Just to make sure against path traversal

      response.contentType("text/plain; charset=UTF-8");
      const filePath = __dirname + "/../documentation/" + doc + ".md";

      if (existsSync(filePath))
        return readFileSync(filePath);
      else
        return "# Under Construction";
    }

  }

}