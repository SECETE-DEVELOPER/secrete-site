import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  // Check at runtime, not at build time
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  if (cachedClient && cachedDb) {
    console.log('📦 Using cached MongoDB connection');
    return { client: cachedClient, db: cachedDb };
  }

  try {
    console.log('🔗 Connecting to MongoDB...');
    const client = new MongoClient(MONGODB_URI, {
      maxPoolSize: 10,
    });

    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('secret-project');
    
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
}

export async function getMessagesCollection() {
  const { db } = await connectToDatabase();
  const collection = db.collection('messages');
  
  // Create index for timestamp sorting
  await collection.createIndex({ timestamp: 1 });
  
  return collection;
}

export async function getLogsCollection() {
  const { db } = await connectToDatabase();
  const collection = db.collection('login_logs');
  
  // Create index for timestamp sorting
  await collection.createIndex({ timestamp: -1 });
  
  return collection;
}
