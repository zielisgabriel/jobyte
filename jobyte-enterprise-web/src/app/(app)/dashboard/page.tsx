import { 
  BriefcaseIcon, 
  CalendarIcon, 
  PlusIcon, 
  TrendingUpIcon, 
  UsersIcon,
  BarChart3Icon,
  ArrowUpRightIcon,
  ClockIcon
} from "lucide-react";
import { VacancyList } from "@/components/VacancyList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardGlobalMetrics } from "@/components/DashboardGlobalMetrics";
import { getCurrentProfileSimple } from "@/utils/get-current-profile-simple";

const QUICK_STATS = [
  {
    title: "Vagas Ativas",
    value: "12",
    change: "+2 este mês",
    trend: "up",
    icon: <BriefcaseIcon className="h-4 w-4" />,
  },
  {
    title: "Candidaturas",
    value: "847",
    change: "+23% vs mês anterior",
    trend: "up",
    icon: <UsersIcon className="h-4 w-4" />,
  },
  {
    title: "Entrevistas Agendadas",
    value: "28",
    change: "Próximos 7 dias",
    trend: "neutral",
    icon: <CalendarIcon className="h-4 w-4" />,
  },
  {
    title: "Taxa de Conversão",
    value: "15.2%",
    change: "+3.1% vs mês anterior",
    trend: "up",
    icon: <TrendingUpIcon className="h-4 w-4" />,
  },
];

async function DashboardGlobalMetricsArea() {
  const profileSimple = await getCurrentProfileSimple();

  console.log("profileSimple: ", profileSimple)

  return <DashboardGlobalMetrics profileSimple={profileSimple} />
}

async function VacancyListWrapper({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  return <VacancyList page={page} />;
}

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  return (
    <main className="min-h-screen">
      <section className="relative border-b bg-gradient-to-b from-card/80 to-background">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BarChart3Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Dashboard
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Gerencie suas vagas e acompanhe métricas
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Link href="/dashboard/vacancy/create">
                <Button className="gap-2">
                  <PlusIcon className="h-4 w-4" />
                  Nova Vaga
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_STATS.map((stat, index) => (
            <Card key={index} className="group hover:shadow-md transition-all duration-300 hover:border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {stat.icon}
                  </div>
                  {stat.trend === "up" && (
                    <div className="flex items-center text-xs text-green-500 font-medium">
                      <ArrowUpRightIcon className="h-3 w-3 mr-0.5" />
                      <span className="hidden sm:inline">Em alta</span>
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-2xl sm:text-3xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                  <p className="text-xs text-muted-foreground/80">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <BriefcaseIcon className="h-5 w-5 text-primary" />
                Minhas Vagas
              </h2>
              <p className="text-sm text-muted-foreground">
                Gerencie e acompanhe suas vagas publicadas
              </p>
            </div>
            <Link href="/dashboard/vacancy/create" className="hidden sm:block">
              <Button variant="outline" size="sm" className="gap-2">
                <PlusIcon className="h-4 w-4" />
                Criar Vaga
              </Button>
            </Link>
          </div>
          
          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardHeader className="space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            }
          >
            <VacancyListWrapper searchParams={searchParams} />
          </Suspense>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <TrendingUpIcon className="h-5 w-5 text-primary" />
                Métricas Globais
              </h2>
            </div>

            <p className="flex items-center gap-1 text-sm text-foreground-muted">
              <ClockIcon size={14} />
              Atualização em tempo real
            </p>
          </div>

          <Suspense
            fallback={
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
            }
          >
            <DashboardGlobalMetricsArea />
          </Suspense>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="group hover:shadow-md transition-all duration-300 hover:border-primary/20 cursor-pointer">
            <Link href="/dashboard/vacancy/create">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <PlusIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Criar Nova Vaga</h3>
                  <p className="text-sm text-muted-foreground">Publique uma nova oportunidade</p>
                </div>
              </CardContent>
            </Link>
          </Card>
          
          <Card className="group hover:shadow-md transition-all duration-300 hover:border-primary/20 cursor-pointer">
            <Link href="/profile">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  <UsersIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Perfil da Empresa</h3>
                  <p className="text-sm text-muted-foreground">Atualize informações da empresa</p>
                </div>
              </CardContent>
            </Link>
          </Card>
          
          <Card className="group hover:shadow-md transition-all duration-300 hover:border-primary/20 cursor-pointer sm:col-span-2 lg:col-span-1">
            <Link href="/settings">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <BarChart3Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Relatórios</h3>
                  <p className="text-sm text-muted-foreground">Exporte dados e análises</p>
                </div>
              </CardContent>
            </Link>
          </Card>
        </section>
      </div>
    </main>
  );
}