import { EnterpriseRegisterForm } from "@/components/EnterpriseRegisterForm";
import { BackNavButton } from "@/components/BackNavButton";
import { 
  RocketIcon, 
  ShieldCheckIcon, 
  ZapIcon, 
  HeadsetIcon
} from "lucide-react";

export default function RegisterPage() {
  return (
    <main className="min-h-screen lg:grid lg:grid-cols-2">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <span className="flex items-center">
            <h1 className="font-black text-4xl">Jobyte.</h1>
            <p className="text-lg font-semibold opacity-80">nterprise</p>
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold leading-tight">
              Comece a contratar<br />os melhores talentos
            </h2>
            <p className="text-lg opacity-80 max-w-md">
              Crie sua conta gratuita e tenha acesso a todas as ferramentas para gerenciar suas vagas.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
                <RocketIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Rápido e Fácil</p>
                <p className="text-sm opacity-70">Cadastro em 2 minutos</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
                <ShieldCheckIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">100% Seguro</p>
                <p className="text-sm opacity-70">Dados criptografados</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
                <ZapIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Gratuito</p>
                <p className="text-sm opacity-70">Sem cartão de crédito</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
                <HeadsetIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Suporte 24/7</p>
                <p className="text-sm opacity-70">Sempre disponível</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-sm opacity-60">
            © 2025 Jobyte. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex flex-col min-h-screen bg-background">
        {/* Header */}
        <div className="p-4 lg:p-6">
          <BackNavButton route="/home" />
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center px-4 pb-8">
          <EnterpriseRegisterForm />
        </div>

        {/* Mobile Footer */}
        <div className="p-4 text-center lg:hidden">
          <p className="text-xs text-muted-foreground">
            © 2025 Jobyte. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </main>
  );
}