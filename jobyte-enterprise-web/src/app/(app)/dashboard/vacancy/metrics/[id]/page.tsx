import { BackNavButton } from "@/components/back-nav-button";
import { Skeleton } from "@/components/ui/skeleton";
import { VacancyDetails } from "@/components/vacancy-details";
import { VacancyMetricsComp } from "@/components/vacancy-metrics-comp";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BarChart3Icon } from "lucide-react";
import { Suspense } from "react";

export default async function VacancyMetricsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <section className="relative border-b bg-gradient-to-b from-card/80 to-background">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <BackNavButton 
            route="/dashboard" 
            className="mb-4 hover:bg-muted/80"
          />
          
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BarChart3Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                Métricas da Vaga
              </h1>
              <p className="text-sm text-muted-foreground">
                Acompanhe o desempenho e candidaturas
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-6">
        <Suspense
          fallback={
            <Card>
              <CardHeader className="space-y-3">
                <Skeleton className="h-8 w-3/4 max-w-md" />
                <Skeleton className="h-4 w-1/4 max-w-[150px]" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-32 w-full mt-4" />
              </CardContent>
            </Card>
          }
        >
          <VacancyDetails id={id} />
        </Suspense>
          
        <Suspense
          fallback={
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
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
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Skeleton className="h-[250px] w-[250px] rounded-full" />
                </CardContent>
              </Card>
            </div>
          }
        >
          <VacancyMetricsComp id={id} />
        </Suspense>
      </div>
    </main>
  );
}