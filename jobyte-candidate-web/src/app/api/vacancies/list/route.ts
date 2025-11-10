import { apiProxy } from "@/utils/apiProxy";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get('page');

  const queryString = page ? `?page=${page}` : '';
  console.log("BFF: Requisição de lista de vagas, página:", page || "1");
  return await apiProxy(req, `api/candidate/vacancies/list${queryString}`);
}