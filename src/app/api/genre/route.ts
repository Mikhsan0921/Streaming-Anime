import { createConnection } from "@/lib/db";
import { NextResponse } from "next/server";

// CREATE: Add a new genre
export const POST = async (req: Request) => {
    try {
        const { label } = await req.json();
        const db = await createConnection();
        const result: any = await db.query("INSERT INTO genre (label) VALUES (?)", [
            label,
        ]);
        return NextResponse.json(
            { message: "Genre created", id: result.insertId },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

// READ: Get all genres
export const GET = async () => {
    try {
        const db = await createConnection();
        const [rows] = await db.query("SELECT * FROM genre");
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

        if (result.affectedRows === 0) {
            return NextResponse.json({ message: "Genre not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Genre deleted" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
