import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return await fetch(`http://localhost:5000/api/metrics/vacancy/${id}`);
}