import bodyParser from 'body-parser';
import routes from '../routes';

export default async function loadExpressPackages(app, config) {
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
