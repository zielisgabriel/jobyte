import { getProfileSimpleService } from "@/services/get-profile-simple-service";
import { redirect } from "next/navigation";

export async function getCurrentProfileSimple() {
  const response = await getProfileSimpleService();

  if (response.status === 404) {
    redirect("/fill-profile")
  }

  if (response.ok) {
    return await response.json();
  }
}