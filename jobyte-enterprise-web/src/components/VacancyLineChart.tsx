"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { VacancyMetrics } from "@/types/VacancyMetrics";

interface VacancyLineChartProps {
  vacancyMetrics: VacancyMetrics;
  chartConfig: ChartConfig;
}

export function VacancyLineChart({ vacancyMetrics, chartConfig }: VacancyLineChartProps) {
  const lineData = vacancyMetrics?.metrics?.applications_last_30_days || [];

  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={lineData}
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
  );
}
