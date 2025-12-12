import { getProfileSimpleService } from "@/services/getProfileSimpleService";
import { ProfileSimple } from "@/types/ProfileSimple";

export async function getCurrentProfileSimple(): Promise<ProfileSimple | null> {
  try {
    const data = await getProfileSimpleService({
      path: "/api/enterprise/profile/simple",
    });

    return data;
  } catch (error: any) {
    return null;
  }
}