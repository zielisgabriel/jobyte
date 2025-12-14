import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ShieldCheckIcon } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        
        <div className="relative max-w-4xl mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="secondary" className="px-4 py-1.5">
              <ShieldCheckIcon className="h-3.5 w-3.5 mr-1.5" />
              Legal
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Política de Privacidade
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
              <h2>1. Introdução</h2>
              <p>
                A Jobyte Tecnologia Ltda. ("Jobyte", "nós", "nosso") está comprometida em 
                proteger a privacidade dos usuários de nossa plataforma. Esta Política de 
                Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas 
                informações pessoais quando você utiliza nossos serviços.
              </p>
              <p>
                Ao utilizar a plataforma Jobyte, você concorda com as práticas descritas 
                nesta política. Recomendamos que leia este documento com atenção.
              </p>

              <h2>2. Informações que coletamos</h2>
              <p>Coletamos diferentes tipos de informações para fornecer e melhorar nossos serviços:</p>
              
              <h3>2.1. Informações fornecidas por você</h3>
              <ul>
                <li><strong>Dados de cadastro:</strong> nome, e-mail, telefone, cargo, nome da empresa</li>
                <li><strong>Dados de perfil:</strong> foto, biografia, informações profissionais</li>
                <li><strong>Dados de vagas:</strong> descrições de vagas, requisitos, informações de candidatos</li>
                <li><strong>Comunicações:</strong> mensagens enviadas através da plataforma</li>
              </ul>

              <h3>2.2. Informações coletadas automaticamente</h3>
              <ul>
                <li><strong>Dados de uso:</strong> páginas visitadas, recursos utilizados, tempo de uso</li>
                <li><strong>Dados técnicos:</strong> endereço IP, tipo de navegador, sistema operacional</li>
                <li><strong>Cookies:</strong> informações armazenadas para melhorar a experiência</li>
              </ul>

              <h2>3. Como usamos suas informações</h2>
              <p>Utilizamos as informações coletadas para:</p>
              <ul>
                <li>Fornecer, manter e melhorar nossos serviços</li>
                <li>Processar transações e gerenciar sua conta</li>
                <li>Enviar comunicações relacionadas ao serviço</li>
                <li>Personalizar sua experiência na plataforma</li>
                <li>Analisar o uso e melhorar nossos produtos</li>
                <li>Detectar e prevenir fraudes e abusos</li>
                <li>Cumprir obrigações legais</li>
              </ul>

              <h2>4. Compartilhamento de informações</h2>
              <p>
                Não vendemos suas informações pessoais. Podemos compartilhar seus dados 
                nas seguintes situações:
              </p>
              <ul>
                <li><strong>Com candidatos e empresas:</strong> quando você publica vagas ou se candidata</li>
                <li><strong>Com prestadores de serviços:</strong> parceiros que nos ajudam a operar a plataforma</li>
                <li><strong>Por obrigação legal:</strong> quando exigido por lei ou ordem judicial</li>
                <li><strong>Com seu consentimento:</strong> em outras situações, com sua autorização prévia</li>
              </ul>

              <h2>5. Segurança dos dados</h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais para proteger 
                suas informações, incluindo:
              </p>
              <ul>
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Controles de acesso rigorosos</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Backups regulares</li>
                <li>Treinamento de segurança para colaboradores</li>
              </ul>

              <h2>6. Seus direitos</h2>
              <p>De acordo com a LGPD, você tem direito a:</p>
              <ul>
                <li>Confirmar a existência de tratamento de dados</li>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos ou desatualizados</li>
                <li>Solicitar anonimização ou exclusão de dados</li>
                <li>Solicitar portabilidade dos dados</li>
                <li>Revogar consentimento</li>
                <li>Obter informações sobre compartilhamento</li>
              </ul>
              <p>
                Para exercer esses direitos, entre em contato através do e-mail{" "}
                <Link href="mailto:privacidade@jobyte.com.br" className="text-primary hover:underline">
                  privacidade@jobyte.com.br
                </Link>.
              </p>

              <h2>7. Retenção de dados</h2>
              <p>
                Mantemos suas informações pelo tempo necessário para fornecer nossos serviços 
                ou conforme exigido por lei. Após o encerramento da conta, seus dados serão 
                excluídos ou anonimizados em até 90 dias, exceto quando houver obrigação 
                legal de retenção.
              </p>

              <h2>8. Cookies</h2>
              <p>
                Utilizamos cookies e tecnologias similares para melhorar sua experiência. 
                Você pode gerenciar suas preferências de cookies nas configurações do navegador. 
                Para mais informações, consulte nossa{" "}
                <Link href="/cookies" className="text-primary hover:underline">
                  Política de Cookies
                </Link>.
              </p>

              <h2>9. Alterações nesta política</h2>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos 
                você sobre alterações significativas por e-mail ou através de um aviso em 
                nossa plataforma.
              </p>

              <h2>10. Contato</h2>
              <p>
                Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como 
                tratamos seus dados, entre em contato:
              </p>
              <ul>
                <li><strong>E-mail:</strong> privacidade@jobyte.com.br</li>
                <li><strong>Encarregado de Dados (DPO):</strong> dpo@jobyte.com.br</li>
                <li><strong>Endereço:</strong> Av. Paulista, 1000, São Paulo - SP, CEP 01310-100</li>
              </ul>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Veja também:{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Termos de Uso
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
