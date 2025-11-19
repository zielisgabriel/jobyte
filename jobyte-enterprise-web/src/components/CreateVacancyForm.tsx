"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/Input";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "./ui/Button";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Vacancy } from "@/types/Vacancy";

const createVacancyFormSchema = z.object({
  title: z.string().trim().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z
    .string()
    .trim()
    .min(10, "A descrição deve ter pelo menos 10 caracteres")
});

type CreateVacancyFormData = z.infer<typeof createVacancyFormSchema>;

export function CreateVacancyForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState,
    reset
  } = useForm<CreateVacancyFormData>({
    resolver: zodResolver(createVacancyFormSchema),
  });
  const {profile} = useContext(AuthContext);
  const router = useRouter();

  async function onSubmit(data: CreateVacancyFormData) {
    console.log("Submitting vacancy:", data);
    console.log("Enterprise ID:", profile?.id);

    if (!profile?.id) {
      console.error("Perfil não carregado ou enterpriseId ausente");
      return;
    }

    const response = await fetch("/api/enterprise/vacancy/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        enterpriseId: profile.id,
      }),
    });

    let responseBody: unknown = null;
    try {
      responseBody = await response.json();
    } catch (error) {
      console.error("Erro ao ler resposta do servidor:", error);
    }

    console.log(responseBody);

    if (!response.ok) {
      console.error(
        "Falha ao criar vaga:",
        response.status,
        response.statusText,
        responseBody
      );
      setSubmitError(
        (responseBody as { message?: string })?.message ??
          "Não foi possível criar a vaga. Tente novamente."
      );
      return;
    }

    const createdVacancy: Vacancy = responseBody as Vacancy;

    reset();
    router.push(`/dashboard/vacancy/${createdVacancy.id}`);
  }

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit,
        (errors) => {
          console.error("Validation errors:", errors);
          const first = Object.values(errors)[0] as any;
          if (first?.message) {
            setSubmitError(first.message as string);
          }
        }
      )}
    >
      {submitError && (
        <p className="text-sm text-red-600 mb-2">{submitError}</p>
      )}
      <div className="space-y-1">
        <label htmlFor="title" className="flex gap-1 items-center font-semibold">
          <ArrowRightIcon size={16} />
          Título
        </label>
        <Input
          id="title"
          {...register("title")}
          aria-invalid={!!formState.errors.title}
          placeholder="Desenvolvedor Frontend"
          variant={"outline"}
        />
      </div>

      <div className="space-y-1 mt-4">
        <label htmlFor="description" className="flex gap-1 items-center font-semibold">
          <ArrowRightIcon size={16} />
          Descrição
        </label>
        <textarea
          id="description"
          {...register("description")}
          aria-invalid={!!formState.errors.description}
          placeholder="Descrição detalhada da vaga..."
          className="w-full p-2 border border-gray-300 rounded-xl resize-none h-32 placeholder:text-foreground/80 focus:outline-none focus:ring-2 focus:ring-foreground/50"
        />
      </div>

      {/* Mensagens simples de erro de validação */}
      {formState.errors.title && (
        <p className="text-sm text-red-600 mt-1">{formState.errors.title.message}</p>
      )}
      {formState.errors.description && (
        <p className="text-sm text-red-600 mt-1">{formState.errors.description.message}</p>
      )}

      <Button
        type="submit"
        className="w-full mt-4"
      >
        Criar Vaga
      </Button>
    </form>
  );
}