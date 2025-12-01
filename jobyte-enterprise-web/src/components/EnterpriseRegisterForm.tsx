"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/environments/regexEnv";
import { 
  Building2Icon, 
  HashIcon, 
  MapPinIcon, 
  MailIcon, 
  PhoneIcon, 
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  AlertCircleIcon,
  Loader2Icon,
  CheckCircle2Icon,
  XCircleIcon,
  ArrowRightIcon
} from "lucide-react";
import Link from "next/link";

const enterpriseRegisterFormSchema = z.object({
  companyName: z.string()
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  cnpj: z.string()
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, "CNPJ inválido"),
  address: z.string().min(1, "Endereço é obrigatório"),
  email: z.string()
    .regex(EMAIL_REGEX, "E-mail inválido"),
  password: z.string()
    .regex(PASSWORD_REGEX, "Senha não atende aos requisitos"),
  phone: z.string().min(1, "Telefone é obrigatório")
});

export interface EnterpriseRegisterFormType extends z.infer<typeof enterpriseRegisterFormSchema> {}

const passwordRules = [
  { label: "8-16 caracteres", regex: /^.{8,16}$/ },
  { label: "Letra maiúscula", regex: /[A-Z]/ },
  { label: "Letra minúscula", regex: /[a-z]/ },
  { label: "Número", regex: /\d/ },
  { label: "Caractere especial", regex: /[@#$%^&+=!]/ },
];

export function EnterpriseRegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EnterpriseRegisterFormType>({
    resolver: zodResolver(enterpriseRegisterFormSchema),
    defaultValues: {
      companyName: "",
      cnpj: "",
      address: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const cnpjWatch = watch("cnpj");
  const phoneWatch = watch("phone");
  const passwordWatch = watch("password");

  useEffect(() => {
    const formatted = cnpjWatch
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);
    if (formatted !== cnpjWatch) {
      setValue("cnpj", formatted);
    }
  }, [cnpjWatch, setValue]);

  useEffect(() => {
    const formatted = phoneWatch
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
    if (formatted !== phoneWatch) {
      setValue("phone", formatted);
    }
  }, [phoneWatch, setValue]);

  async function onSubmit(data: EnterpriseRegisterFormType) {
    startTransition(async () => {
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage("Cadastro falhou. Verifique os dados e tente novamente.");
          return;
        }

        router.push("/login");
      } catch (error) {
        setErrorMessage("Erro inesperado. Tente novamente.");
      }
    });
  }

  return (
    <div className="w-full max-w-lg">
      <div className="text-center mb-8">
        <div className="lg:hidden mb-6">
          <span className="flex items-center justify-center">
            <h1 className="font-black text-3xl text-primary">Jobyte.</h1>
            <p className="text-lg font-semibold text-muted-foreground">nterprise</p>
          </span>
        </div>
      </div>

      <Card className="border-0 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
              Crie sua conta
          </CardTitle>
          <CardDescription>
              Preencha os dados da sua empresa para começar
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg flex items-center gap-2">
              <AlertCircleIcon className="h-5 w-5 shrink-0" />
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="flex items-center gap-2 text-sm font-medium">
                <Building2Icon className="h-4 w-4 text-muted-foreground" />
                Nome da Empresa
              </Label>
              <Input
                id="companyName"
                placeholder="Digite o nome da empresa"
                {...register("companyName")}
                disabled={isPending}
                className={errors.companyName ? "border-destructive" : ""}
              />
              {errors.companyName && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircleIcon className="h-3 w-3" />
                  {errors.companyName.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cnpj" className="flex items-center gap-2 text-sm font-medium">
                  <HashIcon className="h-4 w-4 text-muted-foreground" />
                  CNPJ
                </Label>
                <Input
                  id="cnpj"
                  placeholder="00.000.000/0000-00"
                  {...register("cnpj")}
                  disabled={isPending}
                  className={errors.cnpj ? "border-destructive" : ""}
                />
                {errors.cnpj && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircleIcon className="h-3 w-3" />
                    {errors.cnpj.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
                  <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                  Telefone
                </Label>
                <Input
                  id="phone"
                  placeholder="(00) 00000-0000"
                  {...register("phone")}
                  disabled={isPending}
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircleIcon className="h-3 w-3" />
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                <MailIcon className="h-4 w-4 text-muted-foreground" />
                E-mail Corporativo
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="contato@empresa.com.br"
                {...register("email")}
                disabled={isPending}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircleIcon className="h-3 w-3" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2 text-sm font-medium">
                <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                Endereço
              </Label>
              <Input
                id="address"
                placeholder="Rua, número, bairro, cidade - UF"
                {...register("address")}
                disabled={isPending}
                className={errors.address ? "border-destructive" : ""}
              />
              {errors.address && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircleIcon className="h-3 w-3" />
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2 text-sm font-medium">
                <LockIcon className="h-4 w-4 text-muted-foreground" />
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Crie uma senha segura"
                  {...register("password")}
                  disabled={isPending}
                  className={`pr-10 ${errors.password ? "border-destructive" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {passwordRules.map((rule, index) => {
                  const isValid = rule.regex.test(passwordWatch || "");
                  return (
                    <Badge
                      key={index}
                      variant={isValid ? "default" : "secondary"}
                      className={`text-xs gap-1 ${
                        isValid 
                          ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" 
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isValid ? (
                        <CheckCircle2Icon className="h-3 w-3" />
                      ) : (
                        <XCircleIcon className="h-3 w-3" />
                      )}
                      {rule.label}
                    </Badge>
                  );
                })}
              </div>
            </div>

            <Button type="submit" className="w-full gap-2" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                <>
                  <ArrowRightIcon className="h-4 w-4" />
                  Criar Conta
                </>
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                ou cadastre-se com
              </span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full gap-3 h-11"
            onClick={() => window.location.href = "/api/auth/google"}
            disabled={isPending}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Cadastrar com Google
          </Button>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Fazer login
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-center text-muted-foreground">
              Ao criar sua conta, você concorda com nossos{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Termos de Uso
              </Link>
              {" "}e{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Política de Privacidade
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}