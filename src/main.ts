import logger from "./applications/logger";
import { web } from "./applications/web";
import { AppDataSource } from "./config/database.config";

const port: number = parseInt(process.env.PORT || "3000");
const hostname: string = process.env.HOSTNAME || "localhost";

const main = async () => {
  try {
    await AppDataSource.initialize();
    logger.info("✅ Database connected");

    web.listen(port, hostname, () => {
      logger.info(`🚀 Server listening on http://${hostname}:${port}`);
    });
  } catch (error) {
    logger.error("❌ Failed to start server:", error);
    process.exit(1); // Exit process on failure
  }
};

main();
