export interface VacancyMetrics {
  metrics: {
    applications_last_30_days: {
      date: string,
      quantity: number
    }[],
    avg_hours_between_application: number?,
    first_application: string?,
    last_application: string?,
    peak_day: {
      date: string,
      quantity: number
    },
    total_applications: number,
    unique_candidates: number
  }
  vacancy: {
    created_at: string,
    updated_at: string,
    id: string,
    status: string,
    title: string
  }
}