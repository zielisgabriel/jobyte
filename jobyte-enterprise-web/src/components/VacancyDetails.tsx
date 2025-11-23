import { Vacancy } from "@/types/Vacancy";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { getVacancyDetailsByIdService } from "@/services/getVacancyDetailsByIdService";

interface VacancyDetailsProps {
  id: string;
}

async function getVacancyDetailsById(id: string): Promise<Vacancy> {
  const response = await getVacancyDetailsByIdService(id);
  const vacancyDetails: Vacancy = await response.json();
  return vacancyDetails;
}

export async function VacancyDetails({ id }: VacancyDetailsProps) {
  const vacancyDetails = await getVacancyDetailsById(id);

  return (
    <div className="space-y-2">
      <h1 className="font-bold text-3xl">
        {vacancyDetails?.title}
      </h1>

      <h2 className="opacity-60">
        {vacancyDetails?.enterprise?.companyName}
      </h2>

      <Card>
        <CardHeader>
          <CardTitle>Descrição da Vaga</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-60">
            {vacancyDetails?.description}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}