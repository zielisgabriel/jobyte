import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({message: "Logout successful"}, {status: 200});
    response.cookies.delete("refresh_token");
    response.cookies.delete("access_token");
    return response;
  } catch (error: any) {
    return NextResponse.json({error: "Erro ao fazer logout"}, {status: 500});
  }
}