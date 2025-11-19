export interface QuestionBeforeMetrics {
  pie_chart: {
    platform: string,
    quantity: number,
  }[],
  summary: {
    percent_has_acquaintance: number,
    percent_work_at_company: number,
    top_5_acquaintance_names: any[],
    total_responses: number,
  }
}