import log4js from "log4js";
import path from "path";

log4js.configure({
  appenders: {
    console: { type: "console" },
    warnings: {
      type: "file",
      filename: path.join(process.cwd(), "/logs/warn.log"),
    },
    errors: {
      type: "file",
      filename: path.join(process.cwd(), "/logs/error.log"),
    },
    loggerConsole: {
      type: "logLevelFilter",
      appender: "console",
      level: "info",
    },
    loggerWarns: {
      type: "logLevelFilter",
      appender: "warnings",
      level: "warn",
    },
    loggerErrors: {
      type: "logLevelFilter",
      appender: "errors",
      level: "error",
    },
  },
  categories: {
    default: { appenders: ["loggerConsole"], level: "all" },
    custom: {
      appenders: ["loggerConsole", "loggerWarns", "loggerErrors"],
      level: "all",
    },
  },
});

const logger = log4js.getLogger("custom");

export default logger;