import { Enterprise } from "./profile-details";
import { VacancyStatus } from "./vacancy-status";

export interface Vacancy {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  enterprise: Enterprise;
  status: VacancyStatus;
}