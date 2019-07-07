import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../routes';
import { createError } from '../util';

export default async function loadExpressPackages(app, config) {
  // enable pre-flight requests
  app.options('*', cors());
  app.use(cors());
  app.use(bodyParser.json());

  app.use(routes());

  // fallthrough error handler
  app.use((error, req, res, next) => {
    if (!error.__custom)
      error = createError(500, error.message);

    res.status(error.status)
      .json({
        status: error.status,
        error: true,
        message: error.message
      });
  });
}
