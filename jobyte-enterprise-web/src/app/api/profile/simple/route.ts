import { apiProxy } from "@/middlewares/apiProxy";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await apiProxy(req, "/api/enterprise/profile/simple");
}