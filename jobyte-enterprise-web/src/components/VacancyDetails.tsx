import { Vacancy } from "@/types/Vacancy";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { getVacancyDetailsByIdService } from "@/services/get-vacancy-details-by-id-service";
import { 
  BuildingIcon, 
  FileTextIcon, 
  BriefcaseIcon,
  CalendarIcon
} from "lucide-react";
import { Separator } from "./ui/separator";

interface VacancyDetailsProps {
  id: string;
}

async function getVacancyDetailsById(id: string): Promise<Vacancy> {
  const response = await getVacancyDetailsByIdService(id);
  const vacancyDetails: Vacancy = await response.json();
  return vacancyDetails;
}

function getStatusConfig(status: string) {
  switch (status) {
    case "OPEN":
      return { label: "Ativa", className: "bg-green-500/10 text-green-500 border-green-500/20" };
    case "PAUSED":
      return { label: "Pausada", className: "bg-amber-500/10 text-amber-500 border-amber-500/20" };
    case "CLOSED":
      return { label: "Encerrada", className: "bg-red-500/10 text-red-500 border-red-500/20" };
    default:
      return { label: status, className: "opacity-70" };
  }
}

export async function VacancyDetails({ id }: VacancyDetailsProps) {
  const vacancyDetails = await getVacancyDetailsById(id);
  const statusConfig = getStatusConfig(vacancyDetails?.status);

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">
                <BriefcaseIcon className="h-3 w-3 mr-1" />
                Vaga
              </Badge>
              {vacancyDetails?.status && (
                <Badge variant="outline" className={statusConfig.className}>
                  {statusConfig.label}
                </Badge>
              )}
            </div>
            
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl">
              {vacancyDetails?.title}
            </CardTitle>
            
            <div className="flex items-center gap-4 flex-wrap text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <BuildingIcon className="h-4 w-4" />
                <span>{vacancyDetails?.enterprise?.companyName || "Empresa"}</span>
              </div>
              {vacancyDetails?.createdAt && (
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="h-4 w-4" />
                  <span>
                    Criada em {new Date(vacancyDetails.createdAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric"
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <Separator />
      
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileTextIcon className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Descrição da Vaga</h3>
          </div>
          
          <ScrollArea className="h-58 sm:h-66 lg:h-74 rounded-lg border bg-muted/20 p-4">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {vacancyDetails?.description || "Sem descrição disponível."}
            </p>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}