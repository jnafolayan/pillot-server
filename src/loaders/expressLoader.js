import bodyParser from 'body-parser';

export default async function loadExpressPackages(app, config) {
  app.use(bodyParser);
}
