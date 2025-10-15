import { QueryRunner, AbstractLogger, LogLevel } from "typeorm";
import logger from "../applications/logger";

export class TypeOrmPinoLogger extends AbstractLogger {
  protected writeLog(level: LogLevel, logMessage: any, queryRunner?: QueryRunner) {
    const messages = this.prepareLogMessages(logMessage, {
      highlightSql: false,
    }, queryRunner);

    for (let message of messages) {
      switch(message.type ?? level) {
        case "log":
        case "schema-build":
        case "migration":
          logger.info(message.message);
          break

        case "info":
        case "query":
          if (message.prefix) {
            logger.info(message.prefix, message.message);
          } else {
            logger.info(message.message);
          }
          break

        case "warn":
        case "query-slow":
          if (message.prefix) {
            logger.warn(message.prefix, message.message);
          } else {
            logger.warn(message.message)
          }
          break

        case "error":
        case "query-error":
          if (message.prefix) {
            logger.error(message.prefix, message.message)
          } else {
            logger.error(message.message)
          }
          break
      }
    }
  }
}
