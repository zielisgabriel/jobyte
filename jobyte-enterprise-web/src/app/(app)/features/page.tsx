import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { 
  ArrowRightIcon,
  BarChart3Icon,
  BellIcon,
  BotIcon,
  BriefcaseIcon,
  CalendarIcon,
  CheckCircle2Icon,
  ClipboardListIcon,
  FilterIcon,
  FolderKanbanIcon,
  GlobeIcon,
  LayoutDashboardIcon,
  MailIcon,
  MessageSquareIcon,
  PieChartIcon,
  SearchIcon,
  SettingsIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon
} from "lucide-react";

const FEATURE_CATEGORIES = [
  {
    id: "gestao",
    label: "Gestão de Vagas",
    icon: <BriefcaseIcon className="h-4 w-4" />,
  },
  {
    id: "triagem",
    label: "Triagem & IA",
    icon: <BotIcon className="h-4 w-4" />,
  },
  {
    id: "comunicacao",
    label: "Comunicação",
    icon: <MessageSquareIcon className="h-4 w-4" />,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <BarChart3Icon className="h-4 w-4" />,
  },
];

const FEATURES = {
  gestao: [
    {
      icon: <BriefcaseIcon className="h-6 w-6" />,
      title: "Criação de vagas simplificada",
      description: "Crie vagas em minutos com nossos templates inteligentes. Personalize formulários, requisitos e descrições.",
      highlights: ["Templates profissionais", "Editor visual", "Campos personalizados"],
    },
    {
      icon: <GlobeIcon className="h-6 w-6" />,
      title: "Publicação multi-plataforma",
      description: "Publique suas vagas automaticamente em diversos job boards e redes sociais com um clique.",
      highlights: ["LinkedIn", "Indeed", "Glassdoor", "+20 plataformas"],
    },
    {
      icon: <FolderKanbanIcon className="h-6 w-6" />,
      title: "Pipeline visual",
      description: "Acompanhe candidatos através de etapas personalizáveis com visualização estilo Kanban.",
      highlights: ["Drag & drop", "Etapas personalizadas", "Automações"],
    },
    {
      icon: <CalendarIcon className="h-6 w-6" />,
      title: "Agendamento integrado",
      description: "Sincronize calendários e agende entrevistas automaticamente sem conflitos.",
      highlights: ["Google Calendar", "Outlook", "Zoom integrado"],
    },
  ],
  triagem: [
    {
      icon: <SparklesIcon className="h-6 w-6" />,
      title: "Triagem com IA",
      description: "Nossa inteligência artificial analisa currículos e classifica candidatos automaticamente.",
      highlights: ["Machine Learning", "NLP", "Matching inteligente"],
    },
    {
      icon: <FilterIcon className="h-6 w-6" />,
      title: "Filtros avançados",
      description: "Encontre candidatos ideais com filtros por habilidades, experiência, localização e muito mais.",
      highlights: ["Busca semântica", "Filtros combinados", "Salvar buscas"],
    },
    {
      icon: <ClipboardListIcon className="h-6 w-6" />,
      title: "Testes e avaliações",
      description: "Aplique testes técnicos, comportamentais e de cultura diretamente na plataforma.",
      highlights: ["Biblioteca de testes", "Testes customizados", "Correção automática"],
    },
    {
      icon: <SearchIcon className="h-6 w-6" />,
      title: "Banco de talentos",
      description: "Mantenha um banco de talentos organizado para futuras oportunidades.",
      highlights: ["Tags personalizadas", "Busca inteligente", "Histórico completo"],
    },
  ],
  comunicacao: [
    {
      icon: <MailIcon className="h-6 w-6" />,
      title: "E-mails automatizados",
      description: "Configure sequências de e-mails para cada etapa do processo seletivo.",
      highlights: ["Templates", "Personalização", "Agendamento"],
    },
    {
      icon: <MessageSquareIcon className="h-6 w-6" />,
      title: "Chat integrado",
      description: "Comunique-se com candidatos diretamente pela plataforma.",
      highlights: ["Chat em tempo real", "Histórico", "Anexos"],
    },
    {
      icon: <BellIcon className="h-6 w-6" />,
      title: "Notificações inteligentes",
      description: "Receba alertas importantes sobre candidaturas, entrevistas e prazos.",
      highlights: ["Push notifications", "E-mail", "Slack/Teams"],
    },
    {
      icon: <UsersIcon className="h-6 w-6" />,
      title: "Colaboração em equipe",
      description: "Trabalhe em conjunto com feedbacks, notas e avaliações compartilhadas.",
      highlights: ["Comentários", "Scorecards", "Aprovações"],
    },
  ],
  analytics: [
    {
      icon: <LayoutDashboardIcon className="h-6 w-6" />,
      title: "Dashboard em tempo real",
      description: "Visualize métricas importantes do seu processo seletivo em tempo real.",
      highlights: ["Widgets personalizáveis", "Dados em tempo real", "Mobile friendly"],
    },
    {
      icon: <PieChartIcon className="h-6 w-6" />,
      title: "Relatórios detalhados",
      description: "Gere relatórios completos sobre performance, funil e diversidade.",
      highlights: ["Exportar PDF/Excel", "Agendamento", "Compartilhamento"],
    },
    {
      icon: <BarChart3Icon className="h-6 w-6" />,
      title: "Métricas de recrutamento",
      description: "Acompanhe KPIs como time-to-hire, cost-per-hire, source effectiveness.",
      highlights: ["Benchmarks", "Tendências", "Metas"],
    },
    {
      icon: <ZapIcon className="h-6 w-6" />,
      title: "Insights preditivos",
      description: "IA que identifica gargalos e sugere otimizações no seu processo.",
      highlights: ["Previsões", "Recomendações", "Alertas"],
    },
  ],
};

