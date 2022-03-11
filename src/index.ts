import { app } from './app';
import { PORT } from './constants';

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} with ${process.env.UV_THREADPOOL_SIZE} threads`,
  );
});
