import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { 
  CheckCircle2Icon,
  DatabaseIcon,
  EyeIcon,
  KeyIcon,
  LockIcon,
  MailIcon,
  ShieldCheckIcon,
  TrashIcon,
  UserCheckIcon
} from "lucide-react";

const LGPD_RIGHTS = [
  {
    icon: <EyeIcon className="h-6 w-6" />,
    title: "Direito de Acesso",
    description: "Você pode solicitar uma cópia de todos os dados pessoais que mantemos sobre você.",
  },
  {
    icon: <UserCheckIcon className="h-6 w-6" />,
    title: "Direito de Correção",
    description: "Você pode solicitar a correção de dados incompletos, inexatos ou desatualizados.",
  },
  {
    icon: <TrashIcon className="h-6 w-6" />,
    title: "Direito de Exclusão",
    description: "Você pode solicitar a exclusão de seus dados pessoais, respeitadas as obrigações legais.",
  },
  {
    icon: <DatabaseIcon className="h-6 w-6" />,
    title: "Direito à Portabilidade",
    description: "Você pode solicitar a transferência de seus dados para outro fornecedor de serviço.",
  },
  {
    icon: <LockIcon className="h-6 w-6" />,
    title: "Direito à Anonimização",
    description: "Você pode solicitar a anonimização de dados pessoais desnecessários ou excessivos.",
  },
  {
    icon: <KeyIcon className="h-6 w-6" />,
    title: "Revogação de Consentimento",
    description: "Você pode revogar seu consentimento para o tratamento de dados a qualquer momento.",
  },
];

const DATA_CATEGORIES = [
  {
    category: "Dados de Identificação",
    examples: "Nome, CPF, RG, e-mail, telefone",
    purpose: "Cadastro e identificação na plataforma",
    legal_basis: "Execução de contrato",
  },
  {
    category: "Dados Profissionais",
    examples: "Cargo, empresa, experiências",
    purpose: "Funcionamento da plataforma de recrutamento",
    legal_basis: "Execução de contrato",
  },
  {
    category: "Dados de Navegação",
    examples: "IP, cookies, logs de acesso",
    purpose: "Segurança e melhoria do serviço",
    legal_basis: "Legítimo interesse",
  },
  {
    category: "Dados de Comunicação",
    examples: "Mensagens, e-mails trocados",
    purpose: "Suporte e comunicação com usuários",
    legal_basis: "Execução de contrato",
  },
];

export default function LGPDPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-1.5">
              <ShieldCheckIcon className="h-3.5 w-3.5 mr-1.5" />
              Proteção de Dados
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              LGPD e seus 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60"> direitos</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Conheça como o Jobyte trata seus dados pessoais em conformidade com a 
              Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
            </p>
          </div>
        </div>
      </section>

      {/* LGPD Overview */}
      <section className="py-16 border-y bg-card/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="h-16 w-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <ShieldCheckIcon className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">100% Compliant</h3>
              <p className="text-sm text-muted-foreground">
                Totalmente adequados à LGPD desde agosto de 2020
              </p>
            </div>
            <div>
              <div className="h-16 w-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <LockIcon className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Dados Protegidos</h3>
              <p className="text-sm text-muted-foreground">
                Criptografia e controles de segurança avançados
              </p>
            </div>
            <div>
              <div className="h-16 w-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <UserCheckIcon className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">DPO Dedicado</h3>
              <p className="text-sm text-muted-foreground">
                Encarregado de dados disponível para atendê-lo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Seus direitos como titular de dados
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A LGPD garante diversos direitos aos titulares de dados pessoais. 
              Conheça cada um deles e como exercê-los.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LGPD_RIGHTS.map((right, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {right.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{right.title}</h3>
                  <p className="text-muted-foreground text-sm">{right.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Data Categories */}
      <section className="py-24 bg-gradient-to-b from-card/50 to-background">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Dados que tratamos
            </h2>
            <p className="text-muted-foreground">
              Transparência sobre quais dados coletamos e por quê.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4 font-semibold">Categoria</th>
                  <th className="text-left py-4 px-4 font-semibold">Exemplos</th>
                  <th className="text-left py-4 px-4 font-semibold">Finalidade</th>
                  <th className="text-left py-4 px-4 font-semibold">Base Legal</th>
                </tr>
              </thead>
              <tbody>
                {DATA_CATEGORIES.map((data, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-4 px-4 font-medium">{data.category}</td>
                    <td className="py-4 px-4 text-muted-foreground text-sm">{data.examples}</td>
                    <td className="py-4 px-4 text-sm">{data.purpose}</td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="text-xs">
                        {data.legal_basis}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How to Exercise Rights */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <MailIcon className="h-12 w-12 mx-auto text-primary mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Como exercer seus direitos
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Para exercer qualquer um dos seus direitos como titular de dados, 
                  entre em contato conosco através dos canais abaixo.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-lg bg-muted/50">
                  <h3 className="font-semibold mb-2">E-mail do DPO</h3>
                  <Link 
                    href="mailto:dpo@jobyte.com.br" 
                    className="text-primary hover:underline"
                  >
                    dpo@jobyte.com.br
                  </Link>
                  <p className="text-sm text-muted-foreground mt-2">
                    Nosso Encarregado de Proteção de Dados
                  </p>
                </div>
                <div className="p-6 rounded-lg bg-muted/50">
                  <h3 className="font-semibold mb-2">Prazo de Resposta</h3>
                  <p className="text-primary font-medium">Até 15 dias úteis</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Conforme estabelecido pela LGPD
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Para sua solicitação, informe:</h3>
                <ul className="space-y-2">
                  {[
                    "Nome completo e e-mail cadastrado",
                    "Descrição clara do direito que deseja exercer",
                    "Documento de identificação (para verificação)",
                    "Informações adicionais relevantes para sua solicitação",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2Icon className="h-5 w-5 text-green-500 shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
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
                Dúvidas sobre privacidade?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
                Nossa equipe está pronta para esclarecer qualquer questão sobre 
                como tratamos seus dados pessoais.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" variant="secondary">
                    Entre em contato
                  </Button>
                </Link>
                <Link href="/privacy">
                  <Button size="lg" variant="ghost" className="text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                    Ver Política de Privacidade
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
