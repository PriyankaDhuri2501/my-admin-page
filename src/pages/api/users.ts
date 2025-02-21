// src/pages/api/users.ts
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/mongodb";

// User interface
interface User {
  name: string;
  role: "admin" | "user";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const db = await connectToDatabase();
  const usersCollection = db.collection("users");

  if (method === "GET") {
    // Retrieve both users and admins from the database
    try {
      const users = await usersCollection.find({}).toArray();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  } else if (method === "POST") {
    // Add a new user or admin
    const newUser: User = req.body;
    try {
      await usersCollection.insertOne(newUser);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Error adding user" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
