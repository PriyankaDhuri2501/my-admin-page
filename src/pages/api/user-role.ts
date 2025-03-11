import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/mongodb";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key") as { id: string; role: string };

    return res.status(200).json({ role: decoded.role });

  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
