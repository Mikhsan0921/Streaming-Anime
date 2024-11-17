import { createConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = await createConnection();
  const [rows] = await db.query("SELECT * FROM anime");
  return NextResponse.json({ data: rows });
};
