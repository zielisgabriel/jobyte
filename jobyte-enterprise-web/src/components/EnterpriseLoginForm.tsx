"use client"

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/environments/regexEnv";
import { Button } from "./ui/button";
import Link from "next/link";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { 
  MailIcon, 
  LockIcon, 
  EyeIcon, 
  EyeOffIcon, 
  Loader2Icon,
  LogInIcon,
  AlertCircleIcon,
  Building2Icon
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

const enterpriseLoginFormSchema = z.object({
  email: z.string().regex(EMAIL_REGEX, "Email inválido"),
  password: z.string().regex(PASSWORD_REGEX, "Senha inválida"),
});

type EnterpriseLoginFormType = z.infer<typeof enterpriseLoginFormSchema>;

export function EnterpriseLoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EnterpriseLoginFormType>({
    resolver: zodResolver(enterpriseLoginFormSchema),
    defaultValues: { email: "", password: "" },
  });
  const { refresh } = useRouter();

  async function onSubmit({ email, password }: EnterpriseLoginFormType) {
    setSubmitError(null);
    startTransition(async () => {
      try {
        const response = await fetch("/api/auth/login", {
          body: JSON.stringify({ email, password }),
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          setSubmitError(data?.message || "Email ou senha incorretos.");
          return;
        }

        refresh();
      } catch {
        setSubmitError("Erro ao fazer login. Tente novamente.");
      }
    });
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="flex flex-col items-center gap-2 lg:hidden">
        <span className="flex items-center">
          <h1 className="font-black text-2xl">Jobyte.</h1>
          <p className="text-sm font-semibold text-muted-foreground">nterprise</p>
        </span>
      </div>

      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Bem-vindo de volta</CardTitle>
          <CardDescription>
            Entre com suas credenciais para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {submitError && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
                <AlertCircleIcon className="h-4 w-4 flex-shrink-0" />
                <p className="text-sm">{submitError}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                <MailIcon className="h-4 w-4 text-muted-foreground" />
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...register("email")}
                disabled={isPending}
                className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.email && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircleIcon className="h-3 w-3" />
                  {errors.email.message}
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
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  disabled={isPending}
                  className={`pr-10 ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {isPasswordVisible ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircleIcon className="h-3 w-3" />
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <Button type="submit" className="w-full gap-2" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  <LogInIcon className="h-4 w-4" />
                  Entrar
                </>
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
              ou continue com
            </span>
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
            Continuar com Google
          </Button>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Ainda não tem uma conta?
            </p>
            <Link href="/register" className="block mt-2">
              <Button variant="ghost" className="w-full">
                Criar conta gratuita
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground">
        Ao entrar, você concorda com nossos{" "}
        <Link href="/terms" className="underline hover:text-foreground transition-colors">
          Termos de Uso
        </Link>{" "}
        e{" "}
        <Link href="/privacy" className="underline hover:text-foreground transition-colors">
          Política de Privacidade
        </Link>
      </p>
    </div>
  );
}

