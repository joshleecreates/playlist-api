import Pino from 'pino';

const logger = Pino({
  level: 'info',
  prettyPrint: false,
  useLevelLabels: true
});

export default logger;