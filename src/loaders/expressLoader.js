import bodyParser from 'body-parser';
import routes from '../routes';

export default async function loadExpressPackages(app, config) {
  app.use(bodyParser);

  app.use(routes());
}
