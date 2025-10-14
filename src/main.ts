import logger from "./applications/logger";
import { web } from "./applications/web";

const port: number = parseInt(process.env.PORT || "3000");
const hostname: string = process.env.HOSTNAME || "localhost";

web.listen(port, hostname, function(){
  logger.info(`Listening on port ${port}`);
});
