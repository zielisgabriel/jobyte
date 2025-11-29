"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { 
  BuildingIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  MessageSquareIcon,
  PhoneIcon,
  SendIcon
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  company: z.string().optional(),
  phone: z.string().optional(),
  subject: z.string().min(5, "Assunto deve ter pelo menos 5 caracteres"),
  message: z.string().min(20, "Mensagem deve ter pelo menos 20 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const CONTACT_INFO = [
  {
    icon: <MailIcon className="h-6 w-6" />,
    title: "E-mail",
    value: "contato@jobyte.com.br",
    description: "Respondemos em até 24h",
    href: "mailto:contato@jobyte.com.br",
  },
  {
    icon: <PhoneIcon className="h-6 w-6" />,
    title: "Telefone",
    value: "(11) 4000-0000",
    description: "Seg a Sex, 9h às 18h",
    href: "tel:+551140000000",
  },
  {
    icon: <MapPinIcon className="h-6 w-6" />,
    title: "Escritório",
    value: "São Paulo, SP",
    description: "Av. Paulista, 1000",
    href: "https://maps.google.com",
  },
];

const FAQ_SALES = [
  {
    question: "Quanto tempo demora para implementar?",
    answer: "A implementação básica leva de 1 a 3 dias. Para integrações mais complexas, pode levar até 2 semanas.",
  },
  {
    question: "Vocês oferecem treinamento?",
    answer: "Sim! Oferecemos treinamento online gratuito para todos os usuários, além de onboarding personalizado para planos Enterprise.",
  },
  {
    question: "Posso migrar dados de outro sistema?",
    answer: "Absolutamente. Nossa equipe de suporte auxilia na migração de dados de qualquer sistema anterior.",
  },
];

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    reset();
  };

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-1.5">
              <MessageSquareIcon className="h-3.5 w-3.5 mr-1.5" />
              Contato
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Fale com a gente
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Tem alguma dúvida, sugestão ou quer saber mais sobre o Jobyte? 
              Estamos aqui para ajudar!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {CONTACT_INFO.map((info, index) => (
              <Link key={index} href={info.href} target="_blank">
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="h-14 w-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {info.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{info.title}</h3>
                    <p className="text-primary font-medium mb-1">{info.value}</p>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Envie sua mensagem
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nome completo *
                    </label>
                    <Input
                      id="name"
                      placeholder="Seu nome"
                      {...register("name")}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      E-mail *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      {...register("email")}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium">
                      Empresa
                    </label>
                    <Input
                      id="company"
                      placeholder="Nome da empresa"
                      {...register("company")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Telefone
                    </label>
                    <Input
                      id="phone"
                      placeholder="(11) 99999-9999"
                      {...register("phone")}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Assunto *
                  </label>
                  <Input
                    id="subject"
                    placeholder="Como podemos ajudar?"
                    {...register("subject")}
                    className={errors.subject ? "border-destructive" : ""}
                  />
                  {errors.subject && (
                    <p className="text-xs text-destructive">{errors.subject.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Mensagem *
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Descreva sua dúvida ou solicitação..."
                    rows={5}
                    {...register("message")}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive">{errors.message.message}</p>
                  )}
                </div>
                
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      Enviar mensagem
                      <SendIcon className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
            
            {/* FAQ & Info */}
            <div className="space-y-8">
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <BuildingIcon className="h-5 w-5 text-primary" />
                    Para empresas
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Quer saber mais sobre como o Jobyte pode ajudar sua empresa a 
                    contratar melhor? Agende uma demonstração gratuita com nosso time.
                  </p>
                  <Link href="/register">
                    <Button variant="outline" className="w-full">
                      Agendar demonstração
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <ClockIcon className="h-5 w-5 text-primary" />
                    Perguntas frequentes
                  </h3>
                  <div className="space-y-4">
                    {FAQ_SALES.map((faq, index) => (
                      <div key={index}>
                        <p className="font-medium text-sm mb-1">{faq.question}</p>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                  <Link href="/pricing" className="block mt-4">
                    <Button variant="link" className="p-0 h-auto">
                      Ver mais perguntas frequentes →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">Suporte técnico</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Já é cliente Jobyte e precisa de suporte técnico? 
                    Acesse nossa central de ajuda ou abra um ticket.
                  </p>
                  <Link href="https://suporte.jobyte.com.br" target="_blank">
                    <Button variant="secondary" size="sm">
                      Central de ajuda
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
