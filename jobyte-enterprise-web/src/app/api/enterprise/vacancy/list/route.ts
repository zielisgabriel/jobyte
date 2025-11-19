import { NextRequest } from "next/server";
import { apiProxy } from "@/utils/apiProxy";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page");

  return apiProxy(req, `api/enterprise/vacancy/list${page ? `?page=${page}` : ""}`);
}
