import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';

// Determine log level based on environment
const isDevelopment = process.env.NODE_ENV !== 'production';
const logLevel = isDevelopment ? 'debug' : 'info'; // Debug in dev, info in prod

// Define log file rotation settings
const transport = new transports.DailyRotateFile({
  filename: path.join(__dirname, '../../logs', 'app-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true, // Compress old logs
  maxSize: '10m', // Max file size: 10MB
  maxFiles: '14d', // Keep logs for 14 days
});

// Create Winston logger
const logger = createLogger({
  level: logLevel, // Dynamic log level
  format: format.combine(
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    }),
  ),
  transports: [
    new transports.Console({ level: logLevel }), // Console log with dynamic level
    transport, // File logging
  ],
});

export default logger;
