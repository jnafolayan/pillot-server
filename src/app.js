import express from 'express';

import * as config from './config';
import initLoaders from './loaders';
import log from './lib/log';

const app = express();

startServer();

async function startServer() {
  await initLoaders(app, config);

  app.listen(config.port, () => log.debug(`Server running on port ${config.port}`));
}