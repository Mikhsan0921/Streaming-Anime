import { createConnection } from "@/lib/db";
import { NextResponse } from "next/server";

// CREATE: Add a new anime
export const POST = async (req: Request) => {
  try {
    const { judul, sub_judul, status, released, deskripsi, thumbnail, banner } =
      await req.json();
    const db = await createConnection();
    const result: any = await db.query(
      "INSERT INTO anime (judul, sub_judul, status, released, deskripsi, thumbnail, banner) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [judul, sub_judul, status, released, deskripsi, thumbnail, banner]
    );
    return NextResponse.json(
      { message: "Anime created", id: result.insertId },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

// READ: Get all anime or filter by id or name
export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const name = searchParams.get("name");

    const db = await createConnection();

    let query = "SELECT * FROM anime";
    let params: any[] = [];

    if (id) {
      query += " WHERE id_anime = ?";
      params.push(id);
    } else if (name) {
      query += " WHERE judul LIKE ?";
      params.push(`%${name}%`);
    }

    const [rows] = await db.query(query, params);
    return NextResponse.json({ data: rows });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

// UPDATE: Update an anime by ID
export const PUT = async (req: Request) => {
  try {
    const {
      id_anime,
      judul,
      sub_judul,
      status,
      released,
      deskripsi,
      thumbnail,
      banner,
    } = await req.json();
    const db = await createConnection();
    const [result]: any = await db.query(
      "UPDATE anime SET judul = ?, sub_judul = ?, status = ?, released = ?, deskripsi = ?, thumbnail = ?, banner = ? WHERE id_anime = ?",
      [
        judul,
        sub_judul,
        status,
        released,
        deskripsi,
        thumbnail,
        banner,
        id_anime,
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Anime not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Anime updated" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

// DELETE: Delete an anime by ID
export const DELETE = async (req: Request) => {
  try {
    const { id_anime } = await req.json();
    const db = await createConnection();
    const [result]: any = await db.query(
      "DELETE FROM anime WHERE id_anime = ?",
      [id_anime]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Anime not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Anime deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
