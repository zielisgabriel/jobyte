import { apiProxy } from "@/utils/apiProxy";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get('page');

  const queryString = page ? `?page=${page}` : '';
  return await apiProxy(req, `api/candidate/vacancy/list${queryString}`);
}