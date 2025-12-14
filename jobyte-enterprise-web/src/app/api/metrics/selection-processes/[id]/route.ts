import { fetchWithoutAuth } from "@/middlewares/fetchWithoutAuth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const {
    id: enterpriseId
  } = await params;

  return await fetchWithoutAuth({
    path: `/api/metrics/selection-processes/${enterpriseId}`,
    host: "http://localhost:5000",
    init: {
      method: req.method
    }
  });
}