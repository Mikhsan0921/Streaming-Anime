import { createConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  const db = await createConnection();
  const [rows] = await db.query(`SELECT * FROM anime WHERE id_anime = ?`, [id]);

  return NextResponse.json({ data: rows });
};
