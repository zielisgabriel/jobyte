"use client";


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Building2Icon, HashIcon, MapPinIcon, PhoneIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { fillProfileService } from "@/services/fill-profile-service";

const fillProfileSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, "O nome da empresa deve ter pelo menos 2 caracteres"),
  cnpj: z
    .string()
    .trim()
    .min(14, "O CNPJ deve ter 14 dígitos"),
  address: z
    .string()
    .trim()
    .min(5, "O endereço deve ter pelo menos 5 caracteres"),
  phone: z
    .string()
    .trim()
    .min(10, "O telefone deve ter pelo menos 10 caracteres"),
});

export interface FillProfileFormData extends z.infer<typeof fillProfileSchema> {}

export function FillProfileForm() {
  const router = useRouter();

  async function completeOnboarding(formData: FillProfileFormData) {
    const response = await fillProfileService(formData);

    if (!response.ok) {
      throw new Error(`Erro ${response.status} | ${response.statusText}!`);
    }
  }

  const mutation = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Perfil preenchido com sucesso! Redirecionando para página de perfil...");
      router.push("/profile");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(data: FillProfileFormData) {
    mutation.mutate(data);
  }

  const { register, handleSubmit, formState } = useForm<FillProfileFormData>({
    resolver: zodResolver(fillProfileSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="companyName">Nome da empresa</Label>
        <div className="relative">
          <Building2Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="companyName"
            placeholder="Sua Empresa Ltda"
            className="pl-10"
            {...register("companyName")}
          />
        </div>
        {formState.errors.companyName && (
          <p className="text-sm text-destructive">{formState.errors.companyName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="cnpj">CNPJ</Label>
        <div className="relative">
          <HashIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="cnpj"
            placeholder="00.000.000/0000-00"
            className="pl-10"
            {...register("cnpj")}
          />
        </div>
        {formState.errors.cnpj && (
          <p className="text-sm text-destructive">{formState.errors.cnpj.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Endereço</Label>
        <div className="relative">
          <MapPinIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="address"
            placeholder="Rua, número, bairro, cidade - UF"
            className="pl-10"
            {...register("address")}
          />
        </div>
        {formState.errors.address && (
          <p className="text-sm text-destructive">{formState.errors.address.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefone</Label>
        <div className="relative">
          <PhoneIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="phone"
            placeholder="(00) 00000-0000"
            className="pl-10"
            {...register("phone")}
          />
        </div>
        {formState.errors.phone && (
          <p className="text-sm text-destructive">{formState.errors.phone.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <>
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            Salvando...
          </>
        ) : (
          "Começar a usar"
        )}
      </Button>
    </form>
  );
}