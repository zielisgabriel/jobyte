import { VacancyMetrics } from "@/types/VacancyMetrics";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ChartConfig } from "./ui/chart";
import { QuestionBeforeMetrics } from "@/types/QuestionBeforeMetrics";
import { getVacancyMetricsByIdService } from "@/services/getVacancyMetricsByIdService";
import { getQuestionBeforeMetricsByVacancyIdService } from "@/services/getQuestionBeforeMetricsByVacancyIdService";
import { VacancyMetricsCharts } from "./VacancyMetricsCharts";
import { VacancyLineChart } from "./VacancyLineChart";
import { 
  ActivityIcon, 
  CalendarIcon, 
  PieChartIcon,
  InfoIcon,
  TrendingUpIcon,
  UsersIcon
} from "lucide-react";

interface VacancyMetricsProps {
  id: string;
}

const vacancyChartConfig: ChartConfig = {
  quantity: {
    label: "Quantidade de Candidaturas",
    color: "var(--chart-1)",
  }
}

async function getVacancyMetricsById(id: string): Promise<VacancyMetrics> {
  const response = await getVacancyMetricsByIdService(id);
  const vacancyMetrics: VacancyMetrics = await response.json();
  return vacancyMetrics;
}

async function getQuestionBeforeMetricsByVacancyId(id: string): Promise<QuestionBeforeMetrics> {
  const response = await getQuestionBeforeMetricsByVacancyIdService(id);
  const questionBeforeMetrics = await response.json();
  return questionBeforeMetrics;
}

export async function VacancyMetricsComp({ id }: VacancyMetricsProps) {
  const vacancyMetrics = await getVacancyMetricsById(id);
  const questionBeforeMetrics = await getQuestionBeforeMetricsByVacancyId(id);

  const totalApplications = vacancyMetrics?.metrics?.applications_last_30_days?.reduce(
    (sum, day) => sum + (day.quantity || 0), 0
  ) || 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="group hover:shadow-md transition-all duration-300 hover:border-primary/20">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <UsersIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold">{totalApplications}</p>
                <p className="text-xs text-muted-foreground">Candidaturas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-md transition-all duration-300 hover:border-primary/20">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                <TrendingUpIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold">
                  {questionBeforeMetrics?.pie_chart?.length || 0}
                </p>
                <p className="text-xs text-muted-foreground">Plataformas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-md transition-all duration-300 hover:border-primary/20">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                <CalendarIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold">30</p>
                <p className="text-xs text-muted-foreground">Dias</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-md transition-all duration-300 hover:border-primary/20">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <ActivityIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold">
                  {(totalApplications / 30).toFixed(1)}
                </p>
                <p className="text-xs text-muted-foreground">Média/dia</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
        {/* Line Chart Card */}
        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-muted/30">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <ActivityIcon className="h-5 w-5 text-primary" />
                  Candidaturas
                </CardTitle>
                <CardDescription>
                  Evolução nos últimos 30 dias
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Últimos 30 dias</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <VacancyLineChart vacancyMetrics={vacancyMetrics} chartConfig={vacancyChartConfig} />
          </CardContent>
        </Card>

        {/* Pie Chart Card */}
        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-muted/30">
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-primary" />
              Por Plataforma
            </CardTitle>
            <CardDescription>
              Origem das candidaturas
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <VacancyMetricsCharts questionBeforeMetrics={questionBeforeMetrics} />
          </CardContent>
          <CardFooter className="border-t bg-muted/30">
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <InfoIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>
                As métricas de pré-candidatura ajudam a entender melhor as conexões dos candidatos com a empresa.
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
