import { BackNavButton } from "@/components/BackNavButton";
import { ProfileDetails } from "@/components/ProfileDetails";
import { Separator } from "@/components/ui/separator";
import { VacancyList } from "@/components/VacancyList";
import { BriefcaseIcon } from "lucide-react";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="px-4 py-6 md:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
        <BackNavButton route="/home" />
        
        <ProfileDetails />
        
        <Separator className="my-8" />
        
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BriefcaseIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Minhas Vagas</h2>
              <p className="text-sm text-muted-foreground">
                Gerencie todas as suas vagas publicadas
              </p>
            </div>
          </div>
          
          <VacancyList />
        </section>
      </div>
    </main>
  );
}