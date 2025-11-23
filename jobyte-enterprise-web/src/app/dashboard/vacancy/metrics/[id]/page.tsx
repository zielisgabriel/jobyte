import { BackNavButton } from "@/components/BackNavButton";
import { Skeleton } from "@/components/ui/skeleton";
import { VacancyDetails } from "@/components/VacancyDetails";
import { VacancyMetricsComp } from "@/components/VacancyMetricsComp";
import { Suspense } from "react";

export default async function VacancyMetricsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="max-w-6xl mx-auto py-4 px-2 md:px-4 space-y-2">
      <BackNavButton />

      <Suspense
        fallback={
          <div className="flex flex-col gap-2">
            <Skeleton className="rounded-full h-8 max-w-70" />
            <Skeleton className="rounded-full h-4 w-15" />
            <Skeleton className="rounded-xl h-100 w-full" />
          </div>
        }
      >
        <VacancyDetails id={id} />
      </Suspense>
        
      <Suspense
        fallback={
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="rounded-xl h-100 w-full" />
            <Skeleton className="rounded-xl h-100 w-full" />
          </div>
        }
      >
        <VacancyMetricsComp id={id} />
      </Suspense>
    </main>
  );
}