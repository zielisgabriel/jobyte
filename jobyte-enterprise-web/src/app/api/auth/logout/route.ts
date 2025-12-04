import { signOut } from "@/auth";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await signOut({ redirect: false });
    return NextResponse.json({ message: "Logout successful" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Erro ao fazer logout" }, { status: 500 });
  }
}