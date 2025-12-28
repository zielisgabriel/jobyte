"use client"

import { useForm } from "react-hook-form"
import { Button } from "./ui/Button";
import Link from "next/link";
import z from "zod";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/environments/regexEnv";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Separator } from "radix-ui";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { Input } from "./ui/Input";

const candidateRegisterFormSchema = z.object({
  fullName: z.string()
    .min(2, "O nome da empresa deve ter no mínimo 2 caracteres")
    .max(100, "O nome da empresa deve ter no máximo 100 caracteres"),
  cpf: z.string()
    .length(11, "CPF deve ter 11 dígitos")
    .regex(/^\d+$/, "CPF deve conter apenas números"),
  address: z.string(),
  email: z.string()
    .regex(EMAIL_REGEX, "Email inválido"),
  password: z.string()
    .regex(PASSWORD_REGEX, "Senha não atende aos requisitos"),
  phone: z.string()
    .min(10, "Telefone deve ter no mínimo 10 dígitos")
    .max(11, "Telefone deve ter no máximo 11 dígitos")
    .regex(/^\d+$/, "Telefone deve conter apenas números")
});

export interface CandidateRegisterFormType extends z.infer<typeof candidateRegisterFormSchema> {}

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

export function CandidateRegisterForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  
  const {
    handleSubmit,
    register,
    watch,
    formState,
    setValue
  } = useForm<CandidateRegisterFormType>({
    resolver: zodResolver(candidateRegisterFormSchema),
    defaultValues: {
      fullName: "",
      cpf: "",
      email: "",
      password: "",
      phone: "",
      address: ""
    }
  });
  
  const { errors } = formState;
  const passwordInputWatch = watch("password");
  const cpfInputWatch = watch("cpf");
  const phoneInputWatch = watch("phone");

  async function onSubmit(data: CandidateRegisterFormType) {
    startTransition(async () => {
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
          console.error("Registration failed:", await errorData);
          setErrorMessage("Cadastro falhou. Verifique os dados e tente novamente.");
          return;
        }

        router.push("/login");
      } catch (error: any) {
        setErrorMessage("Erro inesperado. Tente novamente.");
        console.error("Erro no cadastro:", error);
      }
    })
  }

  const cpfFormatted = cpfInputWatch
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
    .slice(0, 14);

  const phoneFormatted = phoneInputWatch
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/^(\(\d{2}\)\s\d{1})(\d)/, "$1 $2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .slice(0, 17);

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
            placeholder="Digite seu nome completo"
            {...register("fullName")}
            disabled={isPending}
            className={twMerge(clsx(
              (errors.fullName) && "border-red-500"
            ))}
          />

          <Input
            placeholder="CPF"
            disabled={isPending}
            className={twMerge(clsx(
              errors.cpf && "border-red-500"
            ))}
            value={cpfFormatted}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/\D/g, "");
              setValue("cpf", onlyNumbers, { shouldValidate: true });
            }}
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
            disabled={isPending}
            className={twMerge(clsx(
              errors.phone && "border-red-500"
            ))}
            value={phoneFormatted}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/\D/g, "");
              setValue("phone", onlyNumbers, { shouldValidate: true });
            }}
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
            href={"/login"}
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