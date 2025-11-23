"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

interface VacancyFormProps {
  vacancy: {
    id: string;
    title: string;
    description: string;
    status: string;
  };
  onUpdate: (data: { title?: string; description?: string; status?: string }) => Promise<void>;
}

export function VacancyEditForm({ vacancy, onUpdate }: VacancyFormProps) {
  const [title, setTitle] = useState(vacancy.title);
  const [description, setDescription] = useState(vacancy.description);
  const [status, setStatus] = useState(vacancy.status);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onUpdate({ title, description, status });
      alert("Vaga atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar vaga:", error);
      alert("Erro ao atualizar vaga. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Editar Vaga</CardTitle>
        <CardDescription>
          Altere as informações da vaga e o status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título da Vaga</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Desenvolvedor Full Stack"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva os requisitos, responsabilidades e benefícios..."
              rows={8}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="OPEN">Aberta</option>
              <option value="PAUSED">Pausada</option>
              <option value="CLOSED">Fechada</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
