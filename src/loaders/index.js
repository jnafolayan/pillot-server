import expressLoader from './expressLoader';
import mongooseLoader from './mongooseLoader'; 
import log from '../lib/log';

export default async function initLoaders(app, config) {
  try {
    await expressLoader(app, config);
    log.debug('Express packages loaded successfully');
  } catch (error) {
    log.error('An error occured while loading express packages');
    console.error(error);
  }

  try {
    await mongooseLoader(app, config);
    log.debug('Mongoose loaded successfully');
  } catch (error) {
    log.error('An error occured while loading mongoose');
    console.error(error);
  }
}
