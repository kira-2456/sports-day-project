import winston from 'winston';
import expressWinston from 'express-winston';

const TIMESTAMP_FORMAT_OPTIONS = { alias: 'timestamp', format: 'DD-MM-YYYY hh:mm:ss a Z' };

const loggerOptions = {
  meta: true,
  // colorize: false,
  expressFormat: true,
  headerBlacklist: ['cookie', 'set-cookie', 'authorization'],
};

const loggerFormat = winston.format.combine(winston.format.timestamp(TIMESTAMP_FORMAT_OPTIONS), winston.format.json());

const getConsoleTransporter = () => new winston.transports.Console();

const getLogsTransporters = () => {
  return [getConsoleTransporter()];
};

export const appLogger = expressWinston.logger({
  transports: getLogsTransporters(),
  format: loggerFormat,
  ...loggerOptions,
});

export const logger = new winston.createLogger({
  transports: getLogsTransporters(),
  format: loggerFormat,
  ...loggerOptions,
});

const useAppLoggers = app => {
  app.use(appLogger);

  app.use((req, res, next) => {
    res.locals.logger = logger;
    req.logger = logger;
    next();
  });
};

export default useAppLoggers;
