import mongoose from 'mongoose';

export default async function loadMongoDB(app, config) {
  await mongoose.connect(config.dbURL, {
    useNewUrlParser: true
  });
}