const HIGHLIGHTS = [
  { icon: <ShieldCheckIcon className="h-5 w-5" />, text: "LGPD Compliant" },
  { icon: <ZapIcon className="h-5 w-5" />, text: "99.9% Uptime" },
  { icon: <UsersIcon className="h-5 w-5" />, text: "Suporte 24/7" },
  { icon: <SettingsIcon className="h-5 w-5" />, text: "API Completa" },
];

export default function FeaturesPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-1.5">
              <SparklesIcon className="h-3.5 w-3.5 mr-1.5" />
              Funcionalidades
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Tudo que você precisa para 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60"> recrutar melhor</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Descubra as ferramentas poderosas que fazem do Jobyte a plataforma 
              preferida de milhares de empresas.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              {HIGHLIGHTS.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="text-primary">{item.icon}</div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Tabs Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultValue="gestao" className="space-y-12">
            <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto p-0">
              {FEATURE_CATEGORIES.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-3 rounded-full border"
                >
                  {category.icon}
                  <span className="ml-2">{category.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(FEATURES).map(([key, features]) => (
              <TabsContent key={key} value={key} className="mt-12">
                <div className="grid md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="h-12 w-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            {feature.icon}
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-lg">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {feature.description}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                              {feature.highlights.map((highlight, hIndex) => (
                                <Badge key={hIndex} variant="outline" className="text-xs">
                                  {highlight}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* All Features Grid */}
      <section className="py-24 bg-gradient-to-b from-card/50 to-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              E muito mais...
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Recursos adicionais para turbinar seu recrutamento.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <ShieldCheckIcon />, title: "Segurança avançada", description: "Criptografia de ponta, SSO e controles de acesso." },
              { icon: <SettingsIcon />, title: "API completa", description: "Integre com seus sistemas existentes via REST API." },
              { icon: <GlobeIcon />, title: "Multi-idiomas", description: "Interface e comunicações em português, inglês e espanhol." },
              { icon: <UsersIcon />, title: "Perfis ilimitados", description: "Adicione quantos recrutadores precisar sem custo extra." },
              { icon: <FolderKanbanIcon />, title: "Workflows customizados", description: "Crie fluxos de aprovação e automações personalizadas." },
              { icon: <BarChart3Icon />, title: "Relatórios de diversidade", description: "Acompanhe métricas de D&I no seu processo seletivo." },
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-md transition-all">
                <CardContent className="p-6 flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Comparação</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Jobyte vs. Métodos tradicionais
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-8">
                <h3 className="font-bold text-xl mb-6 text-destructive">Sem o Jobyte</h3>
                <ul className="space-y-4">
                  {[
                    "Planilhas desorganizadas",
                    "E-mails perdidos",
                    "Triagem manual demorada",
                    "Falta de métricas",
                    "Candidatos frustrados",
                    "Processos lentos",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-muted-foreground">
                      <div className="h-5 w-5 rounded-full bg-destructive/20 flex items-center justify-center">
                        <span className="text-destructive text-xs">✕</span>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-green-500/20 bg-green-500/5">
              <CardContent className="p-8">
                <h3 className="font-bold text-xl mb-6 text-green-500">Com o Jobyte</h3>
                <ul className="space-y-4">
                  {[
                    "Tudo centralizado em um lugar",
                    "Comunicação automatizada",
                    "IA faz a triagem para você",
                    "Dashboard com métricas em tempo real",
                    "Experiência excepcional para candidatos",
                    "Contrate 60% mais rápido",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2Icon className="h-5 w-5 text-green-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
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
                Pronto para transformar seu recrutamento?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
                Comece gratuitamente e veja como o Jobyte pode revolucionar sua forma de contratar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="group">
                    Começar gratuitamente
                    <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="ghost" className="text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                    Ver preços
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
