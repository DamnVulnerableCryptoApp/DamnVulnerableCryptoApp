import { $log, ServerLoader } from "@tsed/common";
import { Server } from "./Server";
import { FlagService } from './services/FlagService';

async function bootstrap() {

  await FlagService.createOrLoadFlags();
  try {
    $log.debug("Start server...");
    const server = await ServerLoader.bootstrap(Server);

    await server.listen();
    $log.debug("Server initialized");
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();
