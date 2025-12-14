"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  SettingsIcon,
  BellIcon,
  ShieldIcon,
  PaletteIcon,
  GlobeIcon,
  KeyIcon,
  Loader2Icon,
  CheckCircleIcon,
  AlertCircleIcon,
  MoonIcon,
  SunIcon,
  MonitorIcon,
  MailIcon,
  SmartphoneIcon,
  BellRingIcon,
  LockIcon,
  FingerprintIcon,
  LogOutIcon,
  Trash2Icon,
  LinkIcon,
  Building2Icon
} from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";
import { ProfileDetails } from "@/types/ProfileDetails";

interface SettingsFormProps {
  profile: ProfileDetails;
}

export function SettingsForm({ profile }: SettingsFormProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [notifications, setNotifications] = useState({
    emailCandidates: true,
    emailVacancies: true,
    emailMarketing: false,
    pushCandidates: true,
    pushVacancies: false,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionAlerts: true,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleThemeChange(newTheme: string) {
    setTheme(newTheme);
    toast.success(`Tema alterado para ${newTheme === "light" ? "Claro" : newTheme === "dark" ? "Escuro" : "Sistema"}`);
  }

  async function handleSaveSettings() {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Configurações salvas com sucesso!");
    } catch {
      toast.error("Erro ao salvar configurações.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleLogoutAllDevices() {
    toast.success("Todas as sessões foram encerradas.");
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Gerencie suas preferências e configurações da conta
          </p>
        </div>
        <Badge variant="outline" className="w-fit gap-2 px-3 py-1.5">
          <Building2Icon className="h-4 w-4 text-primary" />
          <span className="truncate max-w-[200px]">{profile.companyName}</span>
        </Badge>
      </div>

      <Tabs defaultValue="appearance" className="space-y-6">
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <TabsList className="inline-flex w-auto min-w-full sm:min-w-0 sm:grid sm:grid-cols-4 sm:w-full lg:w-auto lg:inline-flex">
            <TabsTrigger value="appearance" className="gap-2 px-3 sm:px-4">
              <PaletteIcon className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Aparência</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2 px-3 sm:px-4">
              <BellIcon className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Notificações</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2 px-3 sm:px-4">
              <ShieldIcon className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Segurança</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="gap-2 px-3 sm:px-4">
              <LinkIcon className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Integrações</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PaletteIcon className="h-5 w-5 text-primary" />
                Tema da Interface
              </CardTitle>
              <CardDescription>
                Escolha como o Jobyte Enterprise aparece para você
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!mounted ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-40 rounded-xl" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => handleThemeChange("light")}
                    className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-200 hover:border-primary/50 cursor-pointer ${
                      theme === "light" 
                        ? "border-primary bg-primary/5" 
                        : "border-border bg-card hover:bg-muted/50"
                    }`}
                  >
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors ${
                      theme === "light" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}>
                      <SunIcon className="h-6 w-6" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">Claro</p>
                      <p className="text-xs text-muted-foreground">Tema luminoso</p>
                    </div>
                    {theme === "light" && (
                      <CheckCircleIcon className="h-5 w-5 text-primary" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleThemeChange("dark")}
                    className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-200 hover:border-primary/50 cursor-pointer ${
                      theme === "dark" 
                        ? "border-primary bg-primary/5" 
                        : "border-border bg-card hover:bg-muted/50"
                    }`}
                  >
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors ${
                      theme === "dark" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}>
                      <MoonIcon className="h-6 w-6" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">Escuro</p>
                      <p className="text-xs text-muted-foreground">Tema noturno</p>
                    </div>
                    {theme === "dark" && (
                      <CheckCircleIcon className="h-5 w-5 text-primary" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleThemeChange("system")}
                    className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-200 hover:border-primary/50 cursor-pointer ${
                      theme === "system" 
                        ? "border-primary bg-primary/5" 
                        : "border-border bg-card hover:bg-muted/50"
                    }`}
                  >
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors ${
                      theme === "system" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}>
                      <MonitorIcon className="h-6 w-6" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">Sistema</p>
                      <p className="text-xs text-muted-foreground">Automático</p>
                    </div>
                    {theme === "system" && (
                      <CheckCircleIcon className="h-5 w-5 text-primary" />
                    )}
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GlobeIcon className="h-5 w-5 text-primary" />
                Idioma e Região
              </CardTitle>
              <CardDescription>
                Configure seu idioma e formato de data preferidos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                    <GlobeIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">Idioma</p>
                    <p className="text-sm text-muted-foreground">Português (Brasil)</p>
                  </div>
                </div>
                <Badge variant="secondary" className="shrink-0">Padrão</Badge>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                    <SettingsIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">Formato de Data</p>
                    <p className="text-sm text-muted-foreground">DD/MM/AAAA</p>
                  </div>
                </div>
                <Badge variant="secondary" className="shrink-0">Brasil</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MailIcon className="h-5 w-5 text-primary" />
                Notificações por E-mail
              </CardTitle>
              <CardDescription>
                Escolha quais e-mails você deseja receber
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <BellRingIcon className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">Novas Candidaturas</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Receba um e-mail quando alguém se candidatar
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications.emailCandidates}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, emailCandidates: checked })
                  }
                  className="shrink-0"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">Atualizações de Vagas</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Notificações sobre status e desempenho
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications.emailVacancies}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, emailVacancies: checked })
                  }
                  className="shrink-0"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <MailIcon className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">Marketing e Novidades</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Dicas, recursos novos e ofertas especiais
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications.emailMarketing}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, emailMarketing: checked })
                  }
                  className="shrink-0"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SmartphoneIcon className="h-5 w-5 text-primary" />
                Notificações Push
              </CardTitle>
              <CardDescription>
                Notificações instantâneas no navegador
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <BellIcon className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">Candidaturas em Tempo Real</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Seja notificado instantaneamente
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications.pushCandidates}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, pushCandidates: checked })
                  }
                  className="shrink-0"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <AlertCircleIcon className="h-5 w-5 text-cyan-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">Alertas de Vagas</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Lembretes sobre vagas expirando
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications.pushVacancies}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, pushVacancies: checked })
                  }
                  className="shrink-0"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyIcon className="h-5 w-5 text-primary" />
                Autenticação
              </CardTitle>
              <CardDescription>
                Gerencie suas opções de segurança
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <FingerprintIcon className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">Autenticação em Dois Fatores</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Adicione uma camada extra de segurança
                    </p>
                  </div>
                </div>
                <Switch
                  checked={security.twoFactor}
                  onCheckedChange={(checked) =>
                    setSecurity({ ...security, twoFactor: checked })
                  }
                  className="shrink-0"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                    <AlertCircleIcon className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">Alertas de Sessão</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Notificação ao fazer login em novo dispositivo
                    </p>
                  </div>
                </div>
                <Switch
                  checked={security.sessionAlerts}
                  onCheckedChange={(checked) =>
                    setSecurity({ ...security, sessionAlerts: checked })
                  }
                  className="shrink-0"
                />
              </div>

              <Separator className="my-4" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                    <LockIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">Alterar Senha</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Atualize sua senha de acesso
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="shrink-0 w-full sm:w-auto">
                  Alterar
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <LogOutIcon className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">Encerrar Todas as Sessões</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Desconecte de todos os dispositivos
                    </p>
                  </div>
                </div>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleLogoutAllDevices}
                  className="shrink-0 w-full sm:w-auto"
                >
                  Encerrar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <AlertCircleIcon className="h-5 w-5" />
                Zona de Perigo
              </CardTitle>
              <CardDescription>
                Ações irreversíveis que afetam sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                <div className="space-y-1">
                  <p className="font-medium">Excluir Conta</p>
                  <p className="text-sm text-muted-foreground">
                    Remove permanentemente sua conta e todos os dados
                  </p>
                </div>
                <Button variant="destructive" size="sm" className="gap-2 shrink-0">
                  <Trash2Icon className="h-4 w-4" />
                  Excluir Conta
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-primary" />
                Integrações Disponíveis
              </CardTitle>
              <CardDescription>
                Conecte o Jobyte com outras ferramentas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                    in
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">LinkedIn</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Importe candidatos e compartilhe vagas
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="shrink-0">Em breve</Badge>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                    📊
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">Google Sheets</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Exporte dados e relatórios automaticamente
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="shrink-0">Em breve</Badge>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                    💬
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">Slack</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Receba notificações no seu workspace
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="shrink-0">Em breve</Badge>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                    📱
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">WhatsApp Business</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Comunique-se com candidatos via WhatsApp
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="shrink-0">Em breve</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyIcon className="h-5 w-5 text-primary" />
                API e Webhooks
              </CardTitle>
              <CardDescription>
                Acesso programático à sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg bg-muted/50">
                <div className="min-w-0">
                  <p className="font-medium truncate">Chave de API</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Integre sistemas externos com nossa API REST
                  </p>
                </div>
                <Badge variant="secondary" className="shrink-0">Em breve</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSaveSettings}
          className="gap-2 w-full sm:w-auto sm:min-w-[160px]"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2Icon className="h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <CheckCircleIcon className="h-4 w-4" />
              Salvar Configurações
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
