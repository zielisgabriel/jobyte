import { VacancyInfo } from "@/components/VacancyInfo";

export default async function VacancyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main>
      <VacancyInfo
        vacancyId={id}
      />
    </main>
  );
}