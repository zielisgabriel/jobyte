"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { VacancyMetrics } from "@/types/vacancy-metrics";

interface VacancyLineChartProps {
  vacancyMetrics: VacancyMetrics;
  chartConfig: ChartConfig;
}

export function VacancyLineChart({ vacancyMetrics, chartConfig }: VacancyLineChartProps) {
  const lineData = vacancyMetrics?.metrics?.applications_last_30_days || [];

  if (lineData.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        <p>Sem dados disponíveis para o período.</p>
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          accessibilityLayer
          data={lineData}
          margin={{ left: 0, right: 12, top: 12, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorQuantityVacancy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-quantity)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--color-quantity)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="var(--border)"
            opacity={0.5}
          />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={12}
            tick={{ fill: "var(--muted-foreground)" }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "short"
              });
            }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={12}
            tick={{ fill: "var(--muted-foreground)" }}
            width={30}
          />
          <ChartTooltip 
            cursor={{ stroke: "var(--primary)", strokeWidth: 1, strokeDasharray: "4 4" }}
            content={<ChartTooltipContent hideLabel />} 
          />
          <Line
            dataKey="quantity"
            type="monotone"
            stroke="var(--color-quantity)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 2, fill: "var(--background)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
