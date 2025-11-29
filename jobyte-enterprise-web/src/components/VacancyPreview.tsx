"use client";

import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import {
  Building2Icon,
  EyeIcon,
  CalendarIcon,
  FileTextIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface VacancyPreviewProps {
  title: string;
  description: string;
}

export function VacancyPreview({ title, description }: VacancyPreviewProps) {
  const { profile } = useContext(AuthContext);
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const hasTitle = title.trim().length > 0;
  const hasDescription = description.trim().length > 0;

  return (
    <Card className="h-full border-dashed">
      <CardHeader className="border-b bg-muted/30 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <EyeIcon className="h-4 w-4 text-primary" />
            Preview da Vaga
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            Visão do Candidato
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            {hasTitle ? (
              <h2 className="text-2xl font-bold leading-tight">{title}</h2>
            ) : (
              <p className="text-2xl font-bold text-muted-foreground/50">
                Escreva um título...
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Building2Icon className="h-4 w-4" />
                {profile?.companyName || "Sua Empresa"}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarIcon className="h-4 w-4" />
                {currentDate}
              </span>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <FileTextIcon className="h-4 w-4" />
              Descrição da Vaga
            </h3>

            {hasDescription ? (
              <ScrollArea className="h-[280px]">
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-all pr-4">
                  {description}
                </p>
              </ScrollArea>
            ) : (
              <p className="text-sm text-muted-foreground/50">
                Descreva a vaga aqui...
              </p>
            )}
          </div>
        </div>

        <div className="border-t bg-muted/20 p-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Esta é uma prévia de como os candidatos verão sua vaga</span>
            {hasTitle && hasDescription && (
              <Badge
                variant="outline"
                className="text-green-500 border-green-500/30"
              >
                Pronto para publicar
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
