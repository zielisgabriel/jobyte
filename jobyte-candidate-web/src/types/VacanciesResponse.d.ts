import { Vacancy } from "@/types/Vacancy";

export interface VacanciesResponse {
  vacancies: Vacancy[];
  totalPages: number;
}