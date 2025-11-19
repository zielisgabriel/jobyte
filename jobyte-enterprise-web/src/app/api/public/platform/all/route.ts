import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await fetch(`${process.env.PUBLIC_API_URL}/api/public/platform/all`);
}