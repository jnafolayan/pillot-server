import expressLoader from './expressLoader';
import mongooseLoader from './mongooseLoader';

export default async function initLoaders(app, config) {
  await expressLoader(app, config);
  await mongooseLoader(app, config);
}
