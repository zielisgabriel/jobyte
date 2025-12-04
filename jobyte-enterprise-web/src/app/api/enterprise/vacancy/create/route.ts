import { apiProxy } from "@/middlewares/apiProxy";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return apiProxy(req, "api/enterprise/vacancy/create")
}