import { fetchClient } from "@/lib/fetch-client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const {
    id: enterpriseId
  } = await params;

  return await fetchClient({
    path: `/api/metrics/selection-processes/${enterpriseId}`,
    host: "http://localhost:5000",
    isAuth: false,
    init: {
      method: req.method
    }
  });
}