import { VacancyInfo } from "@/components/VacancyInfo";

export default async function VacancyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="h-[92vh] px-2 py-4">
      <VacancyInfo
        vacancyId={id}
      />
    </main>
  );
}