// src/utils/mongodb.ts
import { MongoClient } from "mongodb";

// This will be our MongoDB connection URI
const uri = process.env.MONGODB_URI || "your-mongodb-uri-here"; // Replace with your MongoDB URI

// Connect to MongoDB
export const connectToDatabase = async () => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("admin"); // Database name
    return db;
  } catch (error) {
    throw new Error("MongoDB connection failed.");
  }
};
