import { app } from './app';
import { connectDatabase } from './config/db';
import { env } from './config/env';

async function bootstrap() {
  await connectDatabase();
  app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`LaVision API listening on port ${env.PORT}`);
  });
}

bootstrap();
