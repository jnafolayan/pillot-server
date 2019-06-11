import express from 'express';

import log from './lib/log';

import * as config from './config';
import initLoaders from './loaders';

const app = express();

startServer();

async function startServer() {
  await initLoaders(app, config);

  app.listen(config.port, () => log.debug(`Server running on port ${config.port}`));
}