import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const setup = async () => {
  let client;

  try {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const redirects = client.db('turl-db').collection('redirects');

    const hasData = await redirects.countDocuments();

    if (hasData) {
      console.log('Database already exists with data');
      await client.close();
      return;
    }

    const record = {
      url: 'http://localhost:3000',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      seconds: 30,
      lastVisit: null,
      code: null
    };

    const insert = await redirects.insertOne(record);

    const insertedId = insert.insertedId;
    const code = insertedId.toString().slice(-6);

    const update = await redirects.updateOne(
      { _id: insertedId },
      { $set: { code } }
    );

    if (insert.acknowledged && update.acknowledged) {
      console.log('Successfully inserted records');
    }
  } catch (error) {
    return 'Database is not ready yet';
  } finally {
    if (client) {
      await client.close();
    }
  }
};

try {
  setup();
} catch {
  console.warn('Database is not ready yet. Skipping seeding...');
}

export { setup };
