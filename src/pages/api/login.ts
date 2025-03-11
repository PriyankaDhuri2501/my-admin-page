import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  try {
    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token, role: user.role });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
