import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface DecodedToken {
  userId: string; 
  iat: number;
  exp: number;
}

type AuthResult =
  | { success: true; decoded: DecodedToken }
  | { success: false; status: 401; message: string };


export async function verifyAuth(): Promise<AuthResult> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { success: false, status: 401, message: "Unauthorized — no token" };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    return { success: true, decoded };
  } catch {
    return { success: false, status: 401, message: "Unauthorized — invalid or expired token" };
  }
}