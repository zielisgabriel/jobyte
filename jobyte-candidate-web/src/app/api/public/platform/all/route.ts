import { apiProxy } from "@/utils/apiProxy";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return apiProxy(req, "api/public/platform/all");
}