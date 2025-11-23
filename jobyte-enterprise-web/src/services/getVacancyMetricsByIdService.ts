export async function getVacancyMetricsByIdService(id: string) {
  return await fetch(`http://localhost:5000/api/metrics/vacancy/${id}`);
}