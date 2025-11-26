"use client"

import { AuthContext } from "@/contexts/AuthContext";
import { SelectionProcessMetrics } from "@/types/SelectionProcessMetrics";
import { useContext, useEffect, useState } from "react";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const chartConfig: ChartConfig = {
  quantity: {
    label: "Quantidade",
    color: "var(--chart-1)",
  },
};

export function DashboardGlobalMetrics() {
  const [selectionProcessMetrics, setSelectionProcessMetrics] = useState<SelectionProcessMetrics | null>(null);
  const {profile} = useContext(AuthContext);

  async function fetchSelectionProcessMetrics(enterpriseId?: string) {
    if (!enterpriseId) return;
    const response = await fetch(`/api/metrics/selection-processes/${enterpriseId}`);

    const data = await response.json();
    setSelectionProcessMetrics(data);
  }

  useEffect(() => {
    fetchSelectionProcessMetrics(profile?.id);
  }, [profile]);
  
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Métricas globais</h2>
      <div className="lg:grid lg:grid-cols-[1fr_500px] lg:grid-rows-1 flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>
              Número de candidaturas nos últimos 30 dias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={selectionProcessMetrics?.last_n_days || []}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="quantity"
                  type="linear"
                  stroke="var(--color-quantity)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 font-semibold text-xl">
              <p>
                Total de candidaturas: {selectionProcessMetrics?.summary.total_selection_processes}
              </p>

              <p>
                Total de candidatos distintos: {selectionProcessMetrics?.summary.total_unique_candidates}
              </p>

              <p>
                Total de vagas distintas: {selectionProcessMetrics?.summary.total_unique_vacancies}
              </p>

              <p>
                Média de candidaturas por vaga: {selectionProcessMetrics?.summary.avg_per_vacancy.toFixed(2)}
              </p>
            </div>
          </CardContent>
          <CardFooter className="mt-auto">
            Últimos 30 dias
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}