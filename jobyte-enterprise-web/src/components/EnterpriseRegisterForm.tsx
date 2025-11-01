"use client"

import { useForm } from "react-hook-form"
import { Button } from "./ui/Button";
import Link from "next/link";
import z from "zod";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/environments/regexEnv";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { Separator } from "radix-ui";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { Input } from "./ui/Input";

const enterpriseRegisterFormSchema = z.object({
  companyName: z.string()
    .min(2, "O nome da empresa deve ter no mínimo 2 caracteres")
    .max(100, "O nome da empresa deve ter no máximo 100 caracteres"),
  cnpj: z.string()
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, "CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX"),
  address: z.string(),
  email: z.string()
    .regex(EMAIL_REGEX, "Email inválido"),
  password: z.string()
    .regex(PASSWORD_REGEX, "Senha não atende aos requisitos"),
  phone: z.string()
});

export interface EnterpriseRegisterFormType extends z.infer<typeof enterpriseRegisterFormSchema> {}

const passwordValidation: {text: string, regex: RegExp}[] = [
  {
    text: "*A senha deve conter pelo menos um número",
    regex: /\d/
  },
  {
    text: "*A senha deve conter pelo menos uma letra maiúscula",
    regex: /[A-Z]/
  },
  {
    text: "*A senha deve conter pelo menos uma letra minúscula",
    regex: /[a-z]/
  },
  {
    text: "*A senha deve conter pelo menos um caractere especial",
    regex: /[@#$%^&+=!]/
  },
  {
    text: "*A senha deve ter entre 8 e 16 caracteres",
    regex: /^.{8,16}$/
  }
]

export function EnterpriseRegisterForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  
  const {
    handleSubmit,
    register,
    watch,
    formState
  } = useForm<EnterpriseRegisterFormType>({
    resolver: zodResolver(enterpriseRegisterFormSchema),
    defaultValues: {
      companyName: "",
      cnpj: "",
      email: "",
      password: "",
      phone: ""
    }
  });
  
  const { errors } = formState;
  const passwordInputWatch = watch("password");
  const cnpjInputWatch = watch("cnpj");

  async function onSubmit(data: EnterpriseRegisterFormType) {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
        setErrorMessage("Cadastro falhou. Verifique os dados e tente novamente.");
        return;
      }

      router.push("/enterprise/login");
    } catch (error: any) {
      setErrorMessage("Erro inesperado. Tente novamente.");
      console.error("Erro no cadastro:", error);
    }
  }

  const cnpjFormatted = cnpjInputWatch
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .slice(0, 18);

  return (
    <form
      className="flex flex-col justify-center items-center h-full w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full max-w-md">
        <h1 className={twMerge(clsx("text-3xl font-bold mb-4 ml-1 text-background"))}>
          Criar uma conta
        </h1>
        
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errorMessage}
          </div>
        )}
        
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Digite o nome da empresa"
            {...register("companyName")}
            disabled={isPending}
            className={twMerge(clsx(
              (errors.companyName) && "border-red-500"
            ))}
          />

          <Input
            placeholder="CNPJ"
            {...register("cnpj")}
            disabled={isPending}
            className={twMerge(clsx(
              errors.cnpj && "border-red-500"
            ))}
            value={cnpjFormatted}
          />

          <Input
            placeholder="Endereço"
            {...register("address")}
            disabled={isPending}
            className={twMerge(clsx(
              errors.address && "border-red-500"
            ))}
          />

          <Input
            placeholder="E-mail"
            {...register("email")}
            disabled={isPending}
            className={twMerge(clsx(
              errors.email && "border-red-500"
            ))}
          />

          <Input
            placeholder="Telefone"
            {...register("phone")}
            disabled={isPending}
            className={twMerge(clsx(
              errors.phone && "border-red-500"
            ))}
          />

          <Input
            placeholder="Senha"
            type={isPasswordVisible ? "text" : "password"}
            {...register("password")}
            disabled={isPending}
            className={twMerge(clsx(
              errors.password && "border-red-500"
            ))}
          />
          <button
            type="button"
            className="text-background text-start text-[12px] hover:underline font-bold opacity-60 cursor-pointer"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? "Ocultar" : "Mostrar"} senha
          </button>

          <div className="flex flex-col">
            <div className="my-2">
              {passwordValidation.map((validation, index) => (
                <p key={index} className={clsx(
                  "text-[0.8rem] font-semibold",
                  !passwordInputWatch 
                    ? "text-background/80" 
                    : validation.regex.test(passwordInputWatch) 
                      ? "text-green-500" 
                      : "text-red-500"
                )}>
                  {validation.text}
                </p>
              ))}
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          variant={"color_invert"}
          disabled={isPending}
        >
          {isPending ? "Cadastrando..." : "Cadastrar"}
        </Button>
        
        <Separator.Root className="h-0.5 rounded-full bg-background my-4 mx-6" />
        
        <div className="flex gap-1 justify-center">
          <h1 className="text-background/80 text-sm">Já tem uma conta?</h1>
          <Link
            href={"/enterprise/login"}
            title="Entrar"
            className="text-sm font-semibold hover:underline text-background"
          >
            Entrar
          </Link>
        </div>
      </div>
    </form>
  );
}