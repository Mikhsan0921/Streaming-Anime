import { closeConnection, createConnection } from "@/lib/db";
import { NextResponse } from "next/server";

// CREATE: Add a new anime
export const POST = async (req: Request) => {
  try {
    const {
      judul,
      sub_judul,
      status,
      released,
      deskripsi,
      thumbnail,
      banner,
      genres, // array of genre labels
    } = await req.json();

    const db = await createConnection();
    const [result]: any = await db.query(
      "INSERT INTO anime (judul, sub_judul, status, released, deskripsi, thumbnail, banner) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [judul, sub_judul, status, released, deskripsi, thumbnail, banner]
    );

    const id_anime = result.insertId;

    // Get genre IDs based on the provided labels
    if (genres && genres.length > 0) {
      const genrePlaceholders = genres.map(() => "?").join(",");
      const [genreRows]: any = await db.query(
        `SELECT id_genre FROM genre WHERE label IN (${genrePlaceholders})`,
        genres
      );

      if (genreRows.length > 0) {
        const genreQueries = genreRows.map((row: any) =>
          db.query(
            "INSERT INTO anime_mengandung_genre (id_anime, id_genre) VALUES (?, ?)",
            [id_anime, row.id_genre]
          )
        );
        await Promise.all(genreQueries);
      }
    }

    await closeConnection(db);

    return NextResponse.json(
      { message: "Anime created", id: id_anime },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

// READ: Get all anime or filter by id or name, including genres
export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const name = searchParams.get("name");

    const db = await createConnection();

    let query = `
      SELECT 
        a.*,
        GROUP_CONCAT(g.label) AS genres
      FROM 
        anime a
      LEFT JOIN 
        anime_mengandung_genre amg ON a.id_anime = amg.id_anime
      LEFT JOIN 
        genre g ON amg.id_genre = g.id_genre
    `;
    let params: any[] = [];

    if (id) {
      query += " WHERE a.id_anime = ?";
      params.push(id);
    } else if (name) {
      query += " WHERE a.judul LIKE ?";
      params.push(`%${name}%`);
    }

    query += " GROUP BY a.id_anime";

    const [rows] = await db.query(query, params);
    await closeConnection(db);

    return NextResponse.json({ data: rows });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

// UPDATE: Update an anime by ID
// UPDATE: Update an anime with genres
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
      genres, // array of genre labels
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

    // Update genres: delete existing records and insert new ones
    await db.query("DELETE FROM anime_mengandung_genre WHERE id_anime = ?", [
      id_anime,
    ]);

    // Get genre IDs based on the provided labels
    if (genres && genres.length > 0) {
      const genrePlaceholders = genres.map(() => "?").join(",");
      const [genreRows]: any = await db.query(
        `SELECT id_genre FROM genre WHERE label IN (${genrePlaceholders})`,
        genres
      );

      if (genreRows.length > 0) {
        const genreQueries = genreRows.map((row: any) =>
          db.query(
            "INSERT INTO anime_mengandung_genre (id_anime, id_genre) VALUES (?, ?)",
            [id_anime, row.id_genre]
          )
        );
        await Promise.all(genreQueries);
      }
    }

    await closeConnection(db);

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
    await closeConnection(db);

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Anime not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Anime deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
