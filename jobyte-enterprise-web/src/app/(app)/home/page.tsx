import { HomeInfoCarousel } from "@/components/home-info-carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { 
  ArrowRightIcon, 
  BarChart3Icon, 
  BriefcaseIcon, 
  CheckCircle2Icon, 
  ShieldCheckIcon, 
  SparklesIcon, 
  TrendingUpIcon, 
  UsersIcon, 
  ZapIcon 
} from "lucide-react";

const STATS = [
  { value: "10k+", label: "Empresas ativas" },
  { value: "500k+", label: "Candidatos conectados" },
  { value: "98%", label: "Taxa de satisfação" },
  { value: "24h", label: "Tempo médio de resposta" },
];

const BENEFITS = [
  {
    icon: <ZapIcon className="h-5 w-5" />,
    title: "Recrutamento ágil",
    description: "Reduza o tempo de contratação em até 60% com automações inteligentes.",
  },
  {
    icon: <UsersIcon className="h-5 w-5" />,
    title: "Talentos qualificados",
    description: "Acesse uma base de candidatos pré-qualificados e alinhados ao seu perfil.",
  },
  {
    icon: <BarChart3Icon className="h-5 w-5" />,
    title: "Decisões baseadas em dados",
    description: "Analytics avançado para otimizar seu processo seletivo.",
  },
  {
    icon: <ShieldCheckIcon className="h-5 w-5" />,
    title: "Segurança e conformidade",
    description: "LGPD compliant. Seus dados e os dos candidatos protegidos.",
  },
];

const FEATURES_DETAILED = [
  {
    icon: <BriefcaseIcon className="h-6 w-6" />,
    title: "Gestão completa de vagas",
    description: "Crie, edite e publique vagas em minutos. Personalize formulários e requisitos para cada posição.",
    highlights: ["Templates customizáveis", "Multi-plataforma", "Publicação automática"],
  },
  {
    icon: <SparklesIcon className="h-6 w-6" />,
    title: "Triagem inteligente com IA",
    description: "Nossa IA analisa currículos e classifica candidatos automaticamente baseado nos requisitos da vaga.",
    highlights: ["Matching por competências", "Ranking automático", "Filtros avançados"],
  },
  {
    icon: <TrendingUpIcon className="h-6 w-6" />,
    title: "Dashboard analítico",
    description: "Visualize métricas em tempo real, identifique gargalos e otimize seu funil de contratação.",
    highlights: ["Relatórios exportáveis", "KPIs personalizados", "Insights preditivos"],
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-3xl opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium">
                  <SparklesIcon className="h-3.5 w-3.5 mr-1.5" />
                  Plataforma #1 em recrutamento
                </Badge>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  Contrate os 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60"> melhores talentos</span>
                  {" "}para sua empresa
                </h1>
                
                <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                  Simplifique seu processo de recrutamento com ferramentas inteligentes, 
                  automação avançada e uma experiência excepcional para candidatos e recrutadores.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto text-base px-8 group">
                    Começar gratuitamente
                    <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8">
                    Agendar demonstração
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2Icon className="h-4 w-4 text-green-500" />
                  <span>Teste grátis por 14 dias</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2Icon className="h-4 w-4 text-green-500" />
                  <span>Sem cartão de crédito</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="relative bg-gradient-to-br from-card to-card/80 border rounded-2xl p-8 shadow-2xl">
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  +127 contratações hoje
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Painel de Recrutamento</h3>
                    <Badge variant="outline" className="text-green-500 border-green-500/30">
                      Ao vivo
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {STATS.map((stat, index) => (
                      <div key={index} className="bg-background/50 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-primary">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-background/50 rounded-lg p-3">
                      <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle2Icon className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Nova candidatura recebida</p>
                        <p className="text-xs text-muted-foreground">Desenvolvedor Full Stack • há 2 min</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-background/50 rounded-lg p-3">
                      <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <UsersIcon className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Entrevista agendada</p>
                        <p className="text-xs text-muted-foreground">UX Designer • há 15 min</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-y bg-card/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold mb-2">Recursos principais</h2>
            <p className="text-muted-foreground">Tudo o que você precisa para contratar com eficiência</p>
          </div>
          <HomeInfoCarousel />
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Por que escolher o Jobyte?</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Transforme seu recrutamento
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Empresas líderes confiam no Jobyte para encontrar e contratar os melhores profissionais do mercado.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((benefit, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="py-24 bg-gradient-to-b from-card/50 to-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Funcionalidades poderosas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Ferramentas projetadas para otimizar cada etapa do seu processo seletivo.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {FEATURES_DETAILED.map((feature, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="p-6 space-y-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-xl">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                  <div className="px-6 pb-6">
                    <div className="flex flex-wrap gap-2">
                      {feature.highlights.map((highlight, hIndex) => (
                        <Badge key={hIndex} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
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
                Pronto para revolucionar suas contratações?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
                Junte-se a milhares de empresas que já transformaram seu processo de recrutamento com o Jobyte.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base px-8">
                    Criar conta gratuita
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="ghost" className="w-full sm:w-auto text-base px-8 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                    Já tenho conta
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="font-black text-2xl">Jobyte.</h3>
              <p className="text-sm text-muted-foreground">
                A plataforma de recrutamento inteligente para empresas que buscam os melhores talentos.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-foreground transition-colors">Funcionalidades</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground transition-colors">Preços</Link></li>
                <li><Link href="/integrations" className="hover:text-foreground transition-colors">Integrações</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">Sobre nós</Link></li>
                <li><Link href="/careers" className="hover:text-foreground transition-colors">Carreiras</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contato</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacidade</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">Termos de uso</Link></li>
                <li><Link href="/lgpd" className="hover:text-foreground transition-colors">LGPD</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Jobyte. Todos os direitos reservados.
            </p>
            <div className="flex gap-4 text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
