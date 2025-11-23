import { ChartAreaIcon, PlusIcon } from "lucide-react";
import { VacancyList } from "@/components/VacancyList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DashboardGlobalMetrics } from "@/components/DashboardGlobalMetrics";
import { Suspense } from "react";

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;

  return (
    <main>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <h1 className="flex gap-1 items-end text-4xl font-bold mb-8 underline">
          <ChartAreaIcon size={32} />
          Dashboard
        </h1>
        
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Minhas Vagas</h2>
            <Button asChild>
              <Link href="/dashboard/vacancy/create">
                <PlusIcon className="h-4 w-4 mr-2" />
                Nova Vaga
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
            <Suspense
              fallback={
                <p>Carregando...</p>
              }
            >
              <VacancyList page={page} />
            </Suspense>
          </div>
        </section>
        <DashboardGlobalMetrics />
      </div>
    </main>
  );
}