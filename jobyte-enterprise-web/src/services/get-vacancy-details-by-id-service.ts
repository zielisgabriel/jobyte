import { fetchWithAuth } from "@/middlewares/fetchWithAuth";

export async function getVacancyDetailsByIdService(id: string) {
  return await fetchWithAuth({
      path: `/api/enterprise/vacancy/${id}`,
      init: {
        method: "GET"
      }
    });
}