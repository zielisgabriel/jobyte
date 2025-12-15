export interface SelectionProcessMetrics {
  last_n_days: {
    date: string,
    day: number,
    quantity: number,
  }[],
  summary: {
    avg_per_vacancy: number,
    total_selection_processes: number,
    total_unique_candidates: number,
    total_unique_vacancies: number,
  },
  top_days: any[]
}