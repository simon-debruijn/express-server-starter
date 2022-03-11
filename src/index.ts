import { app } from './app';
import { PORT } from './constants';
import { logger } from '@logging/logger';

app.listen(PORT, () => {
  logger.info(
    `Server running on port ${PORT} with ${process.env.UV_THREADPOOL_SIZE} threads`,
  );
});
