import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { FileTextIcon } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        
        <div className="relative max-w-4xl mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="secondary" className="px-4 py-1.5">
              <FileTextIcon className="h-3.5 w-3.5 mr-1.5" />
              Legal
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Termos de Uso
            </h1>
            
            <p className="text-muted-foreground">
              Última atualização: 29 de novembro de 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4">
          <Card>
            <CardContent className="p-8 md:p-12 prose prose-neutral dark:prose-invert max-w-none">
              <h2>1. Aceitação dos Termos</h2>
              <p>
                Ao acessar ou utilizar a plataforma Jobyte ("Plataforma"), você concorda 
                em estar vinculado a estes Termos de Uso ("Termos"). Se você não concorda 
                com qualquer parte destes termos, não deve utilizar nossa Plataforma.
              </p>
              <p>
                Estes Termos constituem um acordo legal entre você e a Jobyte Tecnologia 
                Ltda., inscrita no CNPJ sob nº XX.XXX.XXX/0001-XX, com sede em São Paulo, SP.
              </p>

              <h2>2. Descrição do Serviço</h2>
              <p>
                O Jobyte é uma plataforma de recrutamento e seleção que conecta empresas 
                a candidatos. Oferecemos ferramentas para:
              </p>
              <ul>
                <li>Publicação e gestão de vagas de emprego</li>
                <li>Triagem automatizada de candidatos</li>
                <li>Comunicação entre recrutadores e candidatos</li>
                <li>Análise de métricas de recrutamento</li>
                <li>Agendamento de entrevistas</li>
              </ul>

              <h2>3. Cadastro e Conta</h2>
              <h3>3.1. Elegibilidade</h3>
              <p>
                Para utilizar o Jobyte, você deve ter pelo menos 18 anos e capacidade 
                legal para celebrar contratos. Ao criar uma conta em nome de uma empresa, 
                você declara ter autoridade para vincular tal empresa a estes Termos.
              </p>

              <h3>3.2. Informações da conta</h3>
              <p>
                Você é responsável por manter a confidencialidade de sua senha e por 
                todas as atividades que ocorrem em sua conta. Você concorda em:
              </p>
              <ul>
                <li>Fornecer informações precisas e atualizadas</li>
                <li>Manter suas credenciais em segurança</li>
                <li>Notificar-nos imediatamente sobre uso não autorizado</li>
              </ul>

              <h2>4. Uso Aceitável</h2>
              <p>Ao utilizar o Jobyte, você concorda em não:</p>
              <ul>
                <li>Violar leis ou regulamentos aplicáveis</li>
                <li>Publicar conteúdo falso, enganoso ou discriminatório</li>
                <li>Fazer uso indevido de dados de candidatos ou empresas</li>
                <li>Tentar acessar áreas não autorizadas da Plataforma</li>
                <li>Interferir no funcionamento da Plataforma</li>
                <li>Utilizar automação não autorizada (bots, scrapers)</li>
                <li>Revender ou redistribuir o serviço sem autorização</li>
              </ul>

              <h2>5. Conteúdo do Usuário</h2>
              <h3>5.1. Propriedade</h3>
              <p>
                Você mantém a propriedade de todo conteúdo que envia à Plataforma. 
                Ao publicar conteúdo, você nos concede uma licença mundial, não exclusiva 
                e livre de royalties para usar, reproduzir e exibir tal conteúdo em 
                conexão com o fornecimento do serviço.
              </p>

              <h3>5.2. Responsabilidade</h3>
              <p>
                Você é o único responsável pelo conteúdo que publica, incluindo vagas 
                de emprego, descrições de empresas e comunicações com candidatos.
              </p>

              <h2>6. Planos e Pagamentos</h2>
              <h3>6.1. Planos</h3>
              <p>
                Oferecemos diferentes planos de assinatura, conforme detalhado em nossa 
                página de preços. Os recursos disponíveis variam de acordo com o plano 
                escolhido.
              </p>

              <h3>6.2. Cobrança</h3>
              <p>
                As cobranças são realizadas de forma recorrente (mensal ou anual), 
                conforme o ciclo de faturamento escolhido. Você autoriza a cobrança 
                automática no método de pagamento cadastrado.
              </p>

              <h3>6.3. Cancelamento</h3>
              <p>
                Você pode cancelar sua assinatura a qualquer momento. O cancelamento 
                será efetivado ao final do período já pago. Não há reembolso proporcional 
                para o período não utilizado.
              </p>

              <h2>7. Propriedade Intelectual</h2>
              <p>
                A Plataforma Jobyte, incluindo software, design, logotipos e conteúdo 
                (exceto conteúdo do usuário), é propriedade exclusiva da Jobyte ou de 
                seus licenciantes. Você não pode copiar, modificar ou distribuir 
                qualquer parte da Plataforma sem autorização prévia por escrito.
              </p>

              <h2>8. Limitação de Responsabilidade</h2>
              <p>
                O Jobyte é fornecido "como está". Não garantimos que o serviço será 
                ininterrupto ou livre de erros. Em nenhuma hipótese seremos responsáveis 
                por danos indiretos, incidentais, especiais ou consequenciais.
              </p>
              <p>
                Nossa responsabilidade total, por qualquer causa, será limitada ao 
                valor pago por você nos últimos 12 meses.
              </p>

              <h2>9. Isenção de Garantias</h2>
              <p>
                Não garantimos resultados específicos de contratação. O Jobyte é uma 
                ferramenta para facilitar o processo de recrutamento, mas o sucesso 
                depende de diversos fatores externos à nossa plataforma.
              </p>

              <h2>10. Modificações dos Termos</h2>
              <p>
                Reservamo-nos o direito de modificar estes Termos a qualquer momento. 
                Alterações significativas serão comunicadas por e-mail ou através de 
                aviso na Plataforma com pelo menos 30 dias de antecedência.
              </p>

              <h2>11. Rescisão</h2>
              <p>
                Podemos suspender ou encerrar seu acesso ao Jobyte a qualquer momento, 
                com ou sem motivo, incluindo, sem limitação, violação destes Termos. 
                Você pode encerrar sua conta a qualquer momento através das configurações.
              </p>

              <h2>12. Lei Aplicável e Foro</h2>
              <p>
                Estes Termos são regidos pelas leis da República Federativa do Brasil. 
                Fica eleito o foro da Comarca de São Paulo, SP, para dirimir quaisquer 
                controvérsias, com renúncia expressa a qualquer outro.
              </p>

              <h2>13. Disposições Gerais</h2>
              <ul>
                <li>
                  <strong>Acordo integral:</strong> Estes Termos constituem o acordo 
                  integral entre você e o Jobyte.
                </li>
                <li>
                  <strong>Cessão:</strong> Você não pode ceder ou transferir seus 
                  direitos sob estes Termos sem nosso consentimento.
                </li>
                <li>
                  <strong>Divisibilidade:</strong> Se qualquer disposição for 
                  considerada inválida, as demais permanecerão em vigor.
                </li>
                <li>
                  <strong>Renúncia:</strong> A falha em exercer qualquer direito não 
                  constitui renúncia a ele.
                </li>
              </ul>

              <h2>14. Contato</h2>
              <p>
                Para dúvidas sobre estes Termos de Uso, entre em contato:
              </p>
              <ul>
                <li><strong>E-mail:</strong> legal@jobyte.com.br</li>
                <li><strong>Endereço:</strong> Av. Paulista, 1000, São Paulo - SP, CEP 01310-100</li>
              </ul>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Veja também:{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Política de Privacidade
              </Link>
              {" | "}
              <Link href="/lgpd" className="text-primary hover:underline">
                LGPD
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
