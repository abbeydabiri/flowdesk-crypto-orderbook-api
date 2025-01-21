const { createLogger, transports, format } = require('winston');

export const logger = createLogger({
  level: 'info', // Default log level
  format: format.simple(), // Simple format: level and message
  transports: [
    new transports.Console(), // Log to the console
  ],
});
