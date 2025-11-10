import { Enterprise } from "./Enterprise";

export interface Vacancy {
  id: string;
  title: string;
  description: string;
  createdAt?: string; // backend provides ISO timestamp; optional for mocks
  updatedAt?: string; // optional
  enterprise?: Enterprise; // optional for mocks; UI will normalize
  status?: "OPEN" | "CLOSED" | "PAUSED"; // optional for mocks
  location?: string; // backend currently may not send; keep optional
  // Allow legacy mock field "company"; not used directly after normalization
  company?: string;
}