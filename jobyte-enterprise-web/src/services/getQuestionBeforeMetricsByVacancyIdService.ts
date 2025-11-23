export async function getQuestionBeforeMetricsByVacancyIdService(vacancyId: string) {
  return await fetch(`http://localhost:5000/api/metrics/questions-before/${vacancyId}`);
}