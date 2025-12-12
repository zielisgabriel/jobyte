import { Enterprise } from "./ProfileDetails";
import { VacancyStatus } from "./VacancyStatus";

export interface Vacancy {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  enterprise: Enterprise;
  status: VacancyStatus;
}