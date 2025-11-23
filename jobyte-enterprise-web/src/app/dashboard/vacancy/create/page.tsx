import { BackNavButton } from "@/components/BackNavButton";
import { CreateVacancyForm } from "@/components/CreateVacancyForm";
import { Separator } from "@/components/ui/separator";

export default function CreateVacancyPage() {
  return (
    <main>
      <div className="mt-12 w-xl mx-auto">
        <BackNavButton />
        <h1 className="font-bold text-3xl">Criar nova vaga</h1>
        <Separator className="my-2" />
        <CreateVacancyForm />
      </div>
    </main>
  );
}