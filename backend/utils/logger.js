const dayjs = require("dayjs");
const logger = require("pino");

const log = logger({
  transport: {
    target: "pino-pretty",
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time": "${dayjs().format()}"`,
});

module.exports = log;
