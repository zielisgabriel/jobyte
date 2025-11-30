import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { 
  ArrowRightIcon,
  BriefcaseIcon,
  BuildingIcon,
  CheckCircle2Icon,
  ClockIcon,
  CoffeeIcon,
  GlobeIcon,
  GraduationCapIcon,
  HeartIcon,
  HomeIcon,
  MapPinIcon,
  MonitorIcon,
  RocketIcon,
  SparklesIcon,
  TrendingUpIcon,
  UsersIcon,
  WalletIcon
} from "lucide-react";

const BENEFITS = [
  { icon: <HomeIcon className="h-5 w-5" />, title: "Trabalho remoto", description: "Flexibilidade para trabalhar de onde quiser" },
  { icon: <WalletIcon className="h-5 w-5" />, title: "Salário competitivo", description: "Remuneração acima do mercado" },
  { icon: <HeartIcon className="h-5 w-5" />, title: "Plano de saúde", description: "Sulamerica completo sem coparticipação" },
  { icon: <CoffeeIcon className="h-5 w-5" />, title: "Vale refeição", description: "R$ 40/dia no cartão Flash" },
  { icon: <GraduationCapIcon className="h-5 w-5" />, title: "Educação", description: "Orçamento anual para cursos e livros" },
  { icon: <MonitorIcon className="h-5 w-5" />, title: "Setup completo", description: "MacBook + monitor + acessórios" },
  { icon: <ClockIcon className="h-5 w-5" />, title: "Horário flexível", description: "Trabalhe nos seus melhores horários" },
  { icon: <UsersIcon className="h-5 w-5" />, title: "Equipe incrível", description: "Pessoas talentosas e colaborativas" },
];

const JOBS = [
  {
    title: "Senior Software Engineer",
    department: "Engenharia",
    location: "Remoto (Brasil)",
    type: "Full-time",
    level: "Sênior",
    description: "Buscamos um(a) engenheiro(a) de software sênior para liderar iniciativas técnicas e mentorear o time.",
    requirements: ["5+ anos de experiência", "TypeScript/React", "Node.js", "PostgreSQL"],
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remoto (Brasil)",
    type: "Full-time",
    level: "Pleno",
    description: "Procuramos um(a) designer de produto para criar experiências incríveis para nossos usuários.",
    requirements: ["3+ anos de experiência", "Figma", "Design Systems", "Pesquisa com usuários"],
  },
  {
    title: "Product Manager",
    department: "Produto",
    location: "São Paulo, SP",
    type: "Full-time",
    level: "Sênior",
    description: "Estamos buscando um(a) PM para liderar a evolução do nosso produto principal.",
    requirements: ["5+ anos de experiência", "B2B SaaS", "Metodologias ágeis", "Data-driven"],
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remoto (Brasil)",
    type: "Full-time",
    level: "Pleno",
    description: "Junte-se ao nosso time de CS para garantir o sucesso dos nossos clientes.",
    requirements: ["3+ anos de experiência", "SaaS B2B", "Comunicação excelente", "Orientação a dados"],
  },
  {
    title: "DevOps Engineer",
    department: "Engenharia",
    location: "Remoto (Brasil)",
    type: "Full-time",
    level: "Pleno/Sênior",
    description: "Buscamos alguém para escalar nossa infraestrutura e melhorar nossos processos de deploy.",
    requirements: ["4+ anos de experiência", "AWS/GCP", "Kubernetes", "CI/CD"],
  },
  {
    title: "Sales Development Representative",
    department: "Vendas",
    location: "São Paulo, SP",
    type: "Full-time",
    level: "Júnior/Pleno",
    description: "Venha fazer parte do nosso time de vendas e ajudar empresas a recrutar melhor.",
    requirements: ["1+ anos em vendas", "Prospecção outbound", "CRM", "Boa comunicação"],
  },
];

const VALUES = [
  {
    icon: <RocketIcon className="h-6 w-6" />,
    title: "Crescimento acelerado",
    description: "Startup em rápido crescimento com muitas oportunidades de aprendizado.",
  },
  {
    icon: <TrendingUpIcon className="h-6 w-6" />,
    title: "Impacto real",
    description: "Seu trabalho impacta diretamente milhares de empresas e candidatos.",
  },
  {
    icon: <SparklesIcon className="h-6 w-6" />,
    title: "Inovação constante",
    description: "Trabalhamos com tecnologias modernas e estamos sempre inovando.",
  },
  {
    icon: <UsersIcon className="h-6 w-6" />,
    title: "Cultura incrível",
    description: "Ambiente colaborativo, diverso e com muita autonomia.",
  },
];

export default function CareersPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-1.5">
              <BriefcaseIcon className="h-3.5 w-3.5 mr-1.5" />
              Carreiras
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Construa o futuro do 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60"> recrutamento</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Junte-se a uma equipe apaixonada por conectar talentos às melhores 
              oportunidades. Estamos crescendo e queremos você com a gente!
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GlobeIcon className="h-4 w-4 text-primary" />
                <span>100% remoto</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <UsersIcon className="h-4 w-4 text-primary" />
                <span>+150 pessoas</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BuildingIcon className="h-4 w-4 text-primary" />
                <span>Série A</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que trabalhar no Jobyte?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Oferecemos um ambiente de trabalho excepcional com benefícios que fazem a diferença.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {VALUES.map((value, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="h-14 w-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {value.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BENEFITS.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-background/50">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {benefit.icon}
                </div>
                <div>
                  <p className="font-medium text-sm">{benefit.title}</p>
                  <p className="text-xs text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Vagas abertas</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Encontre sua próxima oportunidade
            </h2>
            <p className="text-muted-foreground">
              Confira nossas vagas abertas e candidate-se.
            </p>
          </div>
          
          <div className="space-y-6">
            {JOBS.map((job, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-bold text-xl">{job.title}</h3>
                        <Badge variant="outline">{job.level}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <BuildingIcon className="h-4 w-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPinIcon className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <ClockIcon className="h-4 w-4" />
                          {job.type}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4">{job.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req, rIndex) => (
                          <Badge key={rIndex} variant="secondary" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <Button className="w-full lg:w-auto group">
                        Candidatar-se
                        <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-24 bg-gradient-to-b from-card/50 to-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline">Nossa cultura</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Um lugar onde você pode ser você
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Acreditamos que diversidade e inclusão não são apenas palavras bonitas, 
                mas a base para construir uma empresa melhor. No Jobyte, cada pessoa é 
                valorizada por suas contribuições únicas.
              </p>
              <ul className="space-y-3">
                {[
                  "Ambiente inclusivo e respeitoso",
                  "Feedback constante e construtivo",
                  "Autonomia e confiança",
                  "Crescimento pessoal e profissional",
                  "Celebração de conquistas",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2Icon className="h-5 w-5 text-green-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5">
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-blue-500 mb-2">4.8</p>
                  <p className="text-sm text-muted-foreground">Nota no Glassdoor</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 mt-8">
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-green-500 mb-2">95%</p>
                  <p className="text-sm text-muted-foreground">Recomendariam</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5">
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-purple-500 mb-2">42%</p>
                  <p className="text-sm text-muted-foreground">Diversidade</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 mt-8">
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-orange-500 mb-2">2x</p>
                  <p className="text-sm text-muted-foreground">Crescimento anual</p>
                </CardContent>
              </Card>
            </div>
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
                Não encontrou a vaga ideal?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
                Envie seu currículo para nosso banco de talentos. Quando surgir 
                uma oportunidade que combine com seu perfil, entraremos em contato.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" variant="secondary">
                    Enviar currículo
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="ghost" className="text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                    Conhecer a empresa
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
