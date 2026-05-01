import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Already logged out" },
        { status: 200 }
      );
    }

    const response = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: true,
      maxAge: 0,           
      expires: new Date(0),
      sameSite: "strict",
      path: "/",   
    });

    return response;

  } catch (error) {
    console.error("Signout error:", error);
    return NextResponse.json(
      { success: false, message: "Signout failed" },
      { status: 500 }
    );
  }
}