import { apiProxy } from "@/utils/apiProxy";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return await apiProxy(req, `/vacancies/${id}`);
}