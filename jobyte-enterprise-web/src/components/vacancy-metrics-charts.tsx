"use client";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { QuestionBeforeMetrics } from "@/types/question-before-metrics";
import { Cell, Pie, PieChart, Sector, ResponsiveContainer } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { ScrollArea } from "./ui/scroll-area";

interface VacancyMetricsChartsProps {
  questionBeforeMetrics: QuestionBeforeMetrics;
}

const CHART_COLORS = [
  "#3b82f6", // blue-500
  "#22c55e", // green-500
  "#f59e0b", // amber-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
  "#06b6d4", // cyan-500
  "#f97316", // orange-500
  "#14b8a6", // teal-500
];

export function VacancyMetricsCharts({ questionBeforeMetrics }: VacancyMetricsChartsProps) {
  function buildChartColors(platformNames: string[]): ChartConfig {
    const config: ChartConfig = {};
    const unique = Array.from(new Set(platformNames)).sort((a, b) => a.localeCompare(b));
    
    unique.forEach((name, i) => {
      config[name] = { label: name, color: CHART_COLORS[i % CHART_COLORS.length] };
    });
    
    return config;
  }

  const pieData = questionBeforeMetrics?.pie_chart || [];
  const chartColors = buildChartColors(pieData.map(d => d.platform));

  if (pieData.length === 0) {
    return (
      <div className="h-[280px] flex items-center justify-center text-muted-foreground">
        <p className="text-center">Sem dados de plataforma disponíveis.</p>
      </div>
    );
  }

  const total = pieData.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-4">
      <ChartContainer config={chartColors} className="mx-auto aspect-square max-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <ChartTooltip 
              cursor={false} 
              content={<ChartTooltipContent hideLabel />} 
            />
            <Pie
              data={pieData}
              dataKey="quantity"
              nameKey="platform"
              innerRadius={50}
              outerRadius={80}
              strokeWidth={3}
              stroke="hsl(var(--background))"
              activeIndex={0}
              activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 8} />
              )}
            >
              {pieData.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={CHART_COLORS[index % CHART_COLORS.length]} 
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>

      <ScrollArea className="h-[160px]">
        <div className="space-y-1 pr-3">
          {pieData.map((entry, index) => {
            const percentage = total > 0 ? ((entry.quantity / total) * 100).toFixed(1) : 0;
            return (
              <div 
                key={entry.platform} 
                className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="h-3 w-3 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                  />
                  <span className="text-muted-foreground truncate">{entry.platform}</span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="font-medium">{entry.quantity}</span>
                  <span className="text-xs text-muted-foreground w-12 text-right">
                    {percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}