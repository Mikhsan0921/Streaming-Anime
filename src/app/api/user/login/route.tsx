import { closeConnection, createConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Encode the provided password to Base64
    const encodedPassword = Buffer.from(password).toString("base64");

    // Connect to the database
    const db = await createConnection();

    // Retrieve the user from the database
    const [rows]: any = await db.execute(
      `SELECT * FROM user WHERE username = ?`,
      [username]
    );
    await closeConnection(db);

    // Check if user exists
    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const user = rows[0];

    // Compare the provided password with the stored Base64-encoded password
    if (encodedPassword !== user.password) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Authentication successful
    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id_user,
          username: user.username,
          email: user.email,
          foto_profile: user.foto_profile,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
