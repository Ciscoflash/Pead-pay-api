const winston = require('winston');
const { format } = require('winston');

const logger = winston.createLogger({
    level: 'info', // Set the log level (e.g., 'info', 'debug', 'error')
    format: winston.format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }), // Add timestamp to log entries
      winston.format.json(info => `${info.timestamp} ${info.level}: ${info.message}`) // Log format in JSON
    ),
    transports: [
      new winston.transports.Console(), // Output logs to the console
      new winston.transports.File({ filename: 'logfile.log' }) // Output logs to a file
    ]
  });



  module.exports = logger;