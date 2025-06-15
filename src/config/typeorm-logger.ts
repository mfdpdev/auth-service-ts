import { Logger as TypeOrmLogger, QueryRunner } from "typeorm";
import logger from "../applications/logger";

export class TypeOrmPinoLogger implements TypeOrmLogger {
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
      logger.debug({ query, parameters }, 'DB QUERY');
  }

  logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner) {
      logger.error({ query, parameters, error}, 'DB QUERY ERROR');
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
      logger.warn({ time, query, parameters }, 'SLOW QUERY');
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
      logger.info(message, 'SCHEMA BUILD');
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
      logger.info(message, 'MIGRATION');
  }

  log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner) {
    switch (level) {
      case 'log':
      case 'info':
        logger.info(message);
        break;
      case 'warn':
        logger.warn(message);
        break;
    }
  }
}
