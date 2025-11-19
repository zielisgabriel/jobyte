"use client"

import { VacancyMetrics } from "@/types/VacancyMetrics";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { CartesianGrid, Line, LineChart, XAxis, Pie, PieChart, Sector, Cell } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { QuestionBeforeMetrics } from "@/types/QuestionBeforeMetrics";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

interface VacancyMetricsProps {
  id: string;
}

const vacancyChartConfig: ChartConfig = {
  quantity: {
    label: "Quantidade de Candidaturas",
    color: "var(--chart-1)",
  }
}

export function VacancyMetricsComp({ id }: VacancyMetricsProps) {
  const [vacancyMetrics, setVacancyMetrics] = useState<VacancyMetrics | null>(null);
  const [questionBeforeMetrics, setQuestionBeforeMetrics] = useState<QuestionBeforeMetrics | null>(null);
  const [chartColors, setChartColors] = useState<ChartConfig>({});

  function generateDynamicColors(platformNames: string[]) {
    // Palette of CSS variables that are guaranteed to exist in globals.css
    // If you add more --chart-N variables, extend this array accordingly.
    const palette = ["--chart-1", "--chart-2", "--chart-3", "--chart-4"];
    const colors: ChartConfig = {};

    platformNames.forEach((name, idx) => {
      const paletteIndex = idx % palette.length; // cycle through available vars
      const colorVar = palette[paletteIndex];
      colors[name] = { label: name, color: `var(${colorVar})` };
    });

    setChartColors(colors);
  }

  async function fetchVacancyMetrics(vacancyId: string) {
    const response = await fetch(`/api/metrics/vacancy/${vacancyId}`);
    const data = await response.json();
    setVacancyMetrics(data);
  }

  async function fetchQuestionBeforeMetrics(vacancyId: string) {
    const response = await fetch(`/api/metrics/questions-before/${vacancyId}`);
    const data = await response.json();
    setQuestionBeforeMetrics(data);

    const platformNames = data.pie_chart.map((item: any) => item.platform);
    generateDynamicColors(platformNames);
  }

  useEffect(() => {
    fetchVacancyMetrics(id);
    fetchQuestionBeforeMetrics(id);
  }, [id]);

  return (
    <div className="lg:grid lg:grid-cols-[1fr_400px] gap-2">
      <Card>
        <CardHeader>
          <CardTitle>Número de candidaturas nos últimos 30 dias</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={vacancyChartConfig}>
            <LineChart
              accessibilityLayer
              data={vacancyMetrics?.metrics.applications_last_30_days || []}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short"
                  });
                }}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
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
          <CardTitle>Candidaturas por plataforma</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartColors} className="mx-auto aspect-square max-h-[250px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

              <Pie
                data={questionBeforeMetrics?.pie_chart || []}
                dataKey="quantity"
                nameKey="platform"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={0}
                activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                  <Sector {...props} outerRadius={outerRadius + 10} />
                )}
              >
                {questionBeforeMetrics?.pie_chart?.map((entry, index) => {
                  const color = chartColors[entry.platform]?.color ?? "var(--chart-1)";
                  return <Cell key={index} fill={color} />;
                })}
              </Pie>
            </PieChart>
          </ChartContainer>
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
