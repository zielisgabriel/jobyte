"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import {
  TypeIcon,
  FileTextIcon,
  Loader2Icon,
  CheckCircleIcon,
  AlertCircleIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ProfileSimple } from "@/types/profile-simple";
import { toast } from "sonner";

const createVacancyFormSchema = z.object({
  title: z.string().trim().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z
    .string()
    .trim()
    .min(10, "A descrição deve ter pelo menos 10 caracteres"),
});

export interface CreateVacancyFormData extends z.infer<typeof createVacancyFormSchema> {}

interface CreateVacancyFormProps {
  onValuesChange?: (values: CreateVacancyFormData) => void;
  profileSimple: ProfileSimple | null
}

export function CreateVacancyForm({ onValuesChange, profileSimple }: CreateVacancyFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState, reset, watch } =
    useForm<CreateVacancyFormData>({
      resolver: zodResolver(createVacancyFormSchema),
      defaultValues: {
        title: "",
        description: "",
      },
    });

  const title = watch("title");
  const description = watch("description");

  useEffect(() => {
    onValuesChange?.({ title, description });
  }, [title, description, onValuesChange]);

  async function onSubmit(data: CreateVacancyFormData) {
    if (!profileSimple) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    
    const response = await fetch("/api/enterprise/vacancy/create", {
      method: "POST",
      body: JSON.stringify({
        data,
        profileId: profileSimple.id
      })
    });

    if (response?.status === 403) {
      const data = await response.json();
      const message = data.message;
      toast.error(message);
      return;
    }

    if (response?.status !== 201) {
      setIsSubmitting(false);
      toast.error("Houve um erro desconhecido!")
      return;
    }

    reset();
    toast.success("Vaga criada com sucesso!")
    redirect("/dashboard")
  }

  function handleValidationError(errors: typeof formState.errors) {
    const first = Object.values(errors)[0];
    if (first?.message) {
      setSubmitError(first.message as string);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, handleValidationError)}
      className="space-y-6"
    >
      {submitError && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
          <AlertCircleIcon className="h-4 w-4 flex-shrink-0" />
          <p className="text-sm">{submitError}</p>
        </div>
      )}

      <div className="space-y-2">
        <Label
          htmlFor="title"
          className="flex items-center gap-2 text-sm font-medium"
        >
          <TypeIcon className="h-4 w-4 text-muted-foreground" />
          Título da Vaga
        </Label>
        <Input
          id="title"
          {...register("title")}
          aria-invalid={!!formState.errors.title}
          placeholder="Ex: Desenvolvedor Frontend Pleno"
          className={
            formState.errors.title
              ? "border-red-500 focus-visible:ring-red-500"
              : ""
          }
        />
        {formState.errors.title && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <AlertCircleIcon className="h-3 w-3" />
            {formState.errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="description"
          className="flex items-center gap-2 text-sm font-medium"
        >
          <FileTextIcon className="h-4 w-4 text-muted-foreground" />
          Descrição da Vaga
        </Label>
        <Textarea
          id="description"
          {...register("description")}
          aria-invalid={!!formState.errors.description}
          placeholder="Descreva as responsabilidades, requisitos e benefícios da vaga..."
          className={`min-h-[400px] max-h-[400px] ${
            formState.errors.description
              ? "border-red-500 focus-visible:ring-red-500"
              : ""
          }`}
        />
        {formState.errors.description && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <AlertCircleIcon className="h-3 w-3" />
            {formState.errors.description.message}
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Dica: Inclua informações sobre a empresa, requisitos técnicos,
          benefícios e diferenciais.
        </p>
      </div>

      <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2Icon className="h-4 w-4 animate-spin" />
            Criando vaga...
          </>
        ) : (
          <>
            <CheckCircleIcon className="h-4 w-4" />
            Criar e Publicar Vaga
          </>
        )}
      </Button>
    </form>
  );
}