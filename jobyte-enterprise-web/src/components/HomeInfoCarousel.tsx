"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import { 
  CalendarCheckIcon, 
  ClockIcon, 
  MessageSquareIcon, 
  RouteIcon, 
  ScrollTextIcon, 
  SearchIcon, 
  StarIcon, 
  UsersIcon 
} from "lucide-react";

const SLIDES = [
  {
    icon: <ScrollTextIcon className="h-5 w-5" />,
    title: "Gestão de vagas",
    description: "Crie e publique vagas em minutos com templates profissionais.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <StarIcon className="h-5 w-5" />,
    title: "Triagem inteligente",
    description: "IA que analisa e classifica candidatos automaticamente.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: <ClockIcon className="h-5 w-5" />,
    title: "Agendamento fácil",
    description: "Sistema integrado de agendamento de entrevistas.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: <UsersIcon className="h-5 w-5" />,
    title: "Colaboração em equipe",
    description: "Compartilhe feedbacks e tome decisões em conjunto.",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: <SearchIcon className="h-5 w-5" />,
    title: "Busca avançada",
    description: "Encontre candidatos ideais com filtros inteligentes.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: <MessageSquareIcon className="h-5 w-5" />,
    title: "Comunicação integrada",
    description: "Mensagens automatizadas e personalizadas para candidatos.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: <CalendarCheckIcon className="h-5 w-5" />,
    title: "Pipeline visual",
    description: "Acompanhe candidatos em cada etapa do processo.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: <RouteIcon className="h-5 w-5" />,
    title: "Fluxos personalizados",
    description: "Crie processos seletivos únicos para cada vaga.",
    color: "from-teal-500 to-cyan-500",
  },
];

export function HomeInfoCarousel() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true }, 
    [AutoPlay({ active: true, stopOnInteraction: false, delay: 3000 })]
  );

  return (
    <div
      ref={emblaRef}
      className="overflow-hidden select-none cursor-grab active:cursor-grabbing relative
        before:content-[''] before:block before:bg-gradient-to-r before:from-background before:to-transparent before:absolute before:left-0 before:top-0 before:h-full before:w-24 before:z-10
        after:content-[''] after:block after:bg-gradient-to-l after:from-background after:to-transparent after:absolute after:right-0 after:top-0 after:h-full after:w-24 after:z-10"
    >
      <div className="flex gap-4">
        {SLIDES.map((slide, index) => (
          <div 
            key={index} 
            className="flex-none w-[280px] sm:w-[320px]"
          >
            <div className="group relative overflow-hidden rounded-2xl border bg-card/50 backdrop-blur-sm p-6 h-[140px] transition-all duration-300 hover:shadow-lg hover:border-primary/20">
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${slide.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="flex gap-4 items-start">
                <div className={`flex-shrink-0 h-11 w-11 rounded-xl bg-gradient-to-br ${slide.color} flex items-center justify-center text-white shadow-lg`}>
                  {slide.icon}
                </div>
                <div className="flex flex-col gap-1.5 min-w-0">
                  <h3 className="text-base font-semibold leading-tight">{slide.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{slide.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}