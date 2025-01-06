import { closeConnection, createConnection } from "@/lib/db";
import { NextResponse } from "next/server";

// CREATE: Add a new genre
export const POST = async (req: Request) => {
    try {
        const { label } = await req.json();
        const db = await createConnection();
        const result: any = await db.query("INSERT INTO genre (label) VALUES (?)", [
            label,
        ]);
        await closeConnection(db);
        return NextResponse.json(
            { message: "Genre created", id: result.insertId },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

// READ: Get all genresimport { createConnection } from "@/lib/db";
export const GET = async (req: Request) => {
    try {
        const db = await createConnection();
        const { searchParams } = new URL(req.url);
        const id_genre = searchParams.get("id");
        const search = searchParams.get("search");

        let query = "SELECT * FROM genre";
        let values: any[] = [];

        if (id_genre) {
            query += " WHERE id_genre = ?";
            values.push(id_genre);
        } else if (search) {
            query += " WHERE label LIKE ?";
            values.push(`%${search}%`);
        }

        const [rows]: any = await db.query(query, values);
        await closeConnection(db);


        if (id_genre && rows.length === 0) {
            return NextResponse.json({ message: "Genre not found" }, { status: 404 });
        }

        return NextResponse.json({ data: rows });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

// UPDATE: Update a genre by ID
export const PUT = async (req: Request) => {
    try {
        const { id_genre, label } = await req.json();
        const db = await createConnection();
        const [result]: any = await db.query(
            "UPDATE genre SET label = ? WHERE id_genre = ?",
            [label, id_genre]
        );
        await closeConnection(db);


        if (result.affectedRows === 0) {
            return NextResponse.json({ message: "Genre not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Genre updated" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

// DELETE: Delete a genre by ID
export const DELETE = async (req: Request) => {
    try {
        const { id_genre } = await req.json();
        const db = await createConnection();
        const [result]: any = await db.query(
            "DELETE FROM genre WHERE id_genre = ?",
            [id_genre]
        );
        await closeConnection(db);

        if (result.affectedRows === 0) {
            return NextResponse.json({ message: "Genre not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Genre deleted" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};