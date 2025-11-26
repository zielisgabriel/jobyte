"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext, useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { DropdownMenuContent, DropdownMenuRoot, DropdownMenuTrigger } from "./ui/Dropdown";
import { ChevronDown } from "lucide-react";
import { VacancyPlatform } from "@/types/VacancyPlatform";
import { AuthContext } from "@/contexts/AuthContext";
import { ScrollArea } from "radix-ui";

const createQuestionBeforeFormSchema = (hasAcquaintance: boolean) => z.object({
  acquaintanceName: hasAcquaintance 
    ? z.string().min(2, "Nome do conhecido é obrigatório").trim()
    : z.string().optional(),
  acquaintanceEmail: hasAcquaintance
    ? z.email("E-mail inválido")
    : z.string().optional()
});

type QuestionBeforeFormData = z.infer<ReturnType<typeof createQuestionBeforeFormSchema>>;

interface QuestionBeforeFormProps {
  vacancyId: string;
}

export function QuestionBeforeForm({ vacancyId }: QuestionBeforeFormProps) {
  const {profile} = useContext(AuthContext);
  const [hasAcquaintanceInCompany, setHasAcquaintanceInCompany] = useState<"yes" | "no" | null>(null);
  const [youWorkAtCompany, setYouWorkAtCompany] = useState<"yes" | "no" | null>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<QuestionBeforeFormData>({
    resolver: zodResolver(createQuestionBeforeFormSchema(hasAcquaintanceInCompany === "yes"))
  });
  const [vacancyPlatforms, setVacancyPlatforms] = useState<VacancyPlatform[]>([]);
  const [vacancyPlatformMenuDisplay, setVacancyPlatformMenuDisplay] = useState<VacancyPlatform | null>(null);
  const [isVacancyPlatformMenuOpen, setIsVacancyPlatformMenuOpen] = useState(false);
  
  async function onSubmit(data: QuestionBeforeFormData) {
    const hasAcquaintance = hasAcquaintanceInCompany === "yes" ? true : false;
    const worksAtCompany = youWorkAtCompany === "yes" ? true : false;

    if (!vacancyPlatformMenuDisplay) {
      alert("Por favor, selecione onde você viu a vaga");
      return;
    }

    if (hasAcquaintanceInCompany === null) {
      alert("Por favor, responda se tem conhecido na empresa");
      return;
    }

    if (youWorkAtCompany === null) {
      alert("Por favor, responda se trabalha na empresa");
      return;
    }

    const payload = {
      hasAcquaintanceInCompany: hasAcquaintance,
      youWorkAtCompany: worksAtCompany,
      plataformId: vacancyPlatformMenuDisplay.id,
      candidateId: profile?.id,
      acquaintanceName: data.acquaintanceName || null,
      acquaintanceEmail: data.acquaintanceEmail || null
    };

    const response = await fetch(`/api/candidate/selection-process/apply/${vacancyId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.status !== 201) {
      console.error(response);
      return;
    }

    resetForm();
    alert("Candidatura realizada com sucesso!");
  }

  function resetForm() {
    reset();
    setHasAcquaintanceInCompany(null);
    setYouWorkAtCompany(null);
    setVacancyPlatformMenuDisplay(null);
  }

  async function fetchVacancyPlatforms() {
    const response = await fetch("/api/public/platform/all");
    const data = await response.json();
    setVacancyPlatforms(data);
  }

  function selectPlatform(platform: VacancyPlatform) {
    setVacancyPlatformMenuDisplay(platform);
    setIsVacancyPlatformMenuOpen(false);
  }

  useEffect(() => {
    if (vacancyPlatforms.length > 0) return;

    fetchVacancyPlatforms();
  }, [vacancyPlatforms]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 h-full"
    >
      <div className="flex flex-col gap-1">
        <p>Você trabalha na empresa?</p>
        <div className="flex gap-1">
          <Button
            variant={youWorkAtCompany === "yes" ? "default" : "outline"}
            onClick={() => setYouWorkAtCompany("yes")}
          >
            Sim
          </Button>
          <Button
            variant={youWorkAtCompany === "no" ? "default" : "outline"}
            onClick={() => setYouWorkAtCompany("no")}
          >
            Não
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p>Tem algum conhecido na empresa?</p>
        <div className="flex gap-1">
          <Button
            variant={hasAcquaintanceInCompany === "yes" ? "default" : "outline"}
            onClick={() => setHasAcquaintanceInCompany("yes")}
          >
            Sim
          </Button>
          <Button
            variant={hasAcquaintanceInCompany === "no" ? "default" : "outline"}
            onClick={() => setHasAcquaintanceInCompany("no")}
          >
            Não
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p>Nome do conhecido na empresa</p>
        <div className="flex gap-1">
          <Input
            {...register("acquaintanceName")}
            placeholder="Exemplo"
            variant={"outline"}
            disabled={hasAcquaintanceInCompany === "no" || !hasAcquaintanceInCompany}
          />
        </div>
        {errors.acquaintanceName && (
          <p className="text-sm text-red-600">{errors.acquaintanceName.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p>E-mail do conhecido</p>
        <div className="flex gap-1">
          <Input
          {...register("acquaintanceEmail")}
            placeholder="exemplo@email.com"
            variant={"outline"}
            disabled={hasAcquaintanceInCompany === "no" || !hasAcquaintanceInCompany}
          />
        </div>
        {errors.acquaintanceEmail && (
          <p className="text-sm text-red-600">{errors.acquaintanceEmail.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p>Onde você viu essa vaga?</p>

        <DropdownMenuRoot>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"outline"}
              className="rounded-xl justify-between"
              onClick={() => setIsVacancyPlatformMenuOpen(!isVacancyPlatformMenuOpen)}
            >
              {vacancyPlatformMenuDisplay?.name || "Selecione a plataforma"}
              {isVacancyPlatformMenuOpen ? <ChevronDown className="rotate-180 transition-transform" /> : <ChevronDown className="transition-transform" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
              <ScrollArea.Root>
                <ScrollArea.Viewport className="h-40">
                  {vacancyPlatforms.map((platform) => (
                    <Button
                      key={platform.id}
                      onClick={() => selectPlatform(platform)}
                      className="w-full"
                      variant={"ghost"}
                    >
                      {platform.name === "Other" ? "Outro" : platform.name}
                    </Button>
                  ))}
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                  orientation="vertical"
                  className="flex select-none touch-none p-0.5 bg-transparent transition-colors duration-[160ms] ease-out hover:bg-black/10"
                >
                  <ScrollArea.Thumb className="flex-1 bg-black/30 rounded" />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>
          </DropdownMenuContent>
        </DropdownMenuRoot>
      </div>

      <div className="space-y-2">
        <h1 className="font-semibold text-sm">Para que isso?</h1>
        <p className="text-sm opacity-80">
          Este sistema de pré-candidatura ajuda a empresa a entender melhor seu perfil e suas conexões com a organização. Saber se você já trabalha lá ou conhece alguém na empresa auxilia o RH a direcionar sua candidatura para a pessoa certa e agilizar o processo seletivo. Essas informações também podem fortalecer sua candidatura, já que indicações de funcionários são muito valorizadas pelas empresas.
        </p>
      </div>

      <Button
        className="w-full mt-auto"
        type="submit"
      >
        Candidatar
      </Button>
    </form>
  );
}