"use client";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { QuestionBeforeMetrics } from "@/types/QuestionBeforeMetrics";
import { Cell, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

interface VacancyMetricsChartsProps {
  questionBeforeMetrics: QuestionBeforeMetrics;
}

export function VacancyMetricsCharts({ questionBeforeMetrics }: VacancyMetricsChartsProps) {
  function buildChartColors(platformNames: string[]): ChartConfig {
    const paletteVars = ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"];
    const config: ChartConfig = {};
    const unique = Array.from(new Set(platformNames)).sort((a, b) => a.localeCompare(b));
    
    unique.forEach((name, i) => {
      const colorVar = paletteVars[i % paletteVars.length];
      config[name] = { label: name, color: `var(${colorVar})` };
    });
    
    return config;
  }

  const pieData = questionBeforeMetrics?.pie_chart || [];
  const chartColors = buildChartColors(pieData.map(d => d.platform));

  return (
    <ChartContainer config={chartColors} className="mx-auto aspect-square max-h-[250px]">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

        <Pie
          data={pieData}
          dataKey="quantity"
          nameKey="platform"
          innerRadius={60}
          strokeWidth={5}
          activeIndex={0}
          activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
            <Sector {...props} outerRadius={outerRadius + 10} />
          )}
        >
          {pieData.map((entry, index) => {
            const color = chartColors[entry.platform]?.color || "var(--chart-1)";
            return <Cell key={index} fill={color} />;
          })}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}