import pino from "pino"

const isProduction = process.env.ENV === "production";
const logger = pino({
  level: process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug'),
  timestamp: pino.stdTimeFunctions.isoTime,
  name: process.env.APP_NAME || "Auth Service Typescript",
});

export default logger;
