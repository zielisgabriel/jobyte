import { VacancyMetrics } from "@/types/VacancyMetrics";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ChartConfig } from "./ui/chart";
import { QuestionBeforeMetrics } from "@/types/QuestionBeforeMetrics";
import { getVacancyMetricsByIdService } from "@/services/getVacancyMetricsByIdService";
import { getQuestionBeforeMetricsByVacancyIdService } from "@/services/getQuestionBeforeMetricsByVacancyIdService";
import { VacancyMetricsCharts } from "./VacancyMetricsCharts";
import { VacancyLineChart } from "./VacancyLineChart";
import { apiDelay } from "@/mock/apiDelay";

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
  console.log("getQuestionBeforeMetricsByVacancyId: " + JSON.stringify(questionBeforeMetrics));
  return questionBeforeMetrics;
}

export async function VacancyMetricsComp({ id }: VacancyMetricsProps) {
  const vacancyMetrics = await getVacancyMetricsById(id);
  const questionBeforeMetrics = await getQuestionBeforeMetricsByVacancyId(id);

  return (
    <div className="lg:grid lg:grid-cols-[1fr_400px] gap-2">
      <Card>
        <CardHeader>
          <CardTitle>Número de candidaturas nos últimos 30 dias</CardTitle>
        </CardHeader>
        <CardContent>
          <VacancyLineChart vacancyMetrics={vacancyMetrics} chartConfig={vacancyChartConfig} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Candidaturas por plataforma</CardTitle>
        </CardHeader>
        <CardContent>
          <VacancyMetricsCharts questionBeforeMetrics={questionBeforeMetrics} />
        </CardContent>
        <CardFooter className="mt-auto">
          <p className="text-sm italic opacity-70">
            *As métricas de pré-candidatura ajudam a entender melhor as conexões dos candidatos com a empresa, facilitando o processo seletivo.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
