"use client";

import { useState } from "react";
import { BackNavButton } from "@/components/back-nav-button";
import { CreateVacancyForm } from "@/components/create-vacancy-form";
import { VacancyPreview } from "@/components/vacancy-preview";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircleIcon, BriefcaseIcon } from "lucide-react";

export default function CreateVacancyPage() {
  const [formValues, setFormValues] = useState({ title: "", description: "" });

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

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="overflow-hidden">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="flex items-center gap-2">
                <BriefcaseIcon className="h-5 w-5 text-primary" />
                Informações da Vaga
              </CardTitle>
              <CardDescription>
                Descreva a vaga de forma clara para atrair os melhores
                candidatos
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <CreateVacancyForm onValuesChange={setFormValues} />
            </CardContent>
          </Card>

          <div className="hidden lg:block sticky top-6 h-fit">
            <VacancyPreview
              title={formValues.title}
              description={formValues.description}
            />
          </div>
        </div>
      </div>
    </main>
  );
}