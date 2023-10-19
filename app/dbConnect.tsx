const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DB_CONNECTION_STRING;

let cachedDb: any = null;

export function dbConnect(): Promise<any[]> {

  // if (cachedDb) {
  //   console.log('👌 Using existing connection');
  //   return cachedDb;
  // }

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  cachedDb = client;

  return client;
}