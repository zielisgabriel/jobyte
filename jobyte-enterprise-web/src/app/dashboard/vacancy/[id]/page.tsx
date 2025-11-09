import { VacancyDetails } from "@/components/VacancyDetails";

export default async function VacancyInfoPage({ params }: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  
  return (
    <div>
      <VacancyDetails id={id} />
    </div>
  );
}
