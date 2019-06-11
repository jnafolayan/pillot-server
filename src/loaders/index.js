import expressLoader from './expressLoader';

export default async function initLoaders(app, config) {
  await expressLoader(app, config);
}
