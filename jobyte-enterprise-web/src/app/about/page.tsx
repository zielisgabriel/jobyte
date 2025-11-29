import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { 
  ArrowRightIcon,
  BuildingIcon,
  GlobeIcon,
  HeartIcon,
  LightbulbIcon,
  RocketIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TargetIcon,
  TrendingUpIcon,
  UsersIcon,
  ZapIcon
} from "lucide-react";

const STATS = [
  { value: "2019", label: "Ano de fundação" },
  { value: "10k+", label: "Empresas ativas" },
  { value: "500k+", label: "Candidatos" },
  { value: "150+", label: "Colaboradores" },
];

const VALUES = [
  {
    icon: <LightbulbIcon className="h-6 w-6" />,
    title: "Inovação",
    description: "Buscamos constantemente novas formas de revolucionar o recrutamento através da tecnologia.",
  },
  {
    icon: <HeartIcon className="h-6 w-6" />,
    title: "Pessoas em primeiro lugar",
    description: "Acreditamos que o sucesso vem quando colocamos pessoas — candidatos e empresas — no centro.",
  },
  {
    icon: <ShieldCheckIcon className="h-6 w-6" />,
    title: "Transparência",
    description: "Construímos confiança através de comunicação clara e processos transparentes.",
  },
  {
    icon: <RocketIcon className="h-6 w-6" />,
    title: "Excelência",
    description: "Nos dedicamos a entregar a melhor experiência possível em cada interação.",
  },
];

const MILESTONES = [
  { year: "2019", title: "Fundação", description: "Jobyte nasce com a missão de transformar o recrutamento no Brasil." },
  { year: "2020", title: "Primeira versão", description: "Lançamento da plataforma com funcionalidades essenciais." },
  { year: "2021", title: "Expansão", description: "Alcançamos 1.000 empresas cadastradas e 50.000 candidatos." },
  { year: "2022", title: "IA Integrada", description: "Implementamos triagem inteligente com machine learning." },
  { year: "2023", title: "Série A", description: "Captamos R$ 30M para acelerar o crescimento." },
  { year: "2024", title: "Liderança", description: "Nos tornamos a plataforma #1 em recrutamento no Brasil." },
  { year: "2025", title: "Presente", description: "Continuamos inovando para conectar talentos e empresas." },
];

const TEAM = [
  { name: "Ana Silva", role: "CEO & Co-fundadora", image: null },
  { name: "Carlos Santos", role: "CTO & Co-fundador", image: null },
  { name: "Maria Oliveira", role: "CPO", image: null },
  { name: "João Lima", role: "CFO", image: null },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-1.5">
              <BuildingIcon className="h-3.5 w-3.5 mr-1.5" />
              Sobre a Jobyte
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Conectando 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60"> talentos </span>
              às oportunidades certas
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Nascemos com a missão de transformar a forma como empresas encontram e 
              contratam os melhores profissionais do mercado.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y bg-card/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline">Nossa Missão</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Democratizar o acesso às melhores oportunidades de trabalho
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Acreditamos que toda pessoa merece encontrar um trabalho que a realize 
                profissionalmente, e toda empresa merece encontrar os talentos certos 
                para crescer. Nossa plataforma usa tecnologia de ponta para tornar 
                esse encontro mais eficiente, justo e humano.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/features">
                  <Button size="lg" className="group">
                    Conheça nossos recursos
                    <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
                  <CardContent className="p-6 text-center">
                    <TargetIcon className="h-10 w-10 mx-auto text-primary mb-4" />
                    <h3 className="font-semibold mb-2">Missão</h3>
                    <p className="text-sm text-muted-foreground">Conectar talentos às empresas ideais</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 mt-8">
                  <CardContent className="p-6 text-center">
                    <GlobeIcon className="h-10 w-10 mx-auto text-blue-500 mb-4" />
                    <h3 className="font-semibold mb-2">Visão</h3>
                    <p className="text-sm text-muted-foreground">Ser a plataforma líder na América Latina</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5">
                  <CardContent className="p-6 text-center">
                    <SparklesIcon className="h-10 w-10 mx-auto text-green-500 mb-4" />
                    <h3 className="font-semibold mb-2">Propósito</h3>
                    <p className="text-sm text-muted-foreground">Transformar vidas através do trabalho</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 mt-8">
                  <CardContent className="p-6 text-center">
                    <ZapIcon className="h-10 w-10 mx-auto text-purple-500 mb-4" />
                    <h3 className="font-semibold mb-2">Impacto</h3>
                    <p className="text-sm text-muted-foreground">+1M de contratações realizadas</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-b from-card/50 to-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Nossos Valores</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que nos guia
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Nossos valores são a base de tudo o que fazemos e como nos relacionamos 
              com clientes, candidatos e colaboradores.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {value.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Nossa Jornada</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Uma história de crescimento
            </h2>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            
            <div className="space-y-8">
              {MILESTONES.map((milestone, index) => (
                <div key={index} className={`relative flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} hidden md:block`}>
                    <Card className="inline-block">
                      <CardContent className="p-6">
                        <p className="text-sm text-primary font-semibold mb-1">{milestone.year}</p>
                        <h3 className="font-bold text-lg mb-2">{milestone.title}</h3>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full md:-translate-x-1.5 ring-4 ring-background" />
                  
                  <div className="flex-1 pl-12 md:pl-0 md:hidden">
                    <Card>
                      <CardContent className="p-6">
                        <p className="text-sm text-primary font-semibold mb-1">{milestone.year}</p>
                        <h3 className="font-bold text-lg mb-2">{milestone.title}</h3>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Liderança</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Quem está por trás
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Uma equipe apaixonada por conectar pessoas às suas oportunidades ideais.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4">
                    <UsersIcon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            <CardContent className="p-10 sm:p-16 text-center relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Quer fazer parte dessa história?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
                Estamos sempre em busca de pessoas talentosas para se juntar ao nosso time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/careers">
                  <Button size="lg" variant="secondary">
                    Ver vagas abertas
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="ghost" className="text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                    Entre em contato
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  );
}
