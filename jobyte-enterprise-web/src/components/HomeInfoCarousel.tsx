"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import { ClockIcon, RouteIcon, ScrollText, StarIcon } from "lucide-react";

const SLIDES = [
  {
    icon: <ScrollText />,
    title: "Gerenciamento de vagas",
    description: "Crie, publique e gerencie suas vagas de emprego de forma eficiente.",
  },
  {
    icon: <StarIcon />,
    title: "Triagem de candidatos",
    description: "Avalie e selecione os melhores talentos com nossas ferramentas de triagem.",
  },
  {
    icon: <ClockIcon />,
    title: "Agendamento de entrevistas",
    description: "Organize entrevistas facilmente com nosso sistema de agendamento integrado.",
  },
  {
    icon: <RouteIcon />,
    title: "Colaboração em equipe",
    description: "Trabalhe junto com sua equipe para tomar decisões informadas sobre contratações.",
  },
];

export function HomeInfoCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [AutoPlay({ active: true, stopOnInteraction: false })]);

  return (
    <div
      ref={emblaRef}
      className="overflow-hidden select-none cursor-grab active:cursor-grabbing before:content-[''] before:block before:bg-gradient-to-r before:from-background before:to-background/0 before:absolute before:left-0 before:top-0 before:h-full before:w-16 before:z-10 after:content-[''] after:block after:bg-gradient-to-l after:from-background after:to-background/0 after:absolute after:right-0 after:top-0 after:h-full after:w-16 after:z-10 relative"
    >
      <div className="flex ml-[calc(1rem*-1)]">
        {SLIDES.map((slide, index) => (
          <div key={index} className="grow-0 shrink-0 basis-[50%] min-w-0 pl-[1rem]">
            <div className="flex gap-4 border px-4 rounded-xl h-30 items-center">
              <div className="text-background bg-foreground p-2 rounded-full">
                {slide.icon}
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-xl font-bold">{slide.title}</h1>
                <p className="text-sm">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}