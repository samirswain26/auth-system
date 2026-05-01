import { connectDB } from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 },
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 },
      );
    }

    const token = generateToken(user._id.toString());

    const response = NextResponse.json({ message: "Login success" });

    const cookieOption = {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60,
      sameSite: "strict" as const ,
      path: "/",
    };

    response.cookies.set("token", token, cookieOption);
    return response;

  } catch (error) {
    return NextResponse.json({
        error,
        success: false,
        message: "Login failed"
    })
  }
}
