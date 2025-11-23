import { BackNavButton } from "@/components/BackNavButton";
import { CreateVacancyForm } from "@/components/CreateVacancyForm";
import { Separator } from "radix-ui";

export default function CreateVacancyPage() {
  return (
    <main>
      <div className="mt-12 w-xl mx-auto">
        <BackNavButton />
        <h1 className="font-bold text-3xl">Criar nova vaga</h1>
        <Separator.Root className="my-4 bg-foreground w-full h-px" />
        <CreateVacancyForm />
      </div>
    </main>
  );
}