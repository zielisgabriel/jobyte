import { Enterprise } from "./Enterprise";

export interface Vacancy {
  id: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  enterprise?: Enterprise;
  status?: "OPEN" | "CLOSED" | "PAUSED";
}