import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import {} from "dotenv/config";

const fileRotateTransport = new DailyRotateFile({
  filename: "rover-navigation-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
});

let dateFormat = () => {
  return new Date(Date.now())
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");
};

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.printf((info) => {
    let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${
      info.message
    } `;
    return message;
  }),
  transports: [new winston.transports.Console(), fileRotateTransport],
});

export default logger;
