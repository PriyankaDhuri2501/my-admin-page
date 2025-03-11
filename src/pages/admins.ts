import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../utils/mongodb";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);
    if (decoded.role !== "admin") return res.status(403).json({ message: "Forbidden: Admins only" });

    const { db } = await connectToDatabase();
    const admins = await db.collection("users").find({ role: "admin" }).toArray();
    res.status(200).json(admins);
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
}
