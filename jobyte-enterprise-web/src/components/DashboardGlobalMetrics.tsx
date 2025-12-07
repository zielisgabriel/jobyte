"use client"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { 
  UsersIcon, 
  BriefcaseIcon, 
  TrendingUpIcon, 
  ActivityIcon,
  CalendarIcon
} from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { useProfileStore } from "@/hooks/useProfileStore";
import { useQuery } from "@tanstack/react-query";
import { SelectionProcessMetrics } from "@/types/SelectionProcessMetrics";

const chartConfig: ChartConfig = {
  quantity: {
    label: "Candidaturas",
    color: "var(--chart-1)",
  },
};

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description?: string;
  iconBgClass?: string;
}

function MetricCard({
  icon,
  label,
  value,
  description,
  iconBgClass = "bg-primary/10 text-primary"
}: MetricCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted/80 transition-colors">
      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${iconBgClass}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-2xl font-bold truncate">{value}</p>
        <p className="text-sm text-muted-foreground truncate">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground/70 truncate">{description}</p>
        )}
      </div>
    </div>
  );
}

export interface DashboardGlobalMetricsRef {
  refresh: () => Promise<void>;
  isRefreshing: boolean;
  lastUpdated: Date | null;
}

export function DashboardGlobalMetrics() {
  const { profileSimple, loading: profileLoading } = useProfileStore();

  async function getSelectionProcessMetrics(enterpriseId: string): Promise<SelectionProcessMetrics> {
    const response = await fetch(`/api/metrics/selection-processes/${enterpriseId}`);
    const data = await response.json();
    return data;
  }

  const {
    data: selectionProcessMetrics,
    isLoading
  } = useQuery({
    queryKey: ["selectionProcessMetrics", profileSimple?.id],
    queryFn: () => getSelectionProcessMetrics(profileSimple!.id),
    enabled: !profileLoading && !!profileSimple?.id
  });

  if (profileLoading || isLoading) {
    return (
      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-6">
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
              Últimos 30 dias
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={selectionProcessMetrics?.last_n_days || []}
                margin={{ left: 0, right: 12, top: 12, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorQuantity" x1="0" y1="0" x2="0" y2="1">
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
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  fontSize={12}
                  tick={{ fill: "var(--muted-foreground)" }}
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="flex items-center gap-2">
            <TrendingUpIcon className="h-5 w-5 text-primary" />
            Resumo
          </CardTitle>
          <CardDescription>
            Métricas consolidadas do período
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <MetricCard
            icon={<UsersIcon className="h-5 w-5" />}
            label="Total de Candidaturas"
            value={selectionProcessMetrics?.summary.total_selection_processes ?? 0}
            iconBgClass="bg-blue-500/10 text-blue-500"
          />
          
          <MetricCard
            icon={<UsersIcon className="h-5 w-5" />}
            label="Candidatos Únicos"
            value={selectionProcessMetrics?.summary.total_unique_candidates ?? 0}
            iconBgClass="bg-green-500/10 text-green-500"
          />
          
          <MetricCard
            icon={<BriefcaseIcon className="h-5 w-5" />}
            label="Vagas com Candidaturas"
            value={selectionProcessMetrics?.summary.total_unique_vacancies ?? 0}
            iconBgClass="bg-purple-500/10 text-purple-500"
          />
          
          <MetricCard
            icon={<TrendingUpIcon className="h-5 w-5" />}
            label="Média por Vaga"
            value={selectionProcessMetrics?.summary.avg_per_vacancy?.toFixed(1) ?? "0.0"}
            description="candidaturas em média"
            iconBgClass="bg-amber-500/10 text-amber-500"
          />
        </CardContent>
        <CardFooter className="border-t bg-muted/30 text-sm text-muted-foreground">
          <CalendarIcon className="h-4 w-4 mr-2" />
          Período: Últimos 30 dias
        </CardFooter>
      </Card>
    </div>
  );
};
