"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { BriefcaseIcon } from "lucide-react";
import { CreateVacancyForm } from "./create-vacancy-form";
import { VacancyPreview } from "./vacancy-preview";
import { ProfileSimple } from "@/types/profile-simple";

interface CreateVacancySectionProps {
  profileSimple: ProfileSimple | null
}

export function CreateVacancySection({
  profileSimple
}: CreateVacancySectionProps) {
  const [formValues, setFormValues] = useState({ title: "", description: "" });

  return (
    <section className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
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
            <CreateVacancyForm
              profileSimple={profileSimple}
              onValuesChange={setFormValues}
            />
          </CardContent>
        </Card>

        <div className="hidden lg:block sticky top-6 h-fit">
          <VacancyPreview
            profileSimple={profileSimple}
            title={formValues.title}
            description={formValues.description}
          />
        </div>
      </div>
    </section>
  );
}