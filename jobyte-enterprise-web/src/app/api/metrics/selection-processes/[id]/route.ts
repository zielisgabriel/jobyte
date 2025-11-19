import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return await fetch(`http://localhost:5000/api/metrics/selection-processes/${(await params).id}`, {
    method: "GET",
  });
}