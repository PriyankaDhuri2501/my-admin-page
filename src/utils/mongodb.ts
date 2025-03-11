import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "your_mongodb_connection_string";
const MONGODB_DB = process.env.MONGODB_DB || "your_database_name";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

if (!MONGODB_DB) {
  throw new Error("Please define the MONGODB_DB environment variable inside .env.local");
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    console.log("Using cached database connection"); // ✅ Add this for debugging
    return { client: cachedClient, db: cachedDb };
  }

  console.log("Connecting to MongoDB..."); // ✅ Debugging line

  try {
    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db(MONGODB_DB);

    cachedClient = client;
    cachedDb = db;

    console.log("Connected to MongoDB:", MONGODB_DB); // ✅ Debugging line
    return { client, db };
  } catch (error) {
    console.error("MongoDB connection error:", error); // ✅ Catch connection errors
    throw new Error("Failed to connect to MongoDB");
  }
}
