import { connectDB } from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    console.log(`name is : ${name}`)

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        {
          status: 400,
        },
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not registered",
        },
        { status: 400 },
      );
    }

    await user.save();

    return NextResponse.json({
      message: "User created",
      user,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "User not registered ",
        error,
        success: false,
      },
      {
        status: 400,
      },
    );
  }
}
