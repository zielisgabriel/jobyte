import { BackNavButton } from "@/components/back-nav-button";
import { PlusCircleIcon } from "lucide-react";
import { CreateVacancySection } from "@/components/create-vacancy-section";
import { getCurrentProfileSimple } from "@/utils/get-current-profile-simple";

export default async function CreateVacancyPage() {
  const profileSimple = await getCurrentProfileSimple();

  return (
    <main className="min-h-screen">
      <section className="relative border-b bg-gradient-to-b from-card/80 to-background">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <BackNavButton route="/dashboard" className="mb-4 hover:bg-muted/80" />

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <PlusCircleIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                Criar Nova Vaga
              </h1>
              <p className="text-sm text-muted-foreground">
                Preencha os dados para publicar uma nova oportunidade
              </p>
            </div>
          </div>
        </div>
      </section>

      <CreateVacancySection
        profileSimple={profileSimple}
      />
    </main>
  );
}