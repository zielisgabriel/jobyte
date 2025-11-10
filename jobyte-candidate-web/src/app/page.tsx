import { SearchVacancy } from "@/components/SearchVacancy";
import { VacancyTab } from "@/components/VacancyTab";

export default function HomePage() {

  return (
    <main className="min-h-[92vh] flex flex-col px-2 max-w-4xl mx-auto">
      <SearchVacancy />
      <VacancyTab />
    </main>
  );
}