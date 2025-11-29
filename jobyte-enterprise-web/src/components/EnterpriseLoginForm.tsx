"use client"

import { useContext, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/environments/regexEnv";
import { Button } from "./ui/button";
import Link from "next/link";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { Separator } from "radix-ui";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

const enterpriseLoginFormSchema = z.object({
	email: z.string().regex(EMAIL_REGEX, "Email inválido"),
	password: z.string().regex(PASSWORD_REGEX, "Senha inválida"),
});

type EnterpriseLoginFormType = z.infer<typeof enterpriseLoginFormSchema>;

export function EnterpriseLoginForm() {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isPending, startTransition] = useTransition();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<EnterpriseLoginFormType>({
		resolver: zodResolver(enterpriseLoginFormSchema),
		defaultValues: { email: "", password: "" },
	});
	const { refresh } = useRouter();

	async function onSubmit({email, password}: EnterpriseLoginFormType) {
		startTransition(async () => {
			await fetch("/api/auth/login", {
				body: JSON.stringify({
					email,
					password
				}),
				method: "POST"
			});

			refresh();
		});
	}

	return (
		<form
			className="flex flex-col justify-center items-center h-full w-full"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="w-full max-w-md">
				<h1 className={twMerge(clsx("text-3xl font-bold mb-4 ml-1"))}>
					Entrar
				</h1>

				<div className="flex flex-col gap-2">
					<Input
						placeholder="E-mail"
						{...register("email")}
						disabled={isPending}
						className={twMerge(clsx(
							errors.email && "border-red-500"
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
						className="text-start text-[12px] hover:underline font-bold opacity-60 cursor-pointer"
						onClick={() => setIsPasswordVisible(!isPasswordVisible)}
					>
						{isPasswordVisible ? "Ocultar" : "Mostrar"} senha
					</button>
				</div>

				<Button type="submit" className="w-full mt-4" variant={"secondary"} disabled={isPending}>
					{isPending ? "Entrando..." : "Entrar"}
				</Button>

				<Separator.Root className="h-0.5 rounded-full bg-background my-4 mx-6" />

				<div className="flex gap-1 justify-center">
					<h1 className="text-sm">Não tem uma conta?</h1>
					<Link
						href={"/register"}
						title="Criar conta"
						className="text-sm font-semibold hover:underline"
					>
						Criar conta
					</Link>
				</div>
			</div>
		</form>
	);
}

