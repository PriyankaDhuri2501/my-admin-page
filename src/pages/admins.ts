// src/pages/api/admins.ts
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../utils/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const db = await connectToDatabase();
  const usersCollection = db.collection("users");

  if (method === "GET") {
    // Retrieve only admins
    try {
      const admins = await usersCollection.find({ role: "admin" }).toArray();
      res.status(200).json(admins);
    } catch (error) {
      res.status(500).json({ message: "Error fetching admins" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
