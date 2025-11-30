import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Vacancy } from "@/types/Vacancy";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { getVacanciesService } from "@/services/getVacanciesService";
import { 
  CalendarIcon, 
  ChevronRightIcon, 
  EyeIcon, 
  UsersIcon,
  BriefcaseIcon,
  InboxIcon
} from "lucide-react";
import dayjs from "dayjs";
import { Separator } from "./ui/separator";

interface VacancyListProps {
  page?: string
}

async function getVacancies(page?: string): Promise<Vacancy[]> {
  const response = await getVacanciesService(page);
  const vacancies: Vacancy[] = await response.json();
  return vacancies;
}

function getStatusConfig(status: string) {
  switch (status) {
    case "OPEN":
      return {
        label: "Aberta",
        variant: "default" as const,
        className: "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20",
      };
    case "CLOSED":
      return {
        label: "Fechada",
        variant: "secondary" as const,
        className: "bg-gray-500/10 text-gray-500 border-gray-500/20",
      };
    case "PAUSED":
      return {
        label: "Pausada",
        variant: "outline" as const,
        className: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      };
    default:
      return {
        label: status,
        variant: "outline" as const,
        className: "",
      };
  }
}

export async function VacancyList({ page }: VacancyListProps) {
  const vacancies = await getVacancies(page);

  if (vacancies.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <InboxIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Nenhuma vaga encontrada</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">
            Você ainda não criou nenhuma vaga. Comece agora e encontre os melhores talentos!
          </p>
          <Link href="/dashboard/vacancy/create">
            <Button>
              <BriefcaseIcon className="h-4 w-4 mr-2" />
              Criar primeira vaga
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {vacancies.map(vacancy => {
        const statusConfig = getStatusConfig(vacancy.status);
        
        return (
          <Card 
            key={vacancy.id} 
            className="group hover:shadow-lg transition-all duration-300 hover:border-primary/20 flex flex-col"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <Badge 
                  variant={statusConfig.variant}
                  className={statusConfig.className}
                >
                  {statusConfig.label}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <CalendarIcon className="h-3 w-3" />
                  {dayjs(vacancy.createdAt).format("DD/MM/YYYY")}
                </span>
              </div>
              <CardTitle className="font-bold text-xl line-clamp-2 mt-3 group-hover:text-primary transition-colors">
                {vacancy.title}
              </CardTitle>
              <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                {vacancy.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0 pb-4 flex-1">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <UsersIcon className="h-4 w-4" />
                  <span>--</span>
                  <span className="text-xs">candidatos</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <EyeIcon className="h-4 w-4" />
                  <span>--</span>
                  <span className="text-xs">visualizações</span>
                </div>
              </div>
            </CardContent>

            <Separator />
            
            <CardFooter>
              <Link href={`/dashboard/vacancy/metrics/${vacancy.id}`} className="w-full">
                <Button 
                  variant="link" 
                  className="w-full h-full justify-between transition-colors"
                >
                  Ver métricas da vaga
                  <ChevronRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
