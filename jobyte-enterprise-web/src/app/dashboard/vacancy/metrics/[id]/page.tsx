import { VacancyDetails } from "@/components/VacancyDetails";
import { VacancyMetricsComp } from "@/components/VacancyMetricsComp";

export default async function VacancyMetricsPage({ params }: { params: Promise<{ id: string }> }) {
  const {id} = await params;

  return (
    <main className="max-w-6xl mx-auto py-4 px-2 md:px-4">
      <VacancyDetails id={id} />

      <VacancyMetricsComp id={id} />
    </main>
  );
}