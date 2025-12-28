import { apiProxy } from "@/utils/apiProxy";
import { NextRequest } from "next/server";

interface Params {
  id: string;
}

export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id: vacancyId } = await params;

  return await apiProxy(req, `api/candidate/selection-process/apply/${vacancyId}`);
}