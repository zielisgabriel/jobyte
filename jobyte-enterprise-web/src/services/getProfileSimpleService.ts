import { fetchWithAuth } from "@/middlewares/fetchWithAuth";
import { FetchProps } from "@/types/FetchProps";
import { ProfileSimple } from "@/types/ProfileSimple";
import { cacheLife, cacheTag } from "next/cache";

export async function getProfileSimpleService(props: FetchProps): Promise<ProfileSimple> {
  "use cache: private"

  cacheTag("profileSimple");
  cacheLife("hours");

  const response = await fetchWithAuth(props);

  const data: ProfileSimple = await response.json();

  return data;
}