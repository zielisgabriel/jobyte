export interface VacanciesResponse {
  vacancies: Vacancy[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
}