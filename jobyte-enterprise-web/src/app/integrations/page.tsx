import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { 
  ArrowRightIcon,
  BriefcaseIcon,
  CalendarIcon,
  CheckCircle2Icon,
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  FileTextIcon,
  GlobeIcon,
  LayoutGridIcon,
  LinkIcon,
  MailIcon,
  MessageSquareIcon,
  ShieldCheckIcon,
  SparklesIcon,
  VideoIcon,
  ZapIcon
} from "lucide-react";

const INTEGRATION_CATEGORIES = [
  { id: "ats", label: "ATS & HR", icon: <BriefcaseIcon className="h-4 w-4" /> },
  { id: "comunicacao", label: "Comunicação", icon: <MessageSquareIcon className="h-4 w-4" /> },
  { id: "produtividade", label: "Produtividade", icon: <LayoutGridIcon className="h-4 w-4" /> },
  { id: "avaliacao", label: "Avaliação", icon: <FileTextIcon className="h-4 w-4" /> },
];

const INTEGRATIONS = {
  ats: [
    {
      name: "LinkedIn Recruiter",
      description: "Importe candidatos diretamente do LinkedIn e publique vagas.",
      logo: "LI",
      color: "bg-blue-600",
      status: "Disponível",
    },
    {
      name: "Indeed",
      description: "Publique vagas automaticamente e receba candidaturas.",
      logo: "IN",
      color: "bg-indigo-600",
      status: "Disponível",
    },
    {
      name: "Glassdoor",
      description: "Sincronize vagas e gerencie sua marca empregadora.",
      logo: "GD",
      color: "bg-green-600",
      status: "Disponível",
    },
    {
      name: "Gupy",
      description: "Migre dados e candidatos da Gupy para o Jobyte.",
      logo: "GP",
      color: "bg-purple-600",
      status: "Em breve",
    },
    {
      name: "Workday",
      description: "Integração bidirecional com Workday HCM.",
      logo: "WD",
      color: "bg-orange-600",
      status: "Enterprise",
    },
    {
      name: "SAP SuccessFactors",
      description: "Sincronize com SAP para gestão completa de RH.",
      logo: "SF",
      color: "bg-blue-800",
      status: "Enterprise",
    },
  ],
  comunicacao: [
    {
      name: "Slack",
      description: "Receba notificações e gerencie candidatos pelo Slack.",
      logo: "SL",
      color: "bg-purple-600",
      status: "Disponível",
    },
    {
      name: "Microsoft Teams",
      description: "Integração completa com Teams para colaboração.",
      logo: "MT",
      color: "bg-blue-600",
      status: "Disponível",
    },
    {
      name: "Zoom",
      description: "Agende e realize entrevistas por vídeo automaticamente.",
      logo: "ZM",
      color: "bg-blue-500",
      status: "Disponível",
    },
    {
      name: "Google Meet",
      description: "Crie links de Meet automaticamente para entrevistas.",
      logo: "GM",
      color: "bg-green-600",
      status: "Disponível",
    },
    {
      name: "WhatsApp Business",
      description: "Comunique-se com candidatos via WhatsApp.",
      logo: "WA",
      color: "bg-green-500",
      status: "Disponível",
    },
    {
      name: "Discord",
      description: "Integração com servidores Discord para tech hiring.",
      logo: "DC",
      color: "bg-indigo-600",
      status: "Em breve",
    },
  ],
  produtividade: [
    {
      name: "Google Calendar",
      description: "Sincronize entrevistas com o Google Calendar.",
      logo: "GC",
      color: "bg-blue-600",
      status: "Disponível",
    },
    {
      name: "Outlook Calendar",
      description: "Integração com calendário do Outlook/Microsoft 365.",
      logo: "OC",
      color: "bg-blue-700",
      status: "Disponível",
    },
    {
      name: "Notion",
      description: "Exporte dados de candidatos para o Notion.",
      logo: "NT",
      color: "bg-gray-800",
      status: "Disponível",
    },
    {
      name: "Trello",
      description: "Sincronize pipeline de candidatos com boards do Trello.",
      logo: "TR",
      color: "bg-blue-500",
      status: "Disponível",
    },
    {
      name: "Asana",
      description: "Crie tarefas automaticamente no Asana.",
      logo: "AS",
      color: "bg-red-500",
      status: "Em breve",
    },
    {
      name: "Monday.com",
      description: "Integração com Monday para gestão de projetos.",
      logo: "MD",
      color: "bg-red-600",
      status: "Em breve",
    },
  ],
  avaliacao: [
    {
      name: "HackerRank",
      description: "Aplique testes técnicos de programação.",
      logo: "HR",
      color: "bg-green-700",
      status: "Disponível",
    },
    {
      name: "Codility",
      description: "Avaliações de código integradas ao processo.",
      logo: "CD",
      color: "bg-orange-600",
      status: "Disponível",
    },
    {
      name: "TestGorilla",
      description: "Testes de habilidades, personalidade e cultura.",
      logo: "TG",
      color: "bg-teal-600",
      status: "Disponível",
    },
    {
      name: "Mindsight",
      description: "Avaliações comportamentais e de fit cultural.",
      logo: "MS",
      color: "bg-purple-600",
      status: "Disponível",
    },
    {
      name: "Pymetrics",
      description: "Avaliações baseadas em neurociência.",
      logo: "PM",
      color: "bg-pink-600",
      status: "Enterprise",
    },
    {
      name: "Plum.io",
      description: "Avaliação de soft skills e potencial.",
      logo: "PL",
      color: "bg-violet-600",
      status: "Enterprise",
    },
  ],
};

