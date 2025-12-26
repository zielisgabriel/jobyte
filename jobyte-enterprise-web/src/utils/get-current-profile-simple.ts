"use server";

import { ForbiddenError } from "@/errors/forbidden-error";
import { NotFoundError } from "@/errors/not-found-error";
import { getProfileSimpleService } from "@/services/get-profile-simple-service";
import { ProfileSimple } from "@/types/profile-simple";
import { redirect } from "next/navigation";

export async function getCurrentProfileSimple(): Promise<ProfileSimple | null> {
  try {
    return await getProfileSimpleService();
  } catch (error) {
    if (error instanceof ForbiddenError) {
      redirect("/fill-profile");
    }

    if (error instanceof NotFoundError) {
      redirect("/fill-profile");
    }

    throw error;
  }
}