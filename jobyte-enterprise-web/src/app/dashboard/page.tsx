import { ChartAreaIcon, PlusIcon } from "lucide-react";
import { VacancyList } from "@/components/VacancyList";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { DashboardGlobalMetrics } from "@/components/DashboardGlobalMetrics";

export default function Dashboard() {
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
          
          <VacancyList />
        </section>

        <DashboardGlobalMetrics />
      </div>
    </main>
  );
}