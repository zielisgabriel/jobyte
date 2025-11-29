"use client"

import { useRef, useState } from "react";
import { TrendingUpIcon, RefreshCwIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardGlobalMetrics, DashboardGlobalMetricsRef } from "@/components/DashboardGlobalMetrics";

export function DashboardMetricsSection() {
  const metricsRef = useRef<DashboardGlobalMetricsRef>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const handleRefresh = async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    try {
      await metricsRef.current?.refresh();
      setLastUpdated(new Date());
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) return null;
    const now = new Date();
    const diffMs = now.getTime() - lastUpdated.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    
    if (diffSec < 60) return "Atualizado agora";
    if (diffMin < 60) return `Atualizado há ${diffMin} min`;
    return `Atualizado às ${lastUpdated.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <TrendingUpIcon className="h-5 w-5 text-primary" />
            Métricas Globais
          </h2>
          <p className="text-sm text-muted-foreground">
            Visão geral do desempenho das suas vagas
            {lastUpdated && (
              <span className="ml-2 text-xs">• {formatLastUpdated()}</span>
            )}
          </p>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="gap-2"
        >
          {showSuccess ? (
            <CheckIcon className="h-4 w-4 text-green-500" />
          ) : (
            <RefreshCwIcon className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          )}
          <span className="hidden sm:inline">
            {isRefreshing ? "Atualizando..." : showSuccess ? "Atualizado!" : "Atualizar dados"}
          </span>
        </Button>
      </div>
      
      <DashboardGlobalMetrics ref={metricsRef} />
    </section>
  );
}
