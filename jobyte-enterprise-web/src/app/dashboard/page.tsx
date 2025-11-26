import { ChartAreaIcon, PlusIcon } from "lucide-react";
import { VacancyList } from "@/components/VacancyList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DashboardGlobalMetrics } from "@/components/DashboardGlobalMetrics";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
              <Link href="/dashboard/vacancy/create">
                <Button
                  variant={"outline"}
                >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Nova Vaga
                </Button>
              </Link>
          </div>
          
          <Suspense
            fallback={
              <>
                <Skeleton className="rounded-lg h-[300px] w-full" />
                <Skeleton className="rounded-lg h-[300px] w-full" />
                <Skeleton className="rounded-lg h-[300px] w-full" />
              </>
            }
          >
            <VacancyList page={page} />
          </Suspense>
        </section>
        <DashboardGlobalMetrics />
      </div>
    </main>
  );
}