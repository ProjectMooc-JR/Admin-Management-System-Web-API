const winston = require("winston");
require('winston-daily-rotate-file');  
// create Winston log
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: "logs/error_%DATE%.log",
      level: "error",
      maxSize: "20m",
      maxFiles: "14d"
    }),
    new winston.transports.DailyRotateFile({
      filename: "logs/warn_%DATE%.log",
      level: "warn",
      maxSize: "20m",
      maxFiles: "14d"
    }),
    new winston.transports.DailyRotateFile({
      filename: "logs/info_%DATE%.log",
      level: "info",
      maxSize: "20m",
      maxFiles: "14d"
    }),
    new winston.transports.DailyRotateFile({
      filename: "logs/debug_%DATE%.log",
      level: "debug",
      maxSize: "20m",
      maxFiles: "14d",
    }),
    new winston.transports.DailyRotateFile({ filename: "logs/all_%DATE%.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = logger;
