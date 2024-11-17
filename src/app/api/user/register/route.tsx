import { createConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    // Parse JSON from request body
    const body = await req.json();

    console.log("Request body:", body);

    // Destructure fields from the parsed JSON
    const { username, password, email } = body;

    if (!username || !password || !email) {
      return NextResponse.json(
        { error: "Username, password, and email are required" },
        { status: 400 }
      );
    }

    // Encode password to Base64
    const encodedPassword = Buffer.from(password).toString("base64");

    // Connect to the database
    const db = await createConnection();

    // Insert user data into the database
    const [result]: any = await db.execute(
      `INSERT INTO user (username, password, email) 
       VALUES (?, ?, ?)`,
      [username, encodedPassword, email]
    );

    // Respond with success
    return NextResponse.json(
      { message: "User registered successfully", userId: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof SyntaxError && error.message.includes("JSON")) {
      return NextResponse.json(
        { error: "Invalid JSON format in request body" },
        { status: 400 }
      );
    }

    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
