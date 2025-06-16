import logger from "./applications/logger";
import { web } from "./applications/web";

const port: number = 3000;
const hostname: string = "localhost";
web.listen(port, hostname, function(){
  logger.info(`Listening on port ${port}`);
});
