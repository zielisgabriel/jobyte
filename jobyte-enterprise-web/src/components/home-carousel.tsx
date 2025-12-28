"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  CalendarCheckIcon,
  ClockIcon,
  MessageSquareIcon,
  RouteIcon,
  ScrollTextIcon,
  SearchIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { JSX } from "react";

export function HomeCarousel() {
  return (
    <Carousel
      opts={{
        loop: true,
        align: "center",
        dragFree: true
      }}
      plugins={[
        Autoplay({
          stopOnFocusIn: true
        })
      ]}
    >
      <CarouselContent className="py-0.5">
        {SLIDES.map((slide, index) => (
          <CarouselItem key={index} className="sm:basis-1 md:basis-1/2 lg:basis-1/3">
            <Card>
              <CardHeader>
                <CardTitle className="flex gap-2 items-center text-xl font-bold">
                  <span>
                    {slide.icon}
                  </span>
                  {slide.title}
                </CardTitle>
                <CardContent>
                  <CardDescription className="text-md">
                    {slide.description}
                  </CardDescription>
                </CardContent>
              </CardHeader>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

const SLIDES: Array<{
  icon: JSX.Element,
  title: string,
  description: string
}> = [
  {
    icon: <ScrollTextIcon className="h-6 w-8" />,
    title: "Gestão de vagas",
    description: "Crie, edite e publique vagas em minutos utilizando templates profissionais e personalizáveis, facilitando a organização e o controle de oportunidades.",
  },
  {
    icon: <StarIcon className="h-6 w-8" />,
    title: "Triagem inteligente",
    description: "Aproveite o poder da IA para analisar, classificar e priorizar candidatos automaticamente, otimizando o tempo e aumentando a assertividade nas seleções.",
  },
  {
    icon: <ClockIcon className="h-6 w-8" />,
    title: "Agendamento fácil",
    description: "Gerencie entrevistas com um sistema integrado de agendamento, notificações automáticas e sincronização com calendários, reduzindo conflitos e atrasos.",
  },
  {
    icon: <UsersIcon className="h-6 w-8" />,
    title: "Colaboração em equipe",
    description: "Compartilhe feedbacks, avalie candidatos em conjunto e tome decisões colaborativas, promovendo transparência e agilidade no processo seletivo.",
  },
  {
    icon: <SearchIcon className="h-6 w-8" />,
    title: "Busca avançada",
    description: "Encontre candidatos ideais rapidamente com filtros inteligentes, pesquisa por palavras-chave e sugestões automáticas baseadas no perfil da vaga.",
  },
  {
    icon: <MessageSquareIcon className="h-6 w-8" />,
    title: "Comunicação integrada",
    description: "Envie mensagens automatizadas e personalizadas para candidatos, centralizando toda a comunicação e garantindo um contato eficiente e profissional.",
  },
  {
    icon: <CalendarCheckIcon className="h-6 w-8" />,
    title: "Pipeline visual",
    description: "Acompanhe cada candidato em todas as etapas do processo seletivo com um pipeline visual e intuitivo, facilitando o monitoramento e a tomada de decisões.",
  },
  {
    icon: <RouteIcon className="h-6 w-8" />,
    title: "Fluxos personalizados",
    description: "Crie processos seletivos únicos e adaptáveis para cada vaga, configurando etapas, critérios e automações conforme a necessidade da sua empresa.",
  },
];
