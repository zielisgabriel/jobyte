"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import {
  Building2Icon,
  HashIcon,
  MapPinIcon,
  PhoneIcon,
  Loader2Icon,
  CheckCircleIcon,
  AlertCircleIcon,
  CameraIcon,
  SettingsIcon,
  ShieldCheckIcon,
  Trash2Icon,
  UploadIcon
} from "lucide-react";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Enterprise } from "@/types/Enterprise";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const profileEditFormSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, "O nome da empresa deve ter pelo menos 2 caracteres"),
  cnpj: z
    .string()
    .trim()
    .min(14, "CNPJ inválido")
    .max(18, "CNPJ inválido"),
  address: z
    .string()
    .trim()
    .min(5, "O endereço deve ter pelo menos 5 caracteres"),
  phone: z
    .string()
    .trim()
    .min(10, "O telefone deve ter pelo menos 10 caracteres"),
});

type ProfileEditFormData = z.infer<typeof profileEditFormSchema>;

interface ProfileEditFormProps {
  profile: Enterprise;
}

export function ProfileEditForm({ profile }: ProfileEditFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { register, handleSubmit, formState, watch } = useForm<ProfileEditFormData>({
    resolver: zodResolver(profileEditFormSchema),
    defaultValues: {
      companyName: profile.companyName,
      cnpj: profile.cnpj,
      address: profile.address,
      phone: profile.phone,
    },
  });

  const companyName = watch("companyName");

  function handleFileChange(file: File | null) {
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecione uma imagem válida.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function removeAvatar() {
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function onSubmit(data: ProfileEditFormData) {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setSubmitError(
          errorData?.message ?? "Não foi possível atualizar o perfil. Tente novamente."
        );
        setIsSubmitting(false);
        return;
      }

      toast.success("Perfil atualizado com sucesso!");
      router.push("/profile");
      router.refresh();
    } catch {
      setSubmitError("Erro ao processar a requisição. Tente novamente.");
      setIsSubmitting(false);
    }
  }

  function handleValidationError(errors: typeof formState.errors) {
    const first = Object.values(errors)[0];
    if (first?.message) {
      setSubmitError(first.message as string);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Configurações do Perfil</h1>
          <p className="text-muted-foreground">
            Gerencie as informações da sua empresa e personalize seu perfil
          </p>
        </div>
        <Badge variant="outline" className="w-fit gap-2 px-3 py-1.5">
          <ShieldCheckIcon className="h-4 w-4 text-green-500" />
          Conta verificada
        </Badge>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-flex">
          <TabsTrigger value="general" className="gap-2">
            <Building2Icon className="h-4 w-4" />
            <span className="hidden sm:inline">Informações Gerais</span>
            <span className="sm:hidden">Geral</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="gap-2">
            <SettingsIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Configurações Avançadas</span>
            <span className="sm:hidden">Avançado</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-1 border-none shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Foto do Perfil</CardTitle>
                <CardDescription>
                  Clique ou arraste para alterar
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <div
                  className={`relative group cursor-pointer transition-all duration-300 ${
                    isDragging ? "scale-105" : ""
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Avatar className={`h-32 w-32 border-4 transition-all duration-300 ${
                    isDragging 
                      ? "border-primary shadow-xl shadow-primary/20" 
                      : "border-background shadow-lg group-hover:border-primary/50"
                  }`}>
                    {avatarPreview ? (
                      <AvatarImage src={avatarPreview} alt="Preview" className="object-cover" />
                    ) : (
                      <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
                        {companyName?.slice(0, 2).toUpperCase() || "??"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  
                  <div className={`absolute inset-0 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isDragging 
                      ? "bg-primary/30" 
                      : "bg-black/0 group-hover:bg-black/40"
                  }`}>
                    <CameraIcon className={`h-8 w-8 text-white transition-all duration-300 ${
                      isDragging ? "opacity-100 scale-110" : "opacity-0 group-hover:opacity-100"
                    }`} />
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <UploadIcon className="h-3.5 w-3.5" />
                    Upload
                  </Button>
                  {avatarPreview && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={removeAvatar}
                    >
                      <Trash2Icon className="h-3.5 w-3.5" />
                      Remover
                    </Button>
                  )}
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  JPG, PNG ou GIF. Máximo 5MB.
                </p>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 border-none shadow-lg">
              <CardHeader>
                <CardTitle>Informações da Empresa</CardTitle>
                <CardDescription>
                  Dados principais que aparecem no seu perfil público
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  id="profile-form"
                  onSubmit={handleSubmit(onSubmit, handleValidationError)}
                  className="space-y-5"
                >
                  {submitError && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
                      <AlertCircleIcon className="h-4 w-4 flex-shrink-0" />
                      <p className="text-sm">{submitError}</p>
                    </div>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="companyName"
                        className="flex items-center gap-2 text-sm font-medium"
                      >
                        <Building2Icon className="h-4 w-4 text-muted-foreground" />
                        Nome da Empresa
                      </Label>
                      <Input
                        id="companyName"
                        {...register("companyName")}
                        aria-invalid={!!formState.errors.companyName}
                        placeholder="Ex: Tech Solutions Ltda"
                        className={
                          formState.errors.companyName
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                        }
                      />
                      {formState.errors.companyName && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircleIcon className="h-3 w-3" />
                          {formState.errors.companyName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="cnpj"
                        className="flex items-center gap-2 text-sm font-medium"
                      >
                        <HashIcon className="h-4 w-4 text-muted-foreground" />
                        CNPJ
                      </Label>
                      <Input
                        id="cnpj"
                        {...register("cnpj")}
                        aria-invalid={!!formState.errors.cnpj}
                        placeholder="00.000.000/0000-00"
                        className={
                          formState.errors.cnpj
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                        }
                      />
                      {formState.errors.cnpj && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircleIcon className="h-3 w-3" />
                          {formState.errors.cnpj.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="address"
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                      Endereço Completo
                    </Label>
                    <Input
                      id="address"
                      {...register("address")}
                      aria-invalid={!!formState.errors.address}
                      placeholder="Ex: Rua das Flores, 123 - Centro, São Paulo - SP"
                      className={
                        formState.errors.address
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }
                    />
                    {formState.errors.address && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircleIcon className="h-3 w-3" />
                        {formState.errors.address.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                      Telefone para Contato
                    </Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      aria-invalid={!!formState.errors.phone}
                      placeholder="(11) 99999-9999"
                      className={
                        formState.errors.phone
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }
                    />
                    {formState.errors.phone && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircleIcon className="h-3 w-3" />
                        {formState.errors.phone.message}
                      </p>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              form="profile-form"
              className="gap-2 min-w-[160px]"
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
                  Salvar Alterações
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>Preferências da Conta</CardTitle>
              <CardDescription>
                Configure opções avançadas da sua conta empresarial
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="space-y-1">
                  <p className="font-medium">Notificações por Email</p>
                  <p className="text-sm text-muted-foreground">
                    Receba atualizações sobre candidaturas e vagas
                  </p>
                </div>
                <Badge variant="secondary">Em breve</Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="space-y-1">
                  <p className="font-medium">Autenticação em Dois Fatores</p>
                  <p className="text-sm text-muted-foreground">
                    Adicione uma camada extra de segurança
                  </p>
                </div>
                <Badge variant="secondary">Em breve</Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="space-y-1">
                  <p className="font-medium">Integração com LinkedIn</p>
                  <p className="text-sm text-muted-foreground">
                    Conecte sua conta para importar dados
                  </p>
                </div>
                <Badge variant="secondary">Em breve</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
              <CardDescription>
                Ações irreversíveis que afetam sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
      </Tabs>
    </div>
  );
}
