import { CreateVacancyForm } from "@/components/CreateVacancyForm";
import { Separator } from "@/components/ui/separator";
import { BackButton } from "@/components/BackButton";

export default function CreateVacancyPage() {
  return (
    <main>
      <div className="mt-12 w-xl mx-auto">
        <BackButton />
        <h1 className="font-bold text-3xl">Criar nova vaga</h1>
        <Separator className="my-4" />
        <CreateVacancyForm />
      </div>
    </main>
  );
}