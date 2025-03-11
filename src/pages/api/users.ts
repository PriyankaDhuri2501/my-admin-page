import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  
  if (method === "POST") {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const { db } = await connectToDatabase();
      const usersCollection = db.collection("users");

      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = { name, email, password: hashedPassword, role };
      await usersCollection.insertOne(newUser);

      res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Error adding user" });
    }
  } else {
    res.status(405).end();
  }
}
