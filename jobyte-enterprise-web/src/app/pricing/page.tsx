import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { 
  ArrowRightIcon,
  CheckIcon,
  HelpCircleIcon,
  SparklesIcon,
  StarIcon,
  ZapIcon
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PLANS = [
  {
    name: "Starter",
    description: "Ideal para pequenas empresas começando a estruturar o recrutamento.",
    price: "Grátis",
    period: "para sempre",
    popular: false,
    cta: "Começar grátis",
    ctaVariant: "outline" as const,
    features: [
      { text: "Até 3 vagas ativas", included: true },
      { text: "50 candidatos/mês", included: true },
      { text: "1 usuário", included: true },
      { text: "Pipeline básico", included: true },
      { text: "E-mails manuais", included: true },
      { text: "Suporte por e-mail", included: true },
      { text: "Triagem com IA", included: false },
      { text: "Integrações", included: false },
      { text: "Relatórios avançados", included: false },
      { text: "API access", included: false },
    ],
  },
  {
    name: "Professional",
    description: "Para empresas em crescimento que precisam de mais recursos.",
    price: "R$ 299",
    period: "/mês",
    popular: true,
    cta: "Teste grátis por 14 dias",
    ctaVariant: "default" as const,
    features: [
      { text: "Vagas ilimitadas", included: true },
      { text: "Candidatos ilimitados", included: true },
      { text: "Até 10 usuários", included: true },
      { text: "Pipeline personalizável", included: true },
      { text: "E-mails automatizados", included: true },
      { text: "Suporte prioritário", included: true },
      { text: "Triagem com IA", included: true },
      { text: "Integrações básicas", included: true },
      { text: "Relatórios avançados", included: true },
      { text: "API access", included: false },
    ],
  },
  {
    name: "Enterprise",
    description: "Para grandes empresas com necessidades complexas de recrutamento.",
    price: "Personalizado",
    period: "",
    popular: false,
    cta: "Falar com vendas",
    ctaVariant: "outline" as const,
    features: [
      { text: "Tudo do Professional", included: true },
      { text: "Usuários ilimitados", included: true },
      { text: "SSO / SAML", included: true },
      { text: "SLA garantido", included: true },
      { text: "Gerente de conta dedicado", included: true },
      { text: "Suporte 24/7", included: true },
      { text: "IA avançada + customização", included: true },
      { text: "Todas as integrações", included: true },
      { text: "Relatórios personalizados", included: true },
      { text: "API completa + webhooks", included: true },
    ],
  },
];

const FAQS = [
  {
    question: "Posso testar antes de assinar?",
    answer: "Sim! Oferecemos 14 dias de teste grátis no plano Professional, sem necessidade de cartão de crédito. Você terá acesso a todos os recursos para avaliar se o Jobyte é ideal para sua empresa.",
  },
  {
    question: "Posso mudar de plano depois?",
    answer: "Claro! Você pode fazer upgrade ou downgrade a qualquer momento. Se fizer upgrade, a diferença será calculada proporcionalmente. Em caso de downgrade, o novo valor será aplicado no próximo ciclo de cobrança.",
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer: "Aceitamos cartões de crédito (Visa, Mastercard, Amex), boleto bancário e PIX. Para planos Enterprise, também oferecemos faturamento mensal ou anual.",
  },
  {
    question: "Existe desconto para pagamento anual?",
    answer: "Sim! Oferecemos 20% de desconto para pagamentos anuais. Isso significa que você paga 10 meses e ganha 2 meses grátis.",
  },
  {
    question: "Os dados são seguros?",
    answer: "Absolutamente. Utilizamos criptografia de ponta a ponta, servidores no Brasil, e somos totalmente compatíveis com a LGPD. Seus dados e os dados dos candidatos estão sempre protegidos.",
  },
  {
    question: "Preciso de cartão de crédito para o plano gratuito?",
    answer: "Não! O plano Starter é 100% gratuito e não requer cartão de crédito. Você pode usar indefinidamente dentro dos limites do plano.",
  },
];

const COMPARISON_FEATURES = [
  { name: "Vagas ativas", starter: "3", professional: "Ilimitadas", enterprise: "Ilimitadas" },
  { name: "Candidatos/mês", starter: "50", professional: "Ilimitados", enterprise: "Ilimitados" },
  { name: "Usuários", starter: "1", professional: "10", enterprise: "Ilimitados" },
  { name: "Triagem com IA", starter: "—", professional: "✓", enterprise: "✓ Avançada" },
  { name: "Integrações", starter: "—", professional: "Básicas", enterprise: "Todas" },
  { name: "API", starter: "—", professional: "—", enterprise: "✓ Completa" },
  { name: "Suporte", starter: "E-mail", professional: "Prioritário", enterprise: "24/7 + Gerente" },
  { name: "SLA", starter: "—", professional: "99.5%", enterprise: "99.9% garantido" },
];

export default function PricingPage() {
  return (
    <TooltipProvider>
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-20" />
          
          <div className="relative max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="px-4 py-1.5">
                <SparklesIcon className="h-3.5 w-3.5 mr-1.5" />
                Preços transparentes
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Planos que 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60"> cabem no seu bolso</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Comece grátis e escale conforme sua empresa cresce. 
                Sem surpresas, sem taxas escondidas.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {PLANS.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-xl scale-105' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1">
                        <StarIcon className="h-3 w-3 mr-1 fill-current" />
                        Mais popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="min-h-[48px]">{plan.description}</CardDescription>
                    <div className="pt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 flex-1">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-3">
                          {feature.included ? (
                            <CheckIcon className="h-5 w-5 text-green-500 shrink-0" />
                          ) : (
                            <span className="h-5 w-5 text-muted-foreground text-center">—</span>
                          )}
                          <span className={feature.included ? '' : 'text-muted-foreground'}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="pt-8">
                      <Link href={plan.name === "Enterprise" ? "/contact" : "/register"}>
                        <Button 
                          variant={plan.ctaVariant} 
                          className="w-full" 
                          size="lg"
                        >
                          {plan.cta}
                          {plan.popular && <ArrowRightIcon className="ml-2 h-4 w-4" />}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-24 bg-card/30">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Compare os planos
              </h2>
              <p className="text-muted-foreground">
                Veja em detalhes o que cada plano oferece.
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4 font-semibold">Recurso</th>
                    <th className="text-center py-4 px-4 font-semibold">Starter</th>
                    <th className="text-center py-4 px-4 font-semibold text-primary">Professional</th>
                    <th className="text-center py-4 px-4 font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_FEATURES.map((feature, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-4 px-4 flex items-center gap-2">
                        {feature.name}
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircleIcon className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Mais informações sobre {feature.name.toLowerCase()}</p>
                          </TooltipContent>
                        </Tooltip>
                      </td>
                      <td className="text-center py-4 px-4 text-muted-foreground">{feature.starter}</td>
                      <td className="text-center py-4 px-4 font-medium">{feature.professional}</td>
                      <td className="text-center py-4 px-4">{feature.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">FAQ</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Perguntas frequentes
              </h2>
              <p className="text-muted-foreground">
                Tire suas dúvidas sobre nossos planos e preços.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              {FAQS.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4">
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
              <CardContent className="p-10 sm:p-16 text-center relative z-10">
                <ZapIcon className="h-12 w-12 mx-auto mb-6 opacity-80" />
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Ainda tem dúvidas?
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
                  Nossa equipe de vendas está pronta para ajudar você a escolher 
                  o melhor plano para sua empresa.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button size="lg" variant="secondary">
                      Falar com vendas
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="lg" variant="ghost" className="text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                      Começar grátis
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />
      </main>
    </TooltipProvider>
  );
}
