import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { email, password, name } = await req.json();

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user (role defaults to 'user')
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: { email: newUser.email, name: newUser.name },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
