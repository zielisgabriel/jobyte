import { NextRequest } from "next/server";
import { apiProxy } from "@/utils/apiProxy";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  return await apiProxy(req, "api/enterprise/vacancies/" + id);
}