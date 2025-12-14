"use server";

import { fetchWithAuth } from "@/middlewares/fetchWithAuth";
import { FetchProps } from "@/types/FetchProps";
import { ProfileSimple } from "@/types/ProfileSimple";
import { redirect } from "next/navigation";

export async function getProfileSimpleService() {
  return await fetchWithAuth({
    path: "/api/enterprise/profile/simple"
  });
}