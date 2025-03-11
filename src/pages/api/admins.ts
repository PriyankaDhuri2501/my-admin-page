import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { db } = await connectToDatabase(); // Ensure DB connection is working

    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    console.log("Fetching admins from database...");

    const admins = await db.collection("users").find({ role: "admin" }).toArray();

    console.log("Admins fetched successfully:", admins);

    return res.status(200).json(admins);
  } catch (error) {
    const err = error as Error; // ✅ Explicitly cast `error` to `Error`
    console.error("Error fetching admins:", err.message);

    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
}
