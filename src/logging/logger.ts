import pino from 'pino';

import path from 'path';

const file = path.join(__dirname, `../../logs/pino-${process.pid}-example`);

const transport = pino.transport({
  targets: [
    {
      level: 'info',
      target: 'pino/file',
      options: {
        destination: file,
        mkdir: true,
      },
    },
  ],
});

const devOptions = {};

const isProduction = process.env.NODE_ENV === 'production';

const logger = pino(isProduction ? transport : devOptions);

export { logger };
