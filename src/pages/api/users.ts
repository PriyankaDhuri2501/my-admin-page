import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { db } = await connectToDatabase();
    
    // Fetch only users (exclude admins)
    const users = await db.collection("users").find({ role: "user" }).toArray();
    
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Error fetching users" });
  }
}