const API_FEATURES = [
  {
    icon: <CodeIcon className="h-6 w-6" />,
    title: "REST API",
    description: "API RESTful completa com documentação OpenAPI/Swagger.",
  },
  {
    icon: <ZapIcon className="h-6 w-6" />,
    title: "Webhooks",
    description: "Receba eventos em tempo real para candidaturas, status e mais.",
  },
  {
    icon: <ShieldCheckIcon className="h-6 w-6" />,
    title: "OAuth 2.0",
    description: "Autenticação segura com tokens de acesso e refresh.",
  },
  {
    icon: <CloudIcon className="h-6 w-6" />,
    title: "Rate Limiting",
    description: "Limites generosos para atender suas necessidades.",
  },
];

export default function IntegrationsPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-1.5">
              <LinkIcon className="h-3.5 w-3.5 mr-1.5" />
              Integrações
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Conecte com suas 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60"> ferramentas favoritas</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              O Jobyte se integra com mais de 50 ferramentas para criar um 
              ecossistema de recrutamento poderoso e automatizado.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2Icon className="h-4 w-4 text-green-500" />
                <span>50+ integrações</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2Icon className="h-4 w-4 text-green-500" />
                <span>API completa</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2Icon className="h-4 w-4 text-green-500" />
                <span>Webhooks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Tabs */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultValue="ats" className="space-y-12">
            <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto p-0">
              {INTEGRATION_CATEGORIES.map((category) => (
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

            {Object.entries(INTEGRATIONS).map(([key, integrations]) => (
              <TabsContent key={key} value={key} className="mt-12">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {integrations.map((integration, index) => (
                    <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`h-12 w-12 shrink-0 rounded-xl ${integration.color} flex items-center justify-center text-white font-bold text-lg`}>
                            {integration.logo}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold truncate">{integration.name}</h3>
                              <Badge 
                                variant={
                                  integration.status === "Disponível" ? "default" : 
                                  integration.status === "Enterprise" ? "secondary" : 
                                  "outline"
                                }
                                className="text-xs shrink-0"
                              >
                                {integration.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{integration.description}</p>
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

      {/* API Section */}
      <section className="py-24 bg-gradient-to-b from-card/50 to-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline">Para desenvolvedores</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                API poderosa para integrações customizadas
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Precisa de algo mais específico? Nossa API RESTful permite que você 
                construa integrações personalizadas para qualquer sistema.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {API_FEATURES.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="https://docs.jobyte.com" target="_blank">
                  <Button size="lg" variant="outline" className="group">
                    <CodeIcon className="mr-2 h-4 w-4" />
                    Ver documentação
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <Card className="bg-gray-900 text-gray-100 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span className="text-xs text-gray-500 ml-2">api-example.js</span>
                  </div>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`// Listar candidatos de uma vaga
const response = await fetch(
  'https://api.jobyte.com/v1/jobs/123/candidates',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    }
  }
);

const candidates = await response.json();
console.log(candidates);`}</code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Integrations */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Integrações mais populares
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              As ferramentas que nossos clientes mais utilizam junto ao Jobyte.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "LinkedIn", icon: <GlobeIcon />, color: "bg-blue-600" },
              { name: "Slack", icon: <MessageSquareIcon />, color: "bg-purple-600" },
              { name: "Zoom", icon: <VideoIcon />, color: "bg-blue-500" },
              { name: "Google Calendar", icon: <CalendarIcon />, color: "bg-green-600" },
              { name: "HackerRank", icon: <CodeIcon />, color: "bg-green-700" },
              { name: "WhatsApp", icon: <MailIcon />, color: "bg-green-500" },
            ].map((integration, index) => (
              <Card key={index} className="hover:shadow-md transition-all group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`h-14 w-14 mx-auto rounded-xl ${integration.color} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
                    {integration.icon}
                  </div>
                  <p className="font-medium text-sm">{integration.name}</p>
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
              <SparklesIcon className="h-12 w-12 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Não encontrou a integração que precisa?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
                Entre em contato conosco! Estamos sempre adicionando novas 
                integrações baseadas no feedback dos nossos clientes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" variant="secondary">
                    Solicitar integração
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="ghost" className="text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                    Começar grátis
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
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
