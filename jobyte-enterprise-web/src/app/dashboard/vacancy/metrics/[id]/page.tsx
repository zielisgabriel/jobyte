import { BackButton } from "@/components/BackButton";
import { VacancyDetails } from "@/components/VacancyDetails";
import { VacancyMetricsComp } from "@/components/VacancyMetricsComp";

export default async function VacancyMetricsPage({ params }: { params: Promise<{ id: string }> }) {
  const {id} = await params;

  return (
    <main className="max-w-6xl mx-auto px-2 py-4 md:px-4">
      <BackButton />

      <VacancyDetails id={id} />

      <VacancyMetricsComp id={id} />
    </main>
  );
}