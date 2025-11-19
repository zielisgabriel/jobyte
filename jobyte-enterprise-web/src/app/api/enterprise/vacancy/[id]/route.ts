import { NextRequest } from "next/server";
import { apiProxy } from "@/utils/apiProxy";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return apiProxy(req, `api/enterprise/vacancy/${id}`);
}
